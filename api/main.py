"""
API de Triagem de Dengue
-------------------------
Recebe os dados do formulário em JSON, passa o payload para o modelo
treinado (scikit-learn) e retorna a predição.

Executar:
    uvicorn main:app --reload --host 0.0.0.0 --port 8000

Endpoints:
    GET  /          -> healthcheck
    POST /prever    -> recebe o formulário e retorna a predição
"""

from pathlib import Path

import joblib
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# ---------------------------------------------------------------------------
# Carregamento do modelo treinado
# ---------------------------------------------------------------------------
# O .pkl fica na raiz do projeto (um nível acima desta pasta /api).
MODELO_PATH = Path(__file__).resolve().parent.parent / "modelo_svm.pkl"
modelo = joblib.load(MODELO_PATH)

# ---------------------------------------------------------------------------
# App
# ---------------------------------------------------------------------------
app = FastAPI(
    title="API de Triagem de Dengue",
    description="Recebe dados clínicos do formulário e prevê se há suspeita de dengue.",
    version="1.0.0",
)

# Libera o acesso do app Expo (em produção, restrinja os domínios).
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------------------------
# Schema do formulário (as 8 features que o modelo espera)
# ---------------------------------------------------------------------------
class Formulario(BaseModel):
    age: int = Field(..., ge=0, le=120, description="Idade em anos")
    gender: str = Field(..., description="Male, Female ou Child")
    hemoglobin_g_dl: float = Field(..., description="Hemoglobina (g/dL)")
    wbc_count: float = Field(..., description="Contagem de leucócitos")
    differential_count: int = Field(..., description="Contagem diferencial (0 ou 1)")
    rbc_count: int = Field(..., description="Contagem de hemácias (0 ou 1)")
    platelet_count: float = Field(..., description="Contagem de plaquetas")
    platelet_distribution_width: float = Field(..., description="PDW")

    model_config = {
        "json_schema_extra": {
            "example": {
                "age": 35,
                "gender": "Male",
                "hemoglobin_g_dl": 13.5,
                "wbc_count": 3000,
                "differential_count": 1,
                "rbc_count": 1,
                "platelet_count": 45000,
                "platelet_distribution_width": 17.0,
            }
        }
    }


# ---------------------------------------------------------------------------
# Resposta
# ---------------------------------------------------------------------------
class Predicao(BaseModel):
    dengue: bool
    label: int
    probabilidade: float
    mensagem: str


# ---------------------------------------------------------------------------
# Rotas
# ---------------------------------------------------------------------------
@app.get("/")
def healthcheck():
    return {"status": "ok", "modelo": MODELO_PATH.name}


@app.post("/prever", response_model=Predicao)
def prever(form: Formulario):
    # Converte o JSON recebido em DataFrame (o pipeline faz o pré-processamento).
    dados = pd.DataFrame([form.model_dump()])

    label = int(modelo.predict(dados)[0])
    probabilidade = float(modelo.predict_proba(dados)[0][1])

    mensagem = (
        "Sinais compatíveis com dengue. Procure atendimento médico."
        if label == 1
        else "Baixa suspeita de dengue com base nos dados informados."
    )

    return Predicao(
        dengue=bool(label),
        label=label,
        probabilidade=round(probabilidade, 4),
        mensagem=mensagem,
    )

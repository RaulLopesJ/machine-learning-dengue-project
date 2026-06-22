Disciplina de Inteligência Artificial , Professor Munif , Unicesumar 2026

# Classificação de Dengue com Machine Learning: KNN vs SVM

## Integrantes

- (preencher) Nome do Aluno 1 - RA: XXXXXXXX
- (preencher) Nome do Aluno 2 - RA: XXXXXXXX
- (preencher) Nome do Aluno 3 - RA: XXXXXXXX

---

## 1. Resumo do Projeto

### 1.1 Contextualização

A dengue é uma das arboviroses mais prevalentes do Brasil, com mais de 6 milhões de casos confirmados em 2024. O diagnóstico precoce é essencial para evitar complicações graves, como a forma hemorrágica da doença. Alterações no hemograma, especialmente a queda de plaquetas e a leucopenia, são marcadores clínicos reconhecidos pelo Ministério da Saúde como indicadores de suspeita.

Neste contexto, o presente projeto aplica técnicas de aprendizado de máquina supervisionado para classificar pacientes como suspeitos ou não de dengue, a partir de parâmetros hematológicos rotineiros.

### 1.2 Problema

É possível prever com boa acurácia se um paciente tem dengue utilizando apenas dados de um hemograma simples, sem exames laboratoriais específicos e de maior custo?

### 1.3 Hipótese

Modelos de classificação supervisionada conseguem distinguir casos de dengue de não-dengue com desempenho satisfatório (acurácia acima de 85%) a partir de atributos hematológicos como contagem de plaquetas, leucócitos e hemoglobina.

### 1.4 Dataset utilizado

O dataset utilizado é o **Dengue Detection Dataset (Clinical Data)**, composto por registros clínicos e hematológicos de pacientes. Cada registro contém 8 atributos e uma variável alvo binária.

- **Origem:** Dataset público disponível no Kaggle / Mendeley.
- **Registros:** 989 amostras.
- **Variável alvo:** `dengue_label` (0 = sem dengue, 1 = dengue).
- **Atributos principais:** idade, gênero, hemoglobina (g/dL), leucócitos (WBC), differential count, hemácias (RBC), plaquetas e PDW (largura de distribuição plaquetária).

O dataset está disponível neste repositório, na pasta `archive/`.

### 1.5 Métodos de IA utilizados

- **Parte 1 (KNN):** K-Nearest Neighbors, algoritmo baseado em distância euclidiana. Classifica novas instâncias pela maioria das k instâncias mais próximas no espaço de atributos.
- **Parte 2 (SVM):** Support Vector Machine com kernel RBF, que busca o hiperplano de margem máxima para separar as classes no espaço transformado.

Ambos os algoritmos são sensíveis à escala dos atributos, o que motivou a padronização obrigatória dos dados antes do treinamento.

### 1.6 Avaliação dos modelos

As métricas foram calculadas sobre o conjunto de teste (20% dos dados, divisão estratificada):

| Métrica    | KNN  | SVM  |
|------------|------|------|
| Acurácia   | 0,86 | **0,92** |
| Precisão   | 0,90 | **0,92** |
| Revocação  | 0,88 | **0,96** |
| F1-Score   | 0,89 | **0,94** |

**Matriz de confusão:**

![Matriz de Confusão](matriz_confusao.png)

**Curva ROC / AUC:**

![Curva ROC](curva_roc.png)

**Comparação de métricas entre os modelos:**

![Comparação de Métricas](comparacao_metricas.png)

### 1.7 Comparação dos resultados

O SVM superou o KNN em todas as métricas avaliadas. A diferença mais significativa foi na revocação (0,96 vs 0,88), que representa a capacidade do modelo de identificar corretamente os casos positivos de dengue. Para um problema de triagem clínica, a revocação é a métrica mais crítica: falsos negativos (pacientes com dengue classificados como saudáveis) são mais prejudiciais do que falsos positivos.

O KNN apresentou bom desempenho, mas por ser um algoritmo de aprendizado preguiçoso (lazy), tende a ser mais sensível a ruídos e outliers. O SVM, ao encontrar a fronteira de margem máxima, generalizou melhor para os dados de teste.

### 1.8 Conclusão

O SVM com kernel RBF foi o modelo com melhor desempenho neste problema, atingindo 92% de acurácia e 96% de revocação. A hipótese do projeto foi confirmada: é possível realizar uma triagem preliminar de dengue com boa confiabilidade a partir de dados hematológicos simples.

O uso de SMOTE para balanceamento das classes no treino contribuiu para que ambos os modelos detectassem melhor a classe minoritária (sem dengue), reduzindo o viés em direção à classe majoritária. O pré-processamento cuidadoso, incluindo padronização e codificação de variáveis categóricas, foi fundamental para o bom desempenho de ambos os algoritmos.

---

## 2. Dataset

| Item | Detalhe |
|------|---------|
| Nome | Dengue Detection Dataset (Clinical Data) |
| Localização | `archive/Dengue_diseases_dataset_modified (1).csv` |
| Registros | 989 |
| Atributos | 8 (idade, gênero, hemoglobina, WBC, differential count, RBC, plaquetas, PDW) |
| Variável alvo | `dengue_label` (0 = sem dengue, 1 = dengue) |
| Balanceamento original | 65% dengue / 35% sem dengue |

**Tratamento e preparação realizados:**
- Imputação de valores ausentes pela mediana (numéricas) e moda (categórica).
- One-Hot Encoding na coluna `gender` (Male, Female, Child).
- Padronização com `StandardScaler` (obrigatória para KNN e SVM).
- Balanceamento com **SMOTE** aplicado apenas no treino: resultado 515 / 515 amostras por classe.
- Divisão treino/teste: **80% / 20%**, estratificada para manter a proporção das classes.

---

## 3. Modelos treinados

Os modelos treinados estão disponíveis na raiz do repositório:

- `modelo_knn.pkl` (KNN treinado, ~150 KB)
- `modelo_svm.pkl` (SVM treinado, ~29 KB)

Os arquivos `.pkl` incluem o pipeline completo (pré-processamento + SMOTE + classificador), portanto aceitam dados brutos diretamente na predição.

---

## 4. Como executar

### 4.1 Notebook (treinamento)

1. Abra o `main.ipynb` no Google Colab ou Jupyter.
2. Faça upload do arquivo CSV (disponível em `archive/`).
3. Execute as células em ordem.
4. Os modelos treinados serão salvos como `modelo_knn.pkl` e `modelo_svm.pkl`.

### 4.2 API de predição (back-end)

A API FastAPI carrega o `modelo_svm.pkl` e expõe o endpoint `POST /prever`.

```bash
cd api
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Documentação interativa disponível em: `http://127.0.0.1:8000/docs`

### 4.3 Aplicativo mobile (front-end)

```bash
cd dengue-app
npm install
npm start
```

Ajuste o arquivo `dengue-app/.env` com o IP do servidor antes de testar no celular físico:

```
EXPO_PUBLIC_API_URL=http://SEU_IP:8000
```

---

## 5. Estrutura do repositório

```
/
├── main.ipynb                  # Notebook principal (treinamento e avaliação)
├── modelo_knn.pkl              # Modelo KNN treinado
├── modelo_svm.pkl              # Modelo SVM treinado
├── matriz_confusao.png         # Gráfico: matrizes de confusão
├── curva_roc.png               # Gráfico: curva ROC / AUC
├── comparacao_metricas.png     # Gráfico: comparação KNN vs SVM
├── archive/
│   ├── Dengue_diseases_dataset_modified (1).csv
│   └── data_dictionary.csv
├── api/
│   ├── main.py                 # API FastAPI
│   └── requirements.txt
├── dengue-app/
│   ├── App.js                  # Aplicativo React Native (Expo)
│   ├── .env                    # URL da API (configurável)
│   └── package.json
└── README.md
```

---

## 6. Critérios de avaliação (referência)

| Critério | Valor | Status |
|---|---|---|
| Organização do repositório, README e PDF | 0,3 | OK |
| Descrição do problema, contextualização e hipótese | 0,3 | OK |
| Dataset, preparação dos dados e explicação | 0,3 | OK |
| Treinamento com método da Parte 1 (KNN) | 0,3 | OK |
| Treinamento com método da Parte 2 (SVM) | 0,3 | OK |
| Avaliação dos modelos com métricas e gráficos | 0,3 | OK |
| Comparação dos resultados e conclusão | 0,2 | OK |
| Apresentação e perguntas | 1,0 | (na apresentação) |
| **Total** | **3,0** | |

Disciplina de Inteligência Artificial , Professor Munif , Unicesumar 2026

> **Observação:** este README está em formato de planejamento/checklist. Cada item abaixo
> reflete uma exigência do enunciado do Trabalho Final. Conforme o projeto avança, marque os
> itens concluídos `[x]` e substitua os textos `(preencher)` pelo conteúdo definitivo.

---

# Classificação de Dengue com Machine Learning (KNN x SVM)

## ✅ Checklist geral de entrega (o que o Munif pediu)

### Repositório no GitHub
- [ ] Repositório criado e acessível
- [ ] Projeto disponível no GitHub de **todos** os integrantes (fork, repo próprio ou colaboração)
- [ ] Código-fonte do projeto
- [ ] Dataset **ou** instruções claras para obtê-lo
- [ ] Modelo treinado **ou** instruções claras para baixá-lo
- [ ] Arquivo `README.md`
- [ ] Arquivo **PDF** com o mesmo conteúdo principal do README
- [ ] Nome completo e RA de todos os integrantes

### Modelos obrigatórios
- [ ] Pelo menos **1 método da Parte 1** → **KNN**
- [ ] Pelo menos **1 método da Parte 2** → **SVM**

### Avaliação (com gráficos, no README e no PDF)
- [ ] Acurácia, precisão, revocação e F1-score
- [ ] Matriz de confusão
- [ ] Curva ROC / AUC
- [ ] Comparação gráfica entre os modelos

### Apresentação (última aula antes da prova)
- [ ] Explicar o tema
- [ ] Apresentar o dataset
- [ ] Explicar os métodos
- [ ] Mostrar os resultados
- [ ] Comparar os modelos
- [ ] Apresentar os gráficos
- [ ] **Mostrar pelo menos um treinamento rodando**
- [ ] Todos os integrantes preparados para responder perguntas (vale 1,0 ponto)

---

## 1. Integrantes
<!-- Exigência: nome completo + RA de todos. Sem isso, perde nota. -->
- (preencher) Nome do Aluno 1 - RA: XXXXXXXX
- (preencher) Nome do Aluno 2 - RA: XXXXXXXX
- (preencher) Nome do Aluno 3 - RA: XXXXXXXX
- (preencher) Nome do Aluno 4 - RA: XXXXXXXX

---

## 2. Resumo do projeto

### 2.1 Contextualização do tema
(preencher) Dengue no Brasil, impacto na saúde pública, ODS 3, uso de IA para triagem.

### 2.2 Problema
(preencher) É possível prever se um paciente tem dengue a partir de parâmetros clínicos e
hematológicos (plaquetas, leucócitos, hemoglobina etc.)?

### 2.3 Hipótese da equipe
(preencher) Modelos de classificação supervisionada conseguem distinguir casos de dengue de
não-dengue com bom desempenho usando exames de sangue.

### 2.4 Métodos de IA utilizados
- **Parte 1 — KNN (k-Nearest Neighbors):** classificador baseado em distância.
- **Parte 2 — SVM (Support Vector Machine):** classificador de margem máxima.
- (preencher) justificativa da escolha e do pré-processamento exigido por ambos (escalonamento).

### 2.5 Avaliação dos modelos (com gráficos)
(preencher — inserir as imagens dos gráficos aqui)
- Matriz de confusão KNN: `![Matriz KNN](imagens/matriz_knn.png)`
- Matriz de confusão SVM: `![Matriz SVM](imagens/matriz_svm.png)`
- Curva ROC: `![ROC](imagens/roc.png)`
- Comparativo de métricas: `![Comparação](imagens/comparacao.png)`

### 2.6 Comparação dos resultados
(preencher — tabela KNN x SVM por métrica e qual venceu)

### 2.7 Conclusão
(preencher — qual modelo foi melhor, por quê, limitações e aprendizados)

---

## 3. Dataset
<!-- Exigência: explicar qual, origem, qtd, atributos, alvo, tratamento, split. -->
- **Qual dataset:** Dengue Diseases (dados clínicos/hematológicos).
- **Origem:** (preencher — link/Kaggle/Mendeley de onde foi obtido).
- **Quantidade de registros:** 989 registros, 9 colunas.
- **Variável alvo:** `dengue_label` (0 = sem dengue, 1 = dengue).
- **Principais atributos:** age, gender, hemoglobin_g_dl, wbc_count, differential_count,
  rbc_count, platelet_count, platelet_distribution_width.
- **Tratamento/preparação realizada:**
  - [ ] One-Hot Encoding na coluna `gender` (Male/Female/Child)
  - [ ] `rbc_count` e `differential_count` tratados como binários
  - [ ] Tratamento de outliers (`age`, `platelet_distribution_width`) via IQR/Z-score
  - [ ] Correção de fim de linha (`\r`) na leitura
  - [ ] Escalonamento (MinMax ou StandardScaler) — obrigatório p/ KNN e SVM
  - [ ] (Opcional) Balanceamento de classes no treino (SMOTE / Tomek Links)
- **Divisão treino/teste:** (preencher — ex.: 80/20 estratificado).
- **Instruções de download:** (preencher, caso o dataset não esteja no repositório).

---

## 4. Como executar o projeto
(preencher)
1. Abrir o notebook no Google Colab (ou Jupyter).
2. Fazer upload do arquivo CSV do dataset.
3. Executar as células na ordem.
4. (preencher) Onde fica o modelo treinado e como carregá-lo.

---

## 5. Modelo treinado
- [ ] Modelo salvo no repositório (`modelo_knn.pkl` / `modelo_svm.pkl`) **ou**
- [ ] Instruções de download (caso seja muito grande): onde está, como baixar, em qual pasta
      colocar e como executar.

---

## 6. Critérios de avaliação (referência — total 3,0 pontos)
| Critério | Valor | Status |
|---|---|---|
| Organização do repositório, README e PDF | 0,3 | [ ] |
| Descrição do problema, contextualização e hipótese | 0,3 | [ ] |
| Dataset, preparação dos dados e explicação | 0,3 | [ ] |
| Treinamento com método da Parte 1 (KNN) | 0,3 | [ ] |
| Treinamento com método da Parte 2 (SVM) | 0,3 | [ ] |
| Avaliação dos modelos com métricas e gráficos | 0,3 | [ ] |
| Comparação dos resultados e conclusão | 0,2 | [ ] |
| Apresentação e perguntas | 1,0 | [ ] |
| **Total** | **3,0** | |

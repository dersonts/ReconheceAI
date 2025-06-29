# ReconheceAI - Gestão Inteligente de Talentos

Sistema de IA para reconhecimento e retenção de talentos com análise preditiva e recomendações personalizadas.

## 🚀 Funcionalidades

- **Dashboard Executivo**: Visão geral com métricas de retenção e performance
- **Análise de Colaboradores**: Perfil detalhado com score de reconhecimento
- **IA Generativa**: Análises de risco, impacto e planos de retenção
- **Detecção de Anomalias**: Identificação de padrões anômalos de absenteísmo
- **Análise de Sentimento**: Avaliação do feedback das avaliações
- **Configurações Personalizáveis**: Ajuste de pesos para cálculo de scores

## 🛠️ Tecnologias

### Frontend
- **React 18** com TypeScript
- **Tailwind CSS** para estilização
- **Recharts** para visualizações
- **Zustand** para gerenciamento de estado
- **React Router** para navegação
- **Lucide React** para ícones

### Backend (Comentado para uso futuro)
- **Azure Functions** com .NET 8
- **Azure OpenAI** para análises de IA
- **Azure Cognitive Services** para análise de sentimento
- **Azure Anomaly Detector** para detecção de anomalias

## 📦 Instalação e Execução

### Modo Local (Atual)

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev
```

O sistema rodará em `http://localhost:3000` usando dados simulados do CSV.

### Modo Azure (Para uso futuro)

Para usar com Azure Functions, siga estes passos:

1. **Configure as variáveis de ambiente no Azure:**
   ```
   AZURE_OPENAI_KEY=sua_chave_openai
   AZURE_OPENAI_ENDPOINT=seu_endpoint_openai
   AZURE_OPENAI_DEPLOYMENT_NAME=seu_deployment
   AZURE_LANGUAGE_KEY=sua_chave_language
   AZURE_LANGUAGE_ENDPOINT=seu_endpoint_language
   AZURE_ANOMALY_KEY=sua_chave_anomaly
   AZURE_ANOMALY_ENDPOINT=seu_endpoint_anomaly
   ```

2. **Descomente e configure os serviços Azure:**
   - Em `src/store/useStore.ts`: substitua `LocalDataService` por `AzureDataService`
   - Em `vite.config.ts`: descomente a configuração de proxy
   - Configure a URL da API no arquivo de ambiente

3. **Execute o backend:**
   ```bash
   cd backend
   func start
   ```

4. **Execute o frontend:**
   ```bash
   npm run dev
   ```

## 📊 Dados

O sistema utiliza dados de colaboradores com as seguintes informações:
- Informações pessoais (nome, cargo, tempo de casa)
- Métricas de performance (desempenho, absenteísmo, advertências)
- Avaliações de risco (risco de perda, impacto da perda)
- Feedback das avaliações

## 🔧 Configuração

### Pesos para Cálculo de Score

O sistema permite configurar os pesos utilizados no cálculo do score de reconhecimento:

- **Desempenho** (0-50%): Peso do desempenho do colaborador
- **Tempo no Cargo** (0-30%): Experiência na função atual
- **Tempo na Casa** (0-25%): Tempo total na empresa
- **Risco de Perda** (0-40%): Probabilidade de saída
- **Impacto da Perda** (0-40%): Impacto da saída na organização
- **Absenteísmo** (0-25%): Taxa de faltas

*Nota: A soma dos pesos deve ser igual a 100%*

## 🤖 Análises de IA

O sistema oferece três tipos de análise:

1. **Análise de Risco**: Diagnóstico do risco de perda e plano de retenção
2. **Análise de Impacto**: Avaliação do impacto da potencial saída
3. **Plano de Reconhecimento**: Estratégias personalizadas de reconhecimento

## 📈 Métricas e Dashboards

- **Métricas Gerais**: Total de colaboradores, alto risco, score médio, taxa de retenção
- **Distribuição de Risco**: Visualização da distribuição por níveis de risco
- **Top Performers**: Ranking dos melhores colaboradores
- **Métricas Departamentais**: Análise por departamento

## 🔒 Segurança

- Dados sensíveis protegidos por variáveis de ambiente
- Autenticação e autorização via Azure AD (quando usando Azure)
- Comunicação segura via HTTPS

## 🚀 Deploy

### Desenvolvimento Local
O sistema roda completamente local usando dados simulados.

### Produção (Azure)
1. Deploy do backend via Azure Functions
2. Deploy do frontend via Azure Static Web Apps ou similar
3. Configuração das variáveis de ambiente
4. Configuração dos serviços cognitivos

## 📝 Licença

Este projeto é proprietário e confidencial.

## 🤝 Contribuição

Para contribuir com o projeto:
1. Faça um fork do repositório
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📞 Suporte

Para suporte técnico, entre em contato com a equipe de desenvolvimento.
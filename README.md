🌊 Sistema de Monitoramento e Alerta de Enchentes – Back-end (API)

--------------------------------------------------------------------
📌 RESUMO DO PROJETO
--------------------------------------------------------------------

Este backend foi desenvolvido para integrar um sistema IoT de monitoramento de enchentes. 
Ele recebe dados enviados por um sensor ultrassônico, classifica o nível de risco, armazena 
no banco de dados, registra logs e envia alertas automáticos por e-mail quando ocorre mudança 
no nível detectado.

--------------------------------------------------------------------
🚀 FUNCIONALIDADES PRINCIPAIS
--------------------------------------------------------------------

1. Recebimento de dados do sensor ultrassônico
2. Classificação automática do nível de risco (normal, médio, enchente)
3. Envio automático de e-mail via Resend quando o nível muda
4. Registro das medições no banco (distância, nível, data)
5. Sistema de logs registrando cada ação executada
6. Endpoints para consulta de medições e logs

--------------------------------------------------------------------
📡 CLASSIFICAÇÃO DE NÍVEL
--------------------------------------------------------------------

• Distância ≤ 5 cm      → ENCHENTE
• Distância ≤ 20 cm     → NÍVEL MÉDIO
• Distância > 20 cm     → NORMAL

O e-mail só é enviado quando o nível muda, evitando spam.

--------------------------------------------------------------------
📦 TECNOLOGIAS UTILIZADAS
--------------------------------------------------------------------

• Node.js
• Express.js
• MongoDB + Mongoose
• Resend (API de envio de e-mails)
• CORS
• dotenv
• IoT (sensor ultrassônico)

--------------------------------------------------------------------
📁 ESTRUTURA DO PROJETO
--------------------------------------------------------------------

src/
 ├── config/db.js
 ├── controllers/
 │    ├── sensorController.js
 │    └── logController.js
 ├── models/
 │    ├── Medicoes.js
 │    └── Log.js
 ├── routes/
 │    ├── sensorRoutes.js
 │    └── logRoutes.js
 ├── midddlewares/log.js
 ├── service/emailService.js
 ├── utils/state.js
 └── server.js

--------------------------------------------------------------------
⚙️ INSTALAÇÃO E EXECUÇÃO
--------------------------------------------------------------------

1. Instalar dependências:
   npm install

2. Criar arquivo .env com:
   PORT=3000
   MONGO_URI=sua_string_mongo
   RESEND_API_KEY=sua_chave_resend
   ALERT_EMAILS=email1@gmail.com,email2@gmail.com

3. Rodar servidor:
   npm start

--------------------------------------------------------------------
📡 ENDPOINTS DISPONÍVEIS
--------------------------------------------------------------------

POST /
→ Envia a distância medida pelo sensor
Exemplo:
{
  "distancia": 12
}

GET /
→ Retorna todas as medições registradas

GET /logs
→ Retorna os logs do sistema (ações, payload, IP, user-agent)

--------------------------------------------------------------------
✉️ ENVIO DE ALERTAS
--------------------------------------------------------------------

O serviço de envio de e-mails utiliza a API Resend.

O e-mail inclui:
• Nível detectado
• Distância registrada
• Orientações de segurança

--------------------------------------------------------------------
📘 SISTEMA DE LOGS
--------------------------------------------------------------------

Cada requisição registra:
• Ação (ex.: DADOS_RECEBIDOS)
• Payload recebido
• IP do dispositivo
• User-Agent do remetente

Útil para auditoria e rastreamento.

--------------------------------------------------------------------
📈 FLUXO COMPLETO DO SISTEMA
--------------------------------------------------------------------

1. Sensor mede a distância
2. Microcontrolador envia POST com dados
3. Backend classifica o nível
4. Salva medição no banco
5. Compara com último nível registrado
6. Envia e-mail se houver mudança
7. Registra log da operação

--------------------------------------------------------------------
📌 POSSÍVEIS MELHORIAS FUTURAS
--------------------------------------------------------------------

• Dashboard em tempo real (gráficos e indicadores)
• Notificação mobile via push
• Suporte a múltiplos sensores
• Predição com IA
• Autenticação JWT

--------------------------------------------------------------------
✔ CONCLUSÃO
--------------------------------------------------------------------

Este backend é simples, eficiente e ideal para soluções de monitoramento 
ambiental em IoT. Ele garante:
• Confiabilidade
• Segurança
• Baixo consumo de recursos
• Escalabilidade

--------------------------------------------------------------------
FIM DO DOCUMENTO
--------------------------------------------------------------------

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendAlertEmail(distancia, level) {
  const message = `
  
🚨 SISTEMA DE MONITORAMENTO — ALERTA DE ENCHENTES 🚨

Parâmetros detectados pelo sensor ultrassônico:

• Classificação do nível: ${level.toUpperCase()}
• Distância registrada: ${distancia} cm

⚠ O valor atual indica risco potencial de enchente.
Monitore o local e siga as orientações de segurança.
  `;

  await resend.emails.send({
    from:  "Alertas <onboarding@resend.dev>",
    to: process.env.ALERT_EMAILS.split(","),
    subject: `⚠️ Alerta de ${level.toUpperCase()}`,
    text: message
  });
}

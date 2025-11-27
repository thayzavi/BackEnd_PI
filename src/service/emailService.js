import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendAlertEmail(distancia, level) {
  const message = `
🚨 ALERTA DE ENCHENTES 🚨

Nível detectado: ${level.toUpperCase()}
Distância atual: ${distancia} cm
  `;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: process.env.ALERT_EMAILS.split(","),
    subject: `⚠️ Alerta de ${level.toUpperCase()}`,
    text: message
  });
}

import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

// Função para gerar a mensagem
function gerarMensagem(distancia, level) {
  let titulo = "";
  let texto = "";

  if (level === "enchentes") {
    titulo = "🚨 ALERTA MÁXIMO — RISCO CRÍTICO DE ENCHENTE";
    texto = `
O PROALERT identificou um nível extremamente alto de água na via monitorada.

📊 Detalhes:
• Nível: ENCHENTE
• Distância detectada: ${distancia} cm

⚠ Riscos:
• Bloqueio total da via
• Alagamentos intensos
• Risco à mobilidade e segurança

Recomendação:
Evite totalmente a área até novo aviso.
    `;
  }

  else if (level === "medio") {
    titulo = "⚠ ALERTA — NÍVEL DE ÁGUA ELEVADO";
    texto = `
O PROALERT detectou aumento moderado no nível da água.

📊 Detalhes:
• Nível: MÉDIO
• Distância: ${distancia} cm

⚠ Possíveis impactos:
• Trânsito lento
• Acúmulo de água em pontos específicos

Recomendação:
Tenha cautela e considere rotas alternativas.
    `;
  }

  else if (level === "normal") {
    titulo = "✅ SITUAÇÃO NORMALIZADA — NÍVEL ESTÁVEL";
    texto = `
O PROALERT informa que o nível da água voltou ao normal.

📊 Detalhes:
• Nível: NORMAL
• Distância: ${distancia} cm

✔ A via está com condições seguras de tráfego.
    `;
  }

  else {
    titulo = "ℹ Atualização de Nível";
    texto = `
O sistema registrou uma atualização de nível de água.

📊 Detalhes:
• Nível: ${level.toUpperCase()}
• Distância: ${distancia} cm
    `;
  }

  return { titulo, texto };
}
// Função de envio do e-mail
export async function sendAlertEmail(distancia, level) {

  const { titulo, texto } = gerarMensagem(distancia, level);

  await resend.emails.send({
    from: "Alertas PROALERT <onboarding@resend.dev>",
    to: process.env.ALERT_EMAILS.split(","),
    subject: titulo,
    text: texto
  });
}

import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pas: process.env.EMAIL_PASS
    }
});

export async function sendAlertEmail(distancia, level) {
    const message = `
        🚨 ALERTA DE ENCHENTES 🚨

        Nível detectado: ${level.toUpperCase()}
        Distância atual: ${distancia} cm

        Acesse o dashboard para acompanhar em tempo real.
    `;

    const alertEmail = process.env.ALERT_EMAILS.split(",");

    await transporter.sendMail({
        from: `"Alerta Enchentes" <${process.env.EMAIL_USER}>`,
        to: alertEmail,
        subject: `⚠️ Alerta de ${level.toUpperCase()} detectado`,
        text: message
    });
}
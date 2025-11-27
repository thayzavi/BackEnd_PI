import Medicao from "../models/Medicoes.js";
import { sendAlertEmail } from "../service/emailService.js";
import { lastLevel, updateLevel } from "../utils/state.js";

export async function receiveData(req, res) {
    const { distancia, nivel } = req.body;

    if (distancia === undefined) {
        return res.status(400).json({ error: "Distância não enviada" });
    }

    // Mapeia nível vindo da ESP32
    const configNiveis = {
        0: "normal",
        1: "medio",
        2: "enchentes"
    };

    let level = configNiveis[nivel] || "normal";

    const medicao = await Medicao.create({ distancia, level });

    if (level !== lastLevel) {
        try {
            updateLevel(level);
            await sendAlertEmail(distancia, level);
            console.log("Email enviado com sucesso!");
        } catch (err) {
            console.error("Erro ao enviar email:", err);
        }
    }

    return res.status(201).json({ message: "Dado registrado com sucesso", medicao });
}


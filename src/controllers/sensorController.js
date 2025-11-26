import Medicao from "../models/Medicoes.js";
import { sendAlertEmail } from "../service/emailService.js";
import { lastLevel, updateLevel } from "../utils/state.js";

export async function receiveData(req, res) {
    const { distancia } = req.body;

    if (distancia === undefined) {
        return res.status(400).json({ error: "Distância não enviada" });
    }

    let level = "normal";
    if (distancia <= 5) level = "enchentes";
    else if (distancia <= 20) level = "medio";

    const medicao = await Medicao.create({ distancia, level });

    if (level !== lastLevel) {
        try{
            updateLevel(level);
            await sendAlertEmail(distancia, level);
            console.log("Email enviado com sucesso!");
        }   catch (err) {
            console.error("Error ao enviar email:", err);
        }
    }

    return res.status(201).json({ message: "Dado registrado com sucesso", medicao });
}

export async function getAllData(req, res) {
    const medicoes = await Medicao.find().sort({ createdAt: -1 });
    return res.json(medicoes);
}

import { logAction } from "../midddlewares/log.js";
import Medicao from "../models/Medicoes.js";
import { sendAlertEmail } from "../service/emailService.js";
import { lastLevel, updateLevel } from "../utils/state.js";

// MESMOS VALORES DO IOT
const NIVEL_NORMAL = 20;
const NIVEL_MEDIO = 10;

// === Cálculo oficial do nível (USAR SOMENTE ESTE) ===
function calcularNivel(distancia) {
  if (distancia > NIVEL_NORMAL) {
    return "normal";
  } else if (distancia > NIVEL_MEDIO && distancia <= NIVEL_NORMAL) {
    return "medio";
  } else {
    return "enchente"; // ALERTA MÁXIMO
  }
}

export async function receiveData(req, res) {
  const { distancia } = req.body;

  await logAction("DADOS_RECEBIDOS", { distancia }, req);

  if (distancia === undefined) {
    return res.status(400).json({ error: "Distância não enviada" });
  }

  // 🔥 Agora o nível é calculado SOMENTE pela função correta
  const level = calcularNivel(distancia);

  // Salva na base de dados
  const medicao = await Medicao.create({ distancia, level });

  // Só envia e-mail se o nível mudar (anti-spam)
  if (level !== lastLevel) {
    try {
      updateLevel(level);
      await sendAlertEmail(distancia, level);
      console.log("E-mail enviado com sucesso!");
    } catch (err) {
      console.error("Erro ao enviar e-mail:", err);
    }
  }

  return res.status(201).json({
    message: "Dado registrado com sucesso",
    medicao,
  });
}

export async function getAllData(req, res) {
  const medicoes = await Medicao.find().sort({ createdAt: -1 });
  return res.json(medicoes);
}

import Medicao from "../models/Medicoes.js";

export async function receiveData(req, res) {
    const { distancia } = req.body;

    if (!distancia) {
        return res.status(400).json({ error: "Distância não enviada"});
    }

    let level = "normal";

    if (distancia <= 5) level = "enchentes";
    else if (distancia <= 20) level = "medio";

    const medicao = await Medicao.create({
        distancia,
        level
    });

    return res.json({ message: "Dado registrado com sucesso", medicao});
}

export async function getAllData(req, res) {
    const medicoes = await Medicao.find().sort({ createdAt: -1 });
    return res.json(medicoes);
}

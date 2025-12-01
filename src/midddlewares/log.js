import Log from "../models/Log";

export async function logAction(action, payload, req){
    try {
        await Log.create({
            action,
            payload,
            id: req.ip,
            userAgent: req.headers["user-agent"]
        });
    }  catch (err) {
        console.error("Erro ao registrar log:", err);
    }
}
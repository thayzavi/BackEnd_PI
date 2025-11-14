import mongoose from "mongoose";

const MedicoesSchema = new mongoose.Schema({
    distancia: Number,
    level: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Medicao", MedicoesSchema);

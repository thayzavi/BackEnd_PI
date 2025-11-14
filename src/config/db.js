import mongoose from "mongoose";

export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo conectado com sucesso");
    }   catch (error) {
        console.error("Erro ao conectar ao MongoDB", error);
    }
}
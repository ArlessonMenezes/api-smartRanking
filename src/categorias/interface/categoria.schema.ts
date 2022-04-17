import { timeStamp } from 'console';
import * as mongoose from 'mongoose';
import { IJogador } from '../../jogadores/interfaces/Jogador.interface';

export const CategoriaSchema = new mongoose.Schema({
    cetegoria: { type: String, unique: true },
    descricao: { type: String, unique: true },
    eventos: [
        {
            nome: { type: String },
            operacao: { type: String },
            valor: { type: Number },
        }
    ],
    jogadores: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'IJogador'
    }]
}, { timestamps: true, collection: 'categorias' })  
import { Document } from 'mongoose';
import { IJogador } from '../../jogadores/interfaces/Jogador.interface';
import { IEvento } from './evento.interface';

export interface ICategoria extends Document {  
    readonly categoria: string;
    descricao: string;
    eventos: Array<IEvento>;
    jogadores: Array<IJogador>
}
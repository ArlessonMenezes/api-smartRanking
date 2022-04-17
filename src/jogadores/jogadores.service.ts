import { Injectable } from '@nestjs/common';
import { CriarJogadorDto } from './dto/criar-jogador-dto';
import { IJogador } from '../../dist/jogadores/interfaces/Jogador.interface';
import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BadRequestException } from '@nestjs/common';
import { AtualizarJogadotDto } from './dto/atualizar-jogador.dto';

@Injectable()
export class JogadoresService {
    constructor(
        @InjectModel('Jogador')
        private readonly jogadorModel: Model<IJogador>  
    ) {}

    async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<IJogador> {
        const { email } = criarJogadorDto;

        const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

        if (jogadorEncontrado) {
            throw new BadRequestException(`Jogador com e-mail ${jogadorEncontrado} já existe`)
        } 
        
        const jogadorCriado = new this.jogadorModel(criarJogadorDto)
        return await jogadorCriado.save()
    }

    async consultarJogadores(): Promise<IJogador[]> {
        return await this.jogadorModel.find().exec()
    }

    async consultarJogadorPorId(id: string): Promise<IJogador> {

        const jogadorEncontrado = await this.jogadorModel.findOne({ id })

        if (!jogadorEncontrado) {
            throw new NotFoundException('Jogador não encontrado')
        }

        return jogadorEncontrado;    
    }

    async atualizarJogador(id: string, atualizarJogadotDto: AtualizarJogadotDto): Promise<void> {

        const jogadorEncontrado = await this.jogadorModel.findById(id)

        if (!jogadorEncontrado) {
            throw new NotFoundException('Jogador não encontrado')
        }

        await this.jogadorModel.findOneAndUpdate(
        { id }, { $set: atualizarJogadotDto }).exec();
    }

    async deletarJogador(id: string): Promise<any> {
        return await this.jogadorModel.deleteOne({ id }).exec();        
    }
}

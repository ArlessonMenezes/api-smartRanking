import { Injectable } from '@nestjs/common';
import { CriarJogadorDto } from './dto/criar-jogador-dto';
import { IJogador } from '../../dist/jogadores/interfaces/Jogador.interface';
import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
    constructor(
        @InjectModel('Jogador')
        private readonly jogadorModel: Model<IJogador>  
    ) {}

    async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
        const { email } = criarJogadorDto;

        //const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email)

        const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

        if (jogadorEncontrado) {
            return this.atualizarJogador(criarJogadorDto)
        } 
        
        this.criar(criarJogadorDto)
    }

   private async criar(criarJogadorDto: CriarJogadorDto): Promise<IJogador> {

        const jogadorCriado = new this.jogadorModel(criarJogadorDto)
        return await jogadorCriado.save()

        /*
        const { telefoneCelular, email, nome } = criarJogadorDto;

       const jogador: IJogador =  {
            id: uuidv4(),
            telefoneCelular,
            email,
            nome,
            ranking: "A",
            posicaoRanking: 1,
            urlFotoJogador: "www.google.com.br/foto123.jpg"
       }

       this.jogadores.push(jogador);
       */
    }

    async consultarJogadores(): Promise<IJogador[]> {
        return await this.jogadorModel.find().exec()
    }

    async consultarJogadorPorEmail(email: string): Promise<IJogador> {
        //const jogadorEncontrado = this.jogadores.find(jogaodor => jogaodor.email === email)

        const jogadorEncontrado = await this.jogadorModel.findOne({ email })

        if (jogadorEncontrado) {
            return jogadorEncontrado;
        }

        throw new NotFoundException('Jogador não encontrado')
    }

    private async atualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
        return await this.jogadorModel.findOneAndUpdate(
            { email: criarJogadorDto.email }, { $set: criarJogadorDto }
        ).exec();
        
        /*
        const { nome } = criarJogadorDto;
        jogadorEncontrado.nome = nome
        */
    }

    async deletarJogador(email: string): Promise<any> {
        return await this.jogadorModel.remove({ email }).exec();
        
        /*
        const jogadorencontrado = this.jogadores.find(jogador => jogador.email === email)
        this.jogadores = this.jogadores.filter(jogador => jogador.email !== jogadorencontrado.email)        
        */
    }
}

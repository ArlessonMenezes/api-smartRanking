import { Body, Get, HttpCode, Query } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { CriarJogadorDto } from './dto/criar-jogador-dto';
import { IJogador } from './interfaces/Jogador.interface';
import { JogadoresService } from './jogadores.service';

@Controller('jogadores')
export class JogadoresController {
    constructor(
        private readonly jogadoresServices: JogadoresService
    ) {}

    @HttpCode(201)
    @Post()
    async criarAtualizarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
        return this.jogadoresServices.criarAtualizarJogador(criarJogadorDto);
    }

    @Get()
    async consultarJogadores(@Query('email') email: string): Promise<IJogador[] | IJogador> {
        if (email) {
            return this.jogadoresServices.consultarJogadorPorEmail(email);
        }
        return this.jogadoresServices.consultarJogadores();
    }

    @Delete()
    async deletarJogador(@Query('email') email: string): Promise<void> {
        return this.jogadoresServices.deletarJogador(email);
    }
}

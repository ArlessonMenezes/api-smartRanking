import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AtualizarJogadotDto } from './dto/atualizar-jogador.dto';
import { CriarJogadorDto } from './dto/criar-jogador-dto';
import { IJogador } from './interfaces/Jogador.interface';
import { JogadoresService } from './jogadores.service';
import { JogadoresValidacaoParametrosPipe } from './pipes/jogadores-validacao-parametros.pipe';

@Controller('jogadores')
export class JogadoresController {
    constructor(
        private readonly jogadoresServices: JogadoresService
    ) {}

    @Post()
    async criarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
        return this.jogadoresServices.criarJogador(criarJogadorDto);
    }

    @Get()
    async consultarJogadores(): Promise<IJogador[]> {
        return await this.jogadoresServices.consultarJogadores()
    }

    @Get('/:_id')
    async consultarJogadorePorId(@Param('_id', JogadoresValidacaoParametrosPipe) _id: string): Promise<IJogador> {
            return await this.jogadoresServices.consultarJogadorPorId(_id)
    }

    @Put('/:_id')
    async atualizarJogador(
        @Param('_id', JogadoresValidacaoParametrosPipe) _id: string, 
        @Body() atualizarJogadotDto: AtualizarJogadotDto): Promise<void> {        
        return await this.jogadoresServices.atualizarJogador(_id, atualizarJogadotDto);
    }

    @Delete('/:_id')
    async deletarJogador(@Param('_id', JogadoresValidacaoParametrosPipe) _id: string): Promise<void> {
        return this.jogadoresServices.deletarJogador(_id);
    }
}

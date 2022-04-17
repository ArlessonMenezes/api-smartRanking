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

    @Get('/:id')
    async consultarJogadorePorId(@Param('id', JogadoresValidacaoParametrosPipe) id: string): Promise<IJogador> {
            return await this.jogadoresServices.consultarJogadorPorId(id)
    }

    @Put('/:id')
    async atualizarJogador(
        @Param('id', JogadoresValidacaoParametrosPipe) id: string, 
        @Body() atualizarJogadotDto: AtualizarJogadotDto): Promise<void> {        
        return await this.jogadoresServices.atualizarJogador(id, atualizarJogadotDto);
    }

    @Delete('/:id')
    async deletarJogador(@Param('id', JogadoresValidacaoParametrosPipe) id: string): Promise<void> {
        return this.jogadoresServices.deletarJogador(id);
    }
}

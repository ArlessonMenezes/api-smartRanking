import { PartialType } from '@nestjs/mapped-types';
import { CriarJogadorDto } from './criar-jogador-dto';

export class EditarJogadotDto extends PartialType(CriarJogadorDto) {}


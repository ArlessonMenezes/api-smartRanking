import { IsNotEmpty } from 'class-validator';

export class AtualizarJogadotDto {
    @IsNotEmpty()
    readonly telefoneCelular: string;

    @IsNotEmpty()
    readonly nome: string;
}


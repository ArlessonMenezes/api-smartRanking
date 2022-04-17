import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { IEvento } from '../interface/evento.interface';

export class CriarCategoriaDto {
    @IsString()
    @IsNotEmpty()
    readonly categoria: string;

    @IsString()
    @IsNotEmpty()
    readonly descricao: string;
    
    @IsArray()
    @ArrayMinSize(1)
    eventos: Array<IEvento>
}
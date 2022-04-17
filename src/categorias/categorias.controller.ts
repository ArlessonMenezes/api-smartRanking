import { Body, Post, ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CriarCategoriaDto } from './dto/criar-categoria.dto';
import { ICategoria } from './interface/categoria.interface';

@Controller('categorias')
export class CategoriasController {
    constructor(
        private readonly categoriasService: CategoriasService
    ){}

    @Post()
    @UsePipes(ValidationPipe)
    async criarCategoria(
        @Body() criarCategoriaDto: CriarCategoriaDto): Promise<ICategoria> {
           return await this.categoriasService.criarCategoria(criarCategoriaDto)
    }
}

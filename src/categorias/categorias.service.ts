import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CriarCategoriaDto } from './dto/criar-categoria.dto';
import { ICategoria } from './interface/categoria.interface';

@Injectable()
export class CategoriasService {
    constructor(
        @InjectModel('Categoria')
        private  readonly categoriaModel: Model<ICategoria>
    ){}

        async criarCategoria(criarCategoriaDto: CriarCategoriaDto): Promise<ICategoria> {
        const { categoria } = criarCategoriaDto;
        const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();

        if (categoriaEncontrada) {
            throw new BadRequestException(`Categoria ${categoriaEncontrada} já existe`)
        }

        const categoriaCriada = new this.categoriaModel(criarCategoriaDto);
        return await categoriaCriada.save();
            
    }
}

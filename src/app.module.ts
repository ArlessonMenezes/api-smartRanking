import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://arlesson30:I2ofsXDED3rzFsfF@cluster0.ih4fl.mongodb.net/apismartranking?retryWrites=true&w=majority'),
    JogadoresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

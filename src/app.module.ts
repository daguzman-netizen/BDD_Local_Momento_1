import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: './datos.sqlite',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsuariosModule,
  ],
})
export class AppModule {}
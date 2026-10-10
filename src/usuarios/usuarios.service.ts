
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly repo: Repository<Usuario>,
  ) {}

  crear(datos: CrearUsuarioDto) {
    const usuario = this.repo.create(datos);
    return this.repo.save(usuario);
  }

  listar() {
    return this.repo.find();
  }

  async buscar(id: number) {
    const usuario = await this.repo.findOneBy({ id });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return usuario;
  }

  async actualizar(id: number, datos: ActualizarUsuarioDto) {
    const usuario = await this.buscar(id);
    Object.assign(usuario, datos);
    return this.repo.save(usuario);
  }

  async eliminar(id: number) {
    const usuario = await this.buscar(id);
    await this.repo.remove(usuario);
    return { mensaje: 'Usuario eliminado correctamente' };
  }
}
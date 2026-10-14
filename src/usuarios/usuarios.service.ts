
import { Injectable, NotFoundException } from '@nestjs/common';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  private usuarios: Usuario[] = [];
  private siguienteId = 1;

  crear(datos: CrearUsuarioDto) {
    const usuario = Object.assign(new Usuario(), {
      id: this.siguienteId++,
      ...datos,
    });

    this.usuarios.push(usuario);
    return usuario;
  }

  listar() {
    return this.usuarios;
  }

  buscar(id: number) {
    const usuario = this.usuarios.find((u) => u.id === id);

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return usuario;
  }

  actualizar(id: number, datos: ActualizarUsuarioDto) {
    const usuario = this.buscar(id);
    Object.assign(usuario, datos);
    return usuario;
  }

  eliminar(id: number) {
    const usuario = this.buscar(id);
    this.usuarios = this.usuarios.filter((u) => u.id !== id);

    return { mensaje: 'Usuario eliminado correctamente' };
  }
}

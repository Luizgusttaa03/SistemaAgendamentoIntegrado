import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

/**
 * Service responsável pela autenticação e autorização
 * Gerencia login, registro e validação de tokens JWT
 */
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  /**
   * Autentica um usuário com email e senha
   * @param loginDto - Dados de login
   * @returns Token JWT e informações do usuário
   */
  async login(loginDto: LoginDto) {
    const { email, senha } = loginDto;

    // Busca o usuário pelo email
    const usuario = await this.prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Verifica a senha
    const senhaValida = await bcrypt.compare(senha, usuario.senhaHash);
    if (!senhaValida) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Gera o token JWT
    const payload = { sub: usuario.id, email: usuario.email };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: {
        id: usuario.id,
        email: usuario.email,
        criadoEm: usuario.criadoEm,
      },
    };
  }

  /**
   * Registra um novo usuário
   * @param createUserDto - Dados do usuário
   * @returns Usuário criado (sem senha)
   */
  async register(createUserDto: CreateUserDto) {
    const { email, senha } = createUserDto;

    // Verifica se o email já existe
    const usuarioExistente = await this.prisma.usuario.findUnique({
      where: { email },
    });

    if (usuarioExistente) {
      throw new ConflictException('Email já está em uso');
    }

    // Cria o hash da senha
    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(senha, saltRounds);

    // Cria o usuário
    const usuario = await this.prisma.usuario.create({
      data: {
        email,
        senhaHash,
      },
    });

    // Retorna o usuário sem a senha
    return {
      id: usuario.id,
      email: usuario.email,
      criadoEm: usuario.criadoEm,
    };
  }

  /**
   * Valida um usuário pelo ID (usado pelo JWT strategy)
   * @param userId - ID do usuário
   * @returns Usuário válido
   */
  async validateUser(userId: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: userId },
    });

    if (!usuario) {
      throw new UnauthorizedException('Token inválido');
    }

    return {
      id: usuario.id,
      email: usuario.email,
      criadoEm: usuario.criadoEm,
    };
  }
}

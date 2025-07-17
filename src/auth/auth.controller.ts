import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  UsePipes,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';

/**
 * Controller responsável pela autenticação
 * Gerencia login e registro de usuários
 */
@Controller('auth')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Autentica um usuário
   * POST /auth/login
   * @param loginDto - Dados de login
   * @param res - Objeto de resposta Express
   * @returns Informações do usuário com token no header
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const result = await this.authService.login(loginDto);

    // Define o token no header Authorization
    res.setHeader('Authorization', `Bearer ${result.access_token}`);

    // Retorna apenas os dados do usuário no body
    return res.json({
      user: result.user,
      message: 'Login realizado com sucesso',
    });
  }

  /**
   * Registra um novo usuário
   * POST /auth/register
   * @param createUserDto - Dados do usuário
   * @returns Usuário criado (sem senha)
   */
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }
}

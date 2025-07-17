import { IsEmail, IsString, MinLength } from 'class-validator';

/**
 * DTO para criar um novo usuário
 * Contém as validações necessárias para registro
 */
export class CreateUserDto {
  /**
   * Email do usuário
   * Deve ser um email válido e único
   */
  @IsEmail({}, { message: 'Email deve ser válido' })
  email: string;

  /**
   * Senha do usuário
   * Deve ter pelo menos 6 caracteres
   */
  @IsString()
  @MinLength(6, { message: 'Senha deve ter pelo menos 6 caracteres' })
  senha: string;
}

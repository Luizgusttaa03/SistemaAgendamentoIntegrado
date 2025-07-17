import { IsString, IsNotEmpty, MinLength } from 'class-validator';

/**
 * DTO para criar um novo barbeiro
 * Contém as validações necessárias para os dados de entrada
 */
export class CreateBarbeiroDto {
  /**
   * Nome do barbeiro
   * Deve ser uma string não vazia com pelo menos 3 caracteres
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Nome deve ter pelo menos 3 caracteres' })
  nome: string;
}

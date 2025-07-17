import { IsString, IsNotEmpty, MinLength, Matches } from 'class-validator';

/**
 * DTO para criar um novo cliente
 * Contém as validações necessárias para os dados de entrada
 */
export class CreateClienteDto {
  /**
   * Nome do cliente
   * Deve ser uma string não vazia com pelo menos 2 caracteres
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'Nome deve ter pelo menos 2 caracteres' })
  nome: string;

  /**
   * Telefone do cliente
   * Deve ser uma string não vazia com formato válido
   */
  @IsString()
  @IsNotEmpty()
  @Matches(/^[\d\s\-\(\)]+$/, { message: 'Telefone deve conter apenas números, espaços, hífens e parênteses' })
  telefone: string;
}

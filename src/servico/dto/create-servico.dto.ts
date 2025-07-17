import { IsString, IsNotEmpty, MinLength, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * DTO para criar um novo serviço
 * Contém as validações necessárias para os dados de entrada
 */
export class CreateServicoDto {
  /**
   * Nome do serviço
   * Deve ser uma string não vazia com pelo menos 2 caracteres
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'Nome deve ter pelo menos 2 caracteres' })
  nome: string;

  /**
   * Duração do serviço em minutos
   * Deve ser um número inteiro positivo
   */
  @Type(() => Number)
  @IsInt({ message: 'Duração deve ser um número inteiro' })
  @Min(1, { message: 'Duração deve ser pelo menos 1 minuto' })
  duracaoMinutos: number;

  /**
   * Preço do serviço em centavos
   * Deve ser um número inteiro positivo
   */
  @Type(() => Number)
  @IsInt({ message: 'Preço deve ser um número inteiro' })
  @Min(1, { message: 'Preço deve ser pelo menos 1 centavo' })
  preco: number;
}

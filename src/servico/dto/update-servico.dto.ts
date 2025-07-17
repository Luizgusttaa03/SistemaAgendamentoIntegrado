import { IsString, IsOptional, MinLength, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * DTO para atualizar um serviço existente
 * Todos os campos são opcionais para permitir atualizações parciais
 */
export class UpdateServicoDto {
  /**
   * Nome do serviço (opcional)
   * Se fornecido, deve ser uma string com pelo menos 2 caracteres
   */
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Nome deve ter pelo menos 2 caracteres' })
  nome?: string;

  /**
   * Duração do serviço em minutos (opcional)
   * Se fornecido, deve ser um número inteiro positivo
   */
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Duração deve ser um número inteiro' })
  @Min(1, { message: 'Duração deve ser pelo menos 1 minuto' })
  duracaoMinutos?: number;

  /**
   * Preço do serviço em centavos (opcional)
   * Se fornecido, deve ser um número inteiro positivo
   */
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Preço deve ser um número inteiro' })
  @Min(1, { message: 'Preço deve ser pelo menos 1 centavo' })
  preco?: number;
}

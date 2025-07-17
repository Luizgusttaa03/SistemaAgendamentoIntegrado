import { IsString, IsOptional, MinLength, Matches } from 'class-validator';

/**
 * DTO para atualizar um cliente existente
 * Todos os campos são opcionais para permitir atualizações parciais
 */
export class UpdateClienteDto {
  /**
   * Nome do cliente (opcional)
   * Se fornecido, deve ser uma string com pelo menos 2 caracteres
   */
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Nome deve ter pelo menos 2 caracteres' })
  nome?: string;

  /**
   * Telefone do cliente (opcional)
   * Se fornecido, deve ter formato válido
   */
  @IsOptional()
  @IsString()
  @Matches(/^[\d\s\-\(\)]+$/, { message: 'Telefone deve conter apenas números, espaços, hífens e parênteses' })
  telefone?: string;
}

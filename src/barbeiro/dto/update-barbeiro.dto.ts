import { IsString, IsOptional, MinLength } from 'class-validator';

/**
 * DTO para atualizar um barbeiro existente
 * Todos os campos são opcionais para permitir atualizações parciais
 */
export class UpdateBarbeiroDto {
  /**
   * Nome do barbeiro (opcional)
   * Se fornecido, deve ser uma string com pelo menos 3 caracteres
   */
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'Nome deve ter pelo menos 3 caracteres' })
  nome?: string;
}

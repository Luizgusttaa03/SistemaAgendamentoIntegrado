import { IsString, IsOptional, IsDateString } from 'class-validator';

/**
 * DTO para atualizar um agendamento existente
 * Todos os campos são opcionais para permitir atualizações parciais
 */
export class UpdateAgendamentoDto {
  /**
   * ID do cliente (opcional)
   * Se fornecido, deve ser uma string não vazia (UUID)
   */
  @IsOptional()
  @IsString()
  clienteId?: string;

  /**
   * ID do barbeiro (opcional)
   * Se fornecido, deve ser uma string não vazia (UUID)
   */
  @IsOptional()
  @IsString()
  barbeiroId?: string;

  /**
   * ID do serviço (opcional)
   * Se fornecido, deve ser uma string não vazia (UUID)
   */
  @IsOptional()
  @IsString()
  servicoId?: string;

  /**
   * Data e hora do agendamento (opcional)
   * Se fornecida, deve ser uma string de data válida no formato ISO
   */
  @IsOptional()
  @IsDateString({}, { message: 'Data do agendamento deve ser uma data válida' })
  dataAgendamento?: string;
}

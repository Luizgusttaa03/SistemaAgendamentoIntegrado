import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
} from 'class-validator';

/**
 * DTO para criar um novo agendamento
 * Contém as validações necessárias para os dados de entrada
 */
export class CreateAgendamentoDto {
  /**
   * ID do cliente (opcional)
   * Deve ser uma string não vazia (UUID) se fornecido
   */
  @IsString()
  @IsOptional()
  clienteId?: string;

  /**
   * Nome do cliente
   * Deve ser uma string não vazia
   */
  @IsString()
  @IsNotEmpty()
  clienteNome: string;

  /**
   * ID do barbeiro
   * Deve ser uma string não vazia (UUID)
   */
  @IsString()
  @IsNotEmpty()
  barbeiroId: string;

  /**
   * ID do serviço (opcional)
   * Deve ser uma string não vazia (UUID) se fornecido
   */
  @IsString()
  @IsOptional()
  servicoId?: string;

  /**
   * Data do agendamento
   * Deve ser uma string de data válida no formato ISO
   */
  @IsDateString({}, { message: 'Data do agendamento deve ser uma data válida' })
  data: string;

  /**
   * Hora do agendamento
   * Deve ser uma string no formato HH:mm
   */
  @IsString()
  @IsNotEmpty()
  hora: string;
}

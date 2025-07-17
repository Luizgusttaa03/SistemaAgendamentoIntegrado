import { Module } from '@nestjs/common';
import { AgendamentoService } from './agendamento.service';
import { AgendamentoController } from './agendamento.controller';

/**
 * Módulo do Agendamento
 * Organiza e exporta todos os componentes relacionados aos agendamentos
 */
@Module({
  controllers: [AgendamentoController],
  providers: [AgendamentoService],
  exports: [AgendamentoService],
})
export class AgendamentoModule {}

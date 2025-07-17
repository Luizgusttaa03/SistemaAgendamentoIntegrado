import { Module } from '@nestjs/common';
import { ServicoService } from './servico.service';
import { ServicoController } from './servico.controller';

/**
 * Módulo do Serviço
 * Organiza e exporta todos os componentes relacionados aos serviços
 */
@Module({
  controllers: [ServicoController],
  providers: [ServicoService],
  exports: [ServicoService],
})
export class ServicoModule {}

import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';

/**
 * Módulo do Cliente
 * Organiza e exporta todos os componentes relacionados aos clientes
 */
@Module({
  controllers: [ClienteController],
  providers: [ClienteService],
  exports: [ClienteService],
})
export class ClienteModule {}

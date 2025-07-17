import { Module } from '@nestjs/common';
import { BarbeiroService } from './barbeiro.service';
import { BarbeiroController } from './barbeiro.controller';

/**
 * Módulo do Barbeiro
 * Organiza e exporta todos os componentes relacionados aos barbeiros
 */
@Module({
  controllers: [BarbeiroController],
  providers: [BarbeiroService],
  exports: [BarbeiroService],
})
export class BarbeiroModule {}

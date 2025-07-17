import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Service que gerencia a conexão com o banco de dados via Prisma
 * Estende o PrismaClient para integração com NestJS
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  /**
   * Inicializa a conexão com o banco de dados quando o módulo é carregado
   */
  async onModuleInit() {
    await this.$connect();
  }
}

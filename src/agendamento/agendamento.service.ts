import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { UpdateAgendamentoDto } from './dto/update-agendamento.dto';

/**
 * Service responsável pela lógica de negócio dos agendamentos
 * Gerencia todas as operações CRUD relacionadas aos agendamentos
 */
@Injectable()
export class AgendamentoService {
  constructor(private prisma: PrismaService) {}

  /**
   * Cria um novo agendamento no banco de dados
   * @param createAgendamentoDto - Dados para criar o agendamento
   * @returns O agendamento criado
   */
  async create(createAgendamentoDto: CreateAgendamentoDto) {
    try {
      const { clienteId, clienteNome, barbeiroId, servicoId, data, hora } =
        createAgendamentoDto;

      // Verifica se o cliente existe (se ID fornecido)
      if (clienteId) {
        const cliente = await this.prisma.cliente.findUnique({
          where: { id: clienteId },
        });
        if (!cliente) {
          throw new NotFoundException(
            `Cliente com ID ${clienteId} não encontrado`,
          );
        }
      }

      // Verifica se o barbeiro existe
      const barbeiro = await this.prisma.barbeiro.findUnique({
        where: { id: barbeiroId },
      });
      if (!barbeiro) {
        throw new NotFoundException(
          `Barbeiro com ID ${barbeiroId} não encontrado`,
        );
      }

      // Verifica se o serviço existe (se ID fornecido)
      if (servicoId) {
        const servico = await this.prisma.servico.findUnique({
          where: { id: servicoId },
        });
        if (!servico) {
          throw new NotFoundException(
            `Serviço com ID ${servicoId} não encontrado`,
          );
        }
      }

      // Converte data para formato Date
      const dataAgendamento = new Date(data);

      // Verifica se o horário está disponível para este barbeiro
      const agendamentoExistente = await this.prisma.agendamento.findFirst({
        where: {
          barbeiroId,
          data: dataAgendamento,
          hora,
        },
      });

      if (agendamentoExistente) {
        throw new ConflictException(
          'Horário já está ocupado para este barbeiro',
        );
      }

      // Cria o agendamento
      const agendamentoData: any = {
        clienteNome,
        barbeiroId,
        data: dataAgendamento,
        hora,
        dataAgendamento, // Mantém compatibilidade
      };

      if (clienteId) {
        agendamentoData.clienteId = clienteId;
      }

      if (servicoId) {
        agendamentoData.servicoId = servicoId;
      }

      return await this.prisma.agendamento.create({
        data: agendamentoData,
        include: {
          cliente: true,
          barbeiro: true,
          servico: true,
        },
      });
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      ) {
        throw error;
      }
      throw new BadRequestException('Erro ao criar agendamento');
    }
  }

  /**
   * Lista todos os agendamentos (para admin)
   * @returns Array com todos os agendamentos
   */
  async findAll() {
    try {
      return await this.prisma.agendamento.findMany({
        include: {
          cliente: true,
          barbeiro: true,
          servico: true,
        },
        orderBy: {
          dataAgendamento: 'desc',
        },
      });
    } catch (error) {
      throw new BadRequestException('Erro ao listar agendamentos');
    }
  }

  /**
   * Lista agendamentos por cliente
   * @param clienteId - ID do cliente
   * @returns Array com agendamentos do cliente
   */
  async findByCliente(clienteId: string) {
    try {
      return await this.prisma.agendamento.findMany({
        where: { clienteId },
        include: {
          cliente: true,
          barbeiro: true,
          servico: true,
        },
        orderBy: {
          dataAgendamento: 'desc',
        },
      });
    } catch (error) {
      throw new BadRequestException('Erro ao listar agendamentos do cliente');
    }
  }

  /**
   * Lista agendamentos por barbeiro
   * @param barbeiroId - ID do barbeiro
   * @returns Array com agendamentos do barbeiro
   */
  async findByBarbeiro(barbeiroId: string) {
    try {
      return await this.prisma.agendamento.findMany({
        where: { barbeiroId },
        include: {
          cliente: true,
          barbeiro: true,
          servico: true,
        },
        orderBy: {
          dataAgendamento: 'desc',
        },
      });
    } catch (error) {
      throw new BadRequestException('Erro ao listar agendamentos do barbeiro');
    }
  }

  /**
   * Busca um agendamento específico pelo ID
   * @param id - ID do agendamento
   * @returns O agendamento encontrado
   * @throws NotFoundException se o agendamento não for encontrado
   */
  async findOne(id: string) {
    try {
      const agendamento = await this.prisma.agendamento.findUnique({
        where: { id },
        include: {
          cliente: true,
          barbeiro: true,
          servico: true,
        },
      });

      if (!agendamento) {
        throw new NotFoundException(`Agendamento com ID ${id} não encontrado`);
      }

      return agendamento;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Erro ao buscar agendamento');
    }
  }

  /**
   * Atualiza os dados de um agendamento existente
   * @param id - ID do agendamento
   * @param updateAgendamentoDto - Dados para atualizar
   * @returns O agendamento atualizado
   * @throws NotFoundException se o agendamento não for encontrado
   */
  async update(id: string, updateAgendamentoDto: UpdateAgendamentoDto) {
    try {
      // Verifica se o agendamento existe
      await this.findOne(id);

      // Validações similares ao create se necessário
      const updateData: any = {};

      if (updateAgendamentoDto.clienteId) {
        const cliente = await this.prisma.cliente.findUnique({
          where: { id: updateAgendamentoDto.clienteId },
        });
        if (!cliente) {
          throw new NotFoundException(
            `Cliente com ID ${updateAgendamentoDto.clienteId} não encontrado`,
          );
        }
        updateData.clienteId = updateAgendamentoDto.clienteId;
      }

      if (updateAgendamentoDto.barbeiroId) {
        const barbeiro = await this.prisma.barbeiro.findUnique({
          where: { id: updateAgendamentoDto.barbeiroId },
        });
        if (!barbeiro) {
          throw new NotFoundException(
            `Barbeiro com ID ${updateAgendamentoDto.barbeiroId} não encontrado`,
          );
        }
        updateData.barbeiroId = updateAgendamentoDto.barbeiroId;
      }

      if (updateAgendamentoDto.servicoId) {
        const servico = await this.prisma.servico.findUnique({
          where: { id: updateAgendamentoDto.servicoId },
        });
        if (!servico) {
          throw new NotFoundException(
            `Serviço com ID ${updateAgendamentoDto.servicoId} não encontrado`,
          );
        }
        updateData.servicoId = updateAgendamentoDto.servicoId;
      }

      if (updateAgendamentoDto.dataAgendamento) {
        updateData.dataAgendamento = new Date(
          updateAgendamentoDto.dataAgendamento,
        );
      }

      return await this.prisma.agendamento.update({
        where: { id },
        data: updateData,
        include: {
          cliente: true,
          barbeiro: true,
          servico: true,
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Erro ao atualizar agendamento');
    }
  }

  /**
   * Remove um agendamento do banco de dados
   * @param id - ID do agendamento
   * @returns Confirmação da remoção
   * @throws NotFoundException se o agendamento não for encontrado
   */
  async remove(id: string) {
    try {
      // Verifica se o agendamento existe
      await this.findOne(id);

      await this.prisma.agendamento.delete({
        where: { id },
      });

      return { message: 'Agendamento removido com sucesso' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Erro ao remover agendamento');
    }
  }
}

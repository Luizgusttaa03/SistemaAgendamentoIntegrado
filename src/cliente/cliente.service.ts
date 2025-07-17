import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

/**
 * Service responsável pela lógica de negócio dos clientes
 * Gerencia todas as operações CRUD relacionadas aos clientes
 */
@Injectable()
export class ClienteService {
  constructor(private prisma: PrismaService) {}

  /**
   * Cria um novo cliente no banco de dados
   * @param createClienteDto - Dados para criar o cliente
   * @returns O cliente criado
   */
  async create(createClienteDto: CreateClienteDto) {
    try {
      // Verifica se o telefone já existe
      const clienteExistente = await this.prisma.cliente.findUnique({
        where: { telefone: createClienteDto.telefone },
      });

      if (clienteExistente) {
        throw new ConflictException('Telefone já está em uso');
      }

      return await this.prisma.cliente.create({
        data: createClienteDto,
      });
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException('Erro ao criar cliente');
    }
  }

  /**
   * Lista todos os clientes cadastrados
   * @returns Array com todos os clientes
   */
  async findAll() {
    try {
      return await this.prisma.cliente.findMany({
        orderBy: {
          criadoEm: 'desc',
        },
      });
    } catch (error) {
      throw new BadRequestException('Erro ao listar clientes');
    }
  }

  /**
   * Busca um cliente específico pelo ID
   * @param id - ID do cliente
   * @returns O cliente encontrado
   * @throws NotFoundException se o cliente não for encontrado
   */
  async findOne(id: string) {
    try {
      const cliente = await this.prisma.cliente.findUnique({
        where: { id },
        include: {
          agendamentos: {
            include: {
              barbeiro: true,
              servico: true,
            },
          },
        },
      });

      if (!cliente) {
        throw new NotFoundException(`Cliente com ID ${id} não encontrado`);
      }

      return cliente;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Erro ao buscar cliente');
    }
  }

  /**
   * Atualiza os dados de um cliente existente
   * @param id - ID do cliente
   * @param updateClienteDto - Dados para atualizar
   * @returns O cliente atualizado
   * @throws NotFoundException se o cliente não for encontrado
   */
  async update(id: string, updateClienteDto: UpdateClienteDto) {
    try {
      // Verifica se o cliente existe
      await this.findOne(id);

      // Se está atualizando o telefone, verifica se não está em uso
      if (updateClienteDto.telefone) {
        const clienteExistente = await this.prisma.cliente.findUnique({
          where: { telefone: updateClienteDto.telefone },
        });

        if (clienteExistente && clienteExistente.id !== id) {
          throw new ConflictException('Telefone já está em uso');
        }
      }

      return await this.prisma.cliente.update({
        where: { id },
        data: updateClienteDto,
      });
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException('Erro ao atualizar cliente');
    }
  }

  /**
   * Remove um cliente do banco de dados
   * @param id - ID do cliente
   * @returns Confirmação da remoção
   * @throws NotFoundException se o cliente não for encontrado
   */
  async remove(id: string) {
    try {
      // Verifica se o cliente existe
      await this.findOne(id);

      await this.prisma.cliente.delete({
        where: { id },
      });

      return { message: 'Cliente removido com sucesso' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Erro ao remover cliente');
    }
  }
}

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';

/**
 * Service responsável pela lógica de negócio dos serviços
 * Gerencia todas as operações CRUD relacionadas aos serviços
 */
@Injectable()
export class ServicoService {
  constructor(private prisma: PrismaService) {}

  /**
   * Cria um novo serviço no banco de dados
   * @param createServicoDto - Dados para criar o serviço
   * @returns O serviço criado
   */
  async create(createServicoDto: CreateServicoDto) {
    try {
      return await this.prisma.servico.create({
        data: createServicoDto,
      });
    } catch (error) {
      throw new BadRequestException('Erro ao criar serviço');
    }
  }

  /**
   * Lista todos os serviços cadastrados
   * @returns Array com todos os serviços
   */
  async findAll() {
    try {
      return await this.prisma.servico.findMany({
        orderBy: {
          nome: 'asc',
        },
      });
    } catch (error) {
      throw new BadRequestException('Erro ao listar serviços');
    }
  }

  /**
   * Busca um serviço específico pelo ID
   * @param id - ID do serviço
   * @returns O serviço encontrado
   * @throws NotFoundException se o serviço não for encontrado
   */
  async findOne(id: string) {
    try {
      const servico = await this.prisma.servico.findUnique({
        where: { id },
        include: {
          agendamentos: {
            include: {
              cliente: true,
              barbeiro: true,
            },
          },
        },
      });

      if (!servico) {
        throw new NotFoundException(`Serviço com ID ${id} não encontrado`);
      }

      return servico;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Erro ao buscar serviço');
    }
  }

  /**
   * Atualiza os dados de um serviço existente
   * @param id - ID do serviço
   * @param updateServicoDto - Dados para atualizar
   * @returns O serviço atualizado
   * @throws NotFoundException se o serviço não for encontrado
   */
  async update(id: string, updateServicoDto: UpdateServicoDto) {
    try {
      // Verifica se o serviço existe
      await this.findOne(id);

      return await this.prisma.servico.update({
        where: { id },
        data: updateServicoDto,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Erro ao atualizar serviço');
    }
  }

  /**
   * Remove um serviço do banco de dados
   * @param id - ID do serviço
   * @returns Confirmação da remoção
   * @throws NotFoundException se o serviço não for encontrado
   */
  async remove(id: string) {
    try {
      // Verifica se o serviço existe
      await this.findOne(id);

      await this.prisma.servico.delete({
        where: { id },
      });

      return { message: 'Serviço removido com sucesso' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Erro ao remover serviço');
    }
  }
}

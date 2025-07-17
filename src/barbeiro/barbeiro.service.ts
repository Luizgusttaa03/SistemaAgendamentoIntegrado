import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBarbeiroDto } from './dto/create-barbeiro.dto';
import { UpdateBarbeiroDto } from './dto/update-barbeiro.dto';

/**
 * Service responsável pela lógica de negócio dos barbeiros
 * Gerencia todas as operações CRUD relacionadas aos barbeiros
 */
@Injectable()
export class BarbeiroService {
  constructor(private prisma: PrismaService) {}

  /**
   * Cria um novo barbeiro no banco de dados
   * @param createBarbeiroDto - Dados para criar o barbeiro
   * @returns O barbeiro criado
   */
  async create(createBarbeiroDto: CreateBarbeiroDto) {
    try {
      return await this.prisma.barbeiro.create({
        data: {
          nome: createBarbeiroDto.nome,
        },
      });
    } catch (error) {
      throw new BadRequestException('Erro ao criar barbeiro');
    }
  }

  /**
   * Lista todos os barbeiros cadastrados
   * @returns Array com todos os barbeiros
   */
  async findAll() {
    try {
      return await this.prisma.barbeiro.findMany({
        orderBy: {
          criadoEm: 'desc',
        },
      });
    } catch (error) {
      throw new BadRequestException('Erro ao listar barbeiros');
    }
  }

  /**
   * Busca um barbeiro específico pelo ID
   * @param id - ID do barbeiro
   * @returns O barbeiro encontrado
   * @throws NotFoundException se o barbeiro não for encontrado
   */
  async findOne(id: string) {
    try {
      const barbeiro = await this.prisma.barbeiro.findUnique({
        where: { id },
      });

      if (!barbeiro) {
        throw new NotFoundException(`Barbeiro com ID ${id} não encontrado`);
      }

      return barbeiro;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Erro ao buscar barbeiro');
    }
  }

  /**
   * Atualiza os dados de um barbeiro existente
   * @param id - ID do barbeiro
   * @param updateBarbeiroDto - Dados para atualizar
   * @returns O barbeiro atualizado
   * @throws NotFoundException se o barbeiro não for encontrado
   */
  async update(id: string, updateBarbeiroDto: UpdateBarbeiroDto) {
    try {
      // Verifica se o barbeiro existe
      await this.findOne(id);

      return await this.prisma.barbeiro.update({
        where: { id },
        data: updateBarbeiroDto,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Erro ao atualizar barbeiro');
    }
  }

  /**
   * Remove um barbeiro do banco de dados
   * @param id - ID do barbeiro
   * @returns Confirmação da remoção
   * @throws NotFoundException se o barbeiro não for encontrado
   */
  async remove(id: string) {
    try {
      // Verifica se o barbeiro existe
      await this.findOne(id);

      await this.prisma.barbeiro.delete({
        where: { id },
      });

      return { message: 'Barbeiro removido com sucesso' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Erro ao remover barbeiro');
    }
  }
}

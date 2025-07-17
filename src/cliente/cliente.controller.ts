import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  ValidationPipe,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

/**
 * Controller responsável pelas rotas relacionadas aos clientes
 * Gerencia todas as operações REST para a entidade Cliente
 */
@Controller('clientes')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  /**
   * Cria um novo cliente
   * POST /clientes (Rota pública)
   * @param createClienteDto - Dados do cliente a ser criado
   * @returns O cliente criado com status 201
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createClienteDto: CreateClienteDto) {
    return await this.clienteService.create(createClienteDto);
  }

  /**
   * Lista todos os clientes
   * GET /clientes (Rota protegida - apenas admin)
   * @returns Array com todos os clientes cadastrados
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.clienteService.findAll();
  }

  /**
   * Busca um cliente específico pelo ID
   * GET /clientes/:id (Rota protegida - apenas admin)
   * @param id - ID do cliente
   * @returns O cliente encontrado com seus agendamentos
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    return await this.clienteService.findOne(id);
  }

  /**
   * Atualiza os dados de um cliente
   * PUT /clientes/:id (Rota protegida - apenas admin)
   * @param id - ID do cliente
   * @param updateClienteDto - Dados a serem atualizados
   * @returns O cliente atualizado
   */
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateClienteDto: UpdateClienteDto,
  ) {
    return await this.clienteService.update(id, updateClienteDto);
  }

  /**
   * Remove um cliente
   * DELETE /clientes/:id (Rota protegida - apenas admin)
   * @param id - ID do cliente
   * @returns Confirmação da remoção
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    return await this.clienteService.remove(id);
  }
}

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
  Query,
} from '@nestjs/common';
import { AgendamentoService } from './agendamento.service';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { UpdateAgendamentoDto } from './dto/update-agendamento.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

/**
 * Controller responsável pelas rotas relacionadas aos agendamentos
 * Gerencia todas as operações REST para a entidade Agendamento
 */
@Controller('agendamentos')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class AgendamentoController {
  constructor(private readonly agendamentoService: AgendamentoService) {}

  /**
   * Cria um novo agendamento
   * POST /agendamentos (Rota pública)
   * @param createAgendamentoDto - Dados do agendamento a ser criado
   * @returns O agendamento criado com status 201
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAgendamentoDto: CreateAgendamentoDto) {
    return await this.agendamentoService.create(createAgendamentoDto);
  }

  /**
   * Lista todos os agendamentos (para admin)
   * GET /agendamentos/admin (Rota protegida - apenas admin)
   * @returns Array com todos os agendamentos
   */
  @Get('admin')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.agendamentoService.findAll();
  }

  /**
   * Lista agendamentos por cliente
   * GET /agendamentos/cliente/:clienteId (Rota pública)
   * @param clienteId - ID do cliente
   * @returns Array com agendamentos do cliente
   */
  @Get('cliente/:clienteId')
  @HttpCode(HttpStatus.OK)
  async findByCliente(@Param('clienteId') clienteId: string) {
    return await this.agendamentoService.findByCliente(clienteId);
  }

  /**
   * Lista agendamentos por barbeiro
   * GET /agendamentos/barbeiro/:barbeiroId (Rota protegida - apenas admin)
   * @param barbeiroId - ID do barbeiro
   * @returns Array com agendamentos do barbeiro
   */
  @Get('barbeiro/:barbeiroId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async findByBarbeiro(@Param('barbeiroId') barbeiroId: string) {
    return await this.agendamentoService.findByBarbeiro(barbeiroId);
  }

  /**
   * Busca um agendamento específico pelo ID
   * GET /agendamentos/:id (Rota protegida - apenas admin)
   * @param id - ID do agendamento
   * @returns O agendamento encontrado
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    return await this.agendamentoService.findOne(id);
  }

  /**
   * Atualiza os dados de um agendamento
   * PUT /agendamentos/:id (Rota protegida - apenas admin)
   * @param id - ID do agendamento
   * @param updateAgendamentoDto - Dados a serem atualizados
   * @returns O agendamento atualizado
   */
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateAgendamentoDto: UpdateAgendamentoDto,
  ) {
    return await this.agendamentoService.update(id, updateAgendamentoDto);
  }

  /**
   * Remove um agendamento
   * DELETE /agendamentos/:id (Rota protegida - apenas admin)
   * @param id - ID do agendamento
   * @returns Confirmação da remoção
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    return await this.agendamentoService.remove(id);
  }
}

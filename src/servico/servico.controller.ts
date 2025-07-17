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
import { ServicoService } from './servico.service';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

/**
 * Controller responsável pelas rotas relacionadas aos serviços
 * Gerencia todas as operações REST para a entidade Serviço
 */
@Controller('servicos')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class ServicoController {
  constructor(private readonly servicoService: ServicoService) {}

  /**
   * Cria um novo serviço
   * POST /servicos (Rota protegida - apenas admin)
   * @param createServicoDto - Dados do serviço a ser criado
   * @returns O serviço criado com status 201
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createServicoDto: CreateServicoDto) {
    return await this.servicoService.create(createServicoDto);
  }

  /**
   * Lista todos os serviços
   * GET /servicos (Rota pública)
   * @returns Array com todos os serviços cadastrados
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.servicoService.findAll();
  }

  /**
   * Busca um serviço específico pelo ID
   * GET /servicos/:id (Rota pública)
   * @param id - ID do serviço
   * @returns O serviço encontrado
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    return await this.servicoService.findOne(id);
  }

  /**
   * Atualiza os dados de um serviço
   * PUT /servicos/:id (Rota protegida - apenas admin)
   * @param id - ID do serviço
   * @param updateServicoDto - Dados a serem atualizados
   * @returns O serviço atualizado
   */
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateServicoDto: UpdateServicoDto,
  ) {
    return await this.servicoService.update(id, updateServicoDto);
  }

  /**
   * Remove um serviço
   * DELETE /servicos/:id (Rota protegida - apenas admin)
   * @param id - ID do serviço
   * @returns Confirmação da remoção
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    return await this.servicoService.remove(id);
  }
}

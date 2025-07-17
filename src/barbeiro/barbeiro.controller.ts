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
import { BarbeiroService } from './barbeiro.service';
import { CreateBarbeiroDto } from './dto/create-barbeiro.dto';
import { UpdateBarbeiroDto } from './dto/update-barbeiro.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

/**
 * Controller responsável pelas rotas relacionadas aos barbeiros
 * Gerencia todas as operações REST para a entidade Barbeiro
 */
@Controller('barbeiros')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class BarbeiroController {
  constructor(private readonly barbeiroService: BarbeiroService) {}

  /**
   * Cria um novo barbeiro
   * POST /barbeiros (Rota protegida)
   * @param createBarbeiroDto - Dados do barbeiro a ser criado
   * @returns O barbeiro criado com status 201
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createBarbeiroDto: CreateBarbeiroDto) {
    return await this.barbeiroService.create(createBarbeiroDto);
  }

  /**
   * Lista todos os barbeiros
   * GET /barbeiros (Rota pública)
   * @returns Array com todos os barbeiros cadastrados
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.barbeiroService.findAll();
  }

  /**
   * Busca um barbeiro específico pelo ID
   * GET /barbeiros/:id (Rota protegida)
   * @param id - ID do barbeiro
   * @returns O barbeiro encontrado
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    return await this.barbeiroService.findOne(id);
  }

  /**
   * Atualiza os dados de um barbeiro
   * PUT /barbeiros/:id (Rota protegida)
   * @param id - ID do barbeiro
   * @param updateBarbeiroDto - Dados a serem atualizados
   * @returns O barbeiro atualizado
   */
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateBarbeiroDto: UpdateBarbeiroDto,
  ) {
    return await this.barbeiroService.update(id, updateBarbeiroDto);
  }

  /**
   * Remove um barbeiro
   * DELETE /barbeiros/:id (Rota protegida)
   * @param id - ID do barbeiro
   * @returns Confirmação da remoção
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    return await this.barbeiroService.remove(id);
  }
}

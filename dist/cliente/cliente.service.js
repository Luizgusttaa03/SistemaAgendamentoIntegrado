"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ClienteService = class ClienteService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createClienteDto) {
        try {
            const clienteExistente = await this.prisma.cliente.findUnique({
                where: { telefone: createClienteDto.telefone },
            });
            if (clienteExistente) {
                throw new common_1.ConflictException('Telefone já está em uso');
            }
            return await this.prisma.cliente.create({
                data: createClienteDto,
            });
        }
        catch (error) {
            if (error instanceof common_1.ConflictException) {
                throw error;
            }
            throw new common_1.BadRequestException('Erro ao criar cliente');
        }
    }
    async findAll() {
        try {
            return await this.prisma.cliente.findMany({
                orderBy: {
                    criadoEm: 'desc',
                },
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Erro ao listar clientes');
        }
    }
    async findOne(id) {
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
                throw new common_1.NotFoundException(`Cliente com ID ${id} não encontrado`);
            }
            return cliente;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Erro ao buscar cliente');
        }
    }
    async update(id, updateClienteDto) {
        try {
            await this.findOne(id);
            if (updateClienteDto.telefone) {
                const clienteExistente = await this.prisma.cliente.findUnique({
                    where: { telefone: updateClienteDto.telefone },
                });
                if (clienteExistente && clienteExistente.id !== id) {
                    throw new common_1.ConflictException('Telefone já está em uso');
                }
            }
            return await this.prisma.cliente.update({
                where: { id },
                data: updateClienteDto,
            });
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException || error instanceof common_1.ConflictException) {
                throw error;
            }
            throw new common_1.BadRequestException('Erro ao atualizar cliente');
        }
    }
    async remove(id) {
        try {
            await this.findOne(id);
            await this.prisma.cliente.delete({
                where: { id },
            });
            return { message: 'Cliente removido com sucesso' };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Erro ao remover cliente');
        }
    }
};
exports.ClienteService = ClienteService;
exports.ClienteService = ClienteService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClienteService);
//# sourceMappingURL=cliente.service.js.map
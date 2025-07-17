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
exports.AgendamentoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AgendamentoService = class AgendamentoService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createAgendamentoDto) {
        try {
            const { clienteId, barbeiroId, servicoId, dataAgendamento } = createAgendamentoDto;
            const cliente = await this.prisma.cliente.findUnique({
                where: { id: clienteId },
            });
            if (!cliente) {
                throw new common_1.NotFoundException(`Cliente com ID ${clienteId} não encontrado`);
            }
            const barbeiro = await this.prisma.barbeiro.findUnique({
                where: { id: barbeiroId },
            });
            if (!barbeiro) {
                throw new common_1.NotFoundException(`Barbeiro com ID ${barbeiroId} não encontrado`);
            }
            const servico = await this.prisma.servico.findUnique({
                where: { id: servicoId },
            });
            if (!servico) {
                throw new common_1.NotFoundException(`Serviço com ID ${servicoId} não encontrado`);
            }
            const dataAgendamentoDate = new Date(dataAgendamento);
            const agendamentoExistente = await this.prisma.agendamento.findFirst({
                where: {
                    barbeiroId,
                    dataAgendamento: dataAgendamentoDate,
                },
            });
            if (agendamentoExistente) {
                throw new common_1.ConflictException('Horário já está ocupado para este barbeiro');
            }
            return await this.prisma.agendamento.create({
                data: {
                    clienteId,
                    barbeiroId,
                    servicoId,
                    dataAgendamento: dataAgendamentoDate,
                },
                include: {
                    cliente: true,
                    barbeiro: true,
                    servico: true,
                },
            });
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException || error instanceof common_1.ConflictException) {
                throw error;
            }
            throw new common_1.BadRequestException('Erro ao criar agendamento');
        }
    }
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
        }
        catch (error) {
            throw new common_1.BadRequestException('Erro ao listar agendamentos');
        }
    }
    async findByCliente(clienteId) {
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
        }
        catch (error) {
            throw new common_1.BadRequestException('Erro ao listar agendamentos do cliente');
        }
    }
    async findByBarbeiro(barbeiroId) {
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
        }
        catch (error) {
            throw new common_1.BadRequestException('Erro ao listar agendamentos do barbeiro');
        }
    }
    async findOne(id) {
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
                throw new common_1.NotFoundException(`Agendamento com ID ${id} não encontrado`);
            }
            return agendamento;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Erro ao buscar agendamento');
        }
    }
    async update(id, updateAgendamentoDto) {
        try {
            await this.findOne(id);
            const updateData = {};
            if (updateAgendamentoDto.clienteId) {
                const cliente = await this.prisma.cliente.findUnique({
                    where: { id: updateAgendamentoDto.clienteId },
                });
                if (!cliente) {
                    throw new common_1.NotFoundException(`Cliente com ID ${updateAgendamentoDto.clienteId} não encontrado`);
                }
                updateData.clienteId = updateAgendamentoDto.clienteId;
            }
            if (updateAgendamentoDto.barbeiroId) {
                const barbeiro = await this.prisma.barbeiro.findUnique({
                    where: { id: updateAgendamentoDto.barbeiroId },
                });
                if (!barbeiro) {
                    throw new common_1.NotFoundException(`Barbeiro com ID ${updateAgendamentoDto.barbeiroId} não encontrado`);
                }
                updateData.barbeiroId = updateAgendamentoDto.barbeiroId;
            }
            if (updateAgendamentoDto.servicoId) {
                const servico = await this.prisma.servico.findUnique({
                    where: { id: updateAgendamentoDto.servicoId },
                });
                if (!servico) {
                    throw new common_1.NotFoundException(`Serviço com ID ${updateAgendamentoDto.servicoId} não encontrado`);
                }
                updateData.servicoId = updateAgendamentoDto.servicoId;
            }
            if (updateAgendamentoDto.dataAgendamento) {
                updateData.dataAgendamento = new Date(updateAgendamentoDto.dataAgendamento);
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
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Erro ao atualizar agendamento');
        }
    }
    async remove(id) {
        try {
            await this.findOne(id);
            await this.prisma.agendamento.delete({
                where: { id },
            });
            return { message: 'Agendamento removido com sucesso' };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Erro ao remover agendamento');
        }
    }
};
exports.AgendamentoService = AgendamentoService;
exports.AgendamentoService = AgendamentoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AgendamentoService);
//# sourceMappingURL=agendamento.service.js.map
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
exports.ServicoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ServicoService = class ServicoService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createServicoDto) {
        try {
            return await this.prisma.servico.create({
                data: createServicoDto,
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Erro ao criar serviço');
        }
    }
    async findAll() {
        try {
            return await this.prisma.servico.findMany({
                orderBy: {
                    nome: 'asc',
                },
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Erro ao listar serviços');
        }
    }
    async findOne(id) {
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
                throw new common_1.NotFoundException(`Serviço com ID ${id} não encontrado`);
            }
            return servico;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Erro ao buscar serviço');
        }
    }
    async update(id, updateServicoDto) {
        try {
            await this.findOne(id);
            return await this.prisma.servico.update({
                where: { id },
                data: updateServicoDto,
            });
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Erro ao atualizar serviço');
        }
    }
    async remove(id) {
        try {
            await this.findOne(id);
            await this.prisma.servico.delete({
                where: { id },
            });
            return { message: 'Serviço removido com sucesso' };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Erro ao remover serviço');
        }
    }
};
exports.ServicoService = ServicoService;
exports.ServicoService = ServicoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ServicoService);
//# sourceMappingURL=servico.service.js.map
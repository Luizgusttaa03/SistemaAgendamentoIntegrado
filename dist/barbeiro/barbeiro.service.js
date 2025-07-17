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
exports.BarbeiroService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BarbeiroService = class BarbeiroService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createBarbeiroDto) {
        try {
            return await this.prisma.barbeiro.create({
                data: {
                    nome: createBarbeiroDto.nome,
                },
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Erro ao criar barbeiro');
        }
    }
    async findAll() {
        try {
            return await this.prisma.barbeiro.findMany({
                orderBy: {
                    criadoEm: 'desc',
                },
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Erro ao listar barbeiros');
        }
    }
    async findOne(id) {
        try {
            const barbeiro = await this.prisma.barbeiro.findUnique({
                where: { id },
            });
            if (!barbeiro) {
                throw new common_1.NotFoundException(`Barbeiro com ID ${id} não encontrado`);
            }
            return barbeiro;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Erro ao buscar barbeiro');
        }
    }
    async update(id, updateBarbeiroDto) {
        try {
            await this.findOne(id);
            return await this.prisma.barbeiro.update({
                where: { id },
                data: updateBarbeiroDto,
            });
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Erro ao atualizar barbeiro');
        }
    }
    async remove(id) {
        try {
            await this.findOne(id);
            await this.prisma.barbeiro.delete({
                where: { id },
            });
            return { message: 'Barbeiro removido com sucesso' };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Erro ao remover barbeiro');
        }
    }
};
exports.BarbeiroService = BarbeiroService;
exports.BarbeiroService = BarbeiroService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BarbeiroService);
//# sourceMappingURL=barbeiro.service.js.map
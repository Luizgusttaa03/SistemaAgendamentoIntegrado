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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async login(loginDto) {
        const { email, senha } = loginDto;
        const usuario = await this.prisma.usuario.findUnique({
            where: { email },
        });
        if (!usuario) {
            throw new common_1.UnauthorizedException('Credenciais inválidas');
        }
        const senhaValida = await bcrypt.compare(senha, usuario.senhaHash);
        if (!senhaValida) {
            throw new common_1.UnauthorizedException('Credenciais inválidas');
        }
        const payload = { sub: usuario.id, email: usuario.email };
        const token = this.jwtService.sign(payload);
        return {
            access_token: token,
            user: {
                id: usuario.id,
                email: usuario.email,
                criadoEm: usuario.criadoEm,
            },
        };
    }
    async register(createUserDto) {
        const { email, senha } = createUserDto;
        const usuarioExistente = await this.prisma.usuario.findUnique({
            where: { email },
        });
        if (usuarioExistente) {
            throw new common_1.ConflictException('Email já está em uso');
        }
        const saltRounds = 10;
        const senhaHash = await bcrypt.hash(senha, saltRounds);
        const usuario = await this.prisma.usuario.create({
            data: {
                email,
                senhaHash,
            },
        });
        return {
            id: usuario.id,
            email: usuario.email,
            criadoEm: usuario.criadoEm,
        };
    }
    async validateUser(userId) {
        const usuario = await this.prisma.usuario.findUnique({
            where: { id: userId },
        });
        if (!usuario) {
            throw new common_1.UnauthorizedException('Token inválido');
        }
        return {
            id: usuario.id,
            email: usuario.email,
            criadoEm: usuario.criadoEm,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
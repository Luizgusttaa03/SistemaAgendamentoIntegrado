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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgendamentoController = void 0;
const common_1 = require("@nestjs/common");
const agendamento_service_1 = require("./agendamento.service");
const create_agendamento_dto_1 = require("./dto/create-agendamento.dto");
const update_agendamento_dto_1 = require("./dto/update-agendamento.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let AgendamentoController = class AgendamentoController {
    agendamentoService;
    constructor(agendamentoService) {
        this.agendamentoService = agendamentoService;
    }
    async create(createAgendamentoDto) {
        return await this.agendamentoService.create(createAgendamentoDto);
    }
    async findAll() {
        return await this.agendamentoService.findAll();
    }
    async findByCliente(clienteId) {
        return await this.agendamentoService.findByCliente(clienteId);
    }
    async findByBarbeiro(barbeiroId) {
        return await this.agendamentoService.findByBarbeiro(barbeiroId);
    }
    async findOne(id) {
        return await this.agendamentoService.findOne(id);
    }
    async update(id, updateAgendamentoDto) {
        return await this.agendamentoService.update(id, updateAgendamentoDto);
    }
    async remove(id) {
        return await this.agendamentoService.remove(id);
    }
};
exports.AgendamentoController = AgendamentoController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_agendamento_dto_1.CreateAgendamentoDto]),
    __metadata("design:returntype", Promise)
], AgendamentoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('admin'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AgendamentoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('cliente/:clienteId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('clienteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AgendamentoController.prototype, "findByCliente", null);
__decorate([
    (0, common_1.Get)('barbeiro/:barbeiroId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('barbeiroId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AgendamentoController.prototype, "findByBarbeiro", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AgendamentoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_agendamento_dto_1.UpdateAgendamentoDto]),
    __metadata("design:returntype", Promise)
], AgendamentoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AgendamentoController.prototype, "remove", null);
exports.AgendamentoController = AgendamentoController = __decorate([
    (0, common_1.Controller)('agendamentos'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    __metadata("design:paramtypes", [agendamento_service_1.AgendamentoService])
], AgendamentoController);
//# sourceMappingURL=agendamento.controller.js.map
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
exports.BarbeiroController = void 0;
const common_1 = require("@nestjs/common");
const barbeiro_service_1 = require("./barbeiro.service");
const create_barbeiro_dto_1 = require("./dto/create-barbeiro.dto");
const update_barbeiro_dto_1 = require("./dto/update-barbeiro.dto");
let BarbeiroController = class BarbeiroController {
    barbeiroService;
    constructor(barbeiroService) {
        this.barbeiroService = barbeiroService;
    }
    async create(createBarbeiroDto) {
        return await this.barbeiroService.create(createBarbeiroDto);
    }
    async findAll() {
        return await this.barbeiroService.findAll();
    }
    async findOne(id) {
        return await this.barbeiroService.findOne(id);
    }
    async update(id, updateBarbeiroDto) {
        return await this.barbeiroService.update(id, updateBarbeiroDto);
    }
    async remove(id) {
        return await this.barbeiroService.remove(id);
    }
};
exports.BarbeiroController = BarbeiroController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_barbeiro_dto_1.CreateBarbeiroDto]),
    __metadata("design:returntype", Promise)
], BarbeiroController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BarbeiroController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BarbeiroController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_barbeiro_dto_1.UpdateBarbeiroDto]),
    __metadata("design:returntype", Promise)
], BarbeiroController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BarbeiroController.prototype, "remove", null);
exports.BarbeiroController = BarbeiroController = __decorate([
    (0, common_1.Controller)('barbeiros'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    __metadata("design:paramtypes", [barbeiro_service_1.BarbeiroService])
], BarbeiroController);
//# sourceMappingURL=barbeiro.controller.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarbeiroModule = void 0;
const common_1 = require("@nestjs/common");
const barbeiro_service_1 = require("./barbeiro.service");
const barbeiro_controller_1 = require("./barbeiro.controller");
let BarbeiroModule = class BarbeiroModule {
};
exports.BarbeiroModule = BarbeiroModule;
exports.BarbeiroModule = BarbeiroModule = __decorate([
    (0, common_1.Module)({
        controllers: [barbeiro_controller_1.BarbeiroController],
        providers: [barbeiro_service_1.BarbeiroService],
        exports: [barbeiro_service_1.BarbeiroService],
    })
], BarbeiroModule);
//# sourceMappingURL=barbeiro.module.js.map
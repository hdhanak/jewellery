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
exports.Metal = void 0;
const typeorm_1 = require("typeorm");
let Metal = class Metal extends typeorm_1.BaseEntity {
};
exports.Metal = Metal;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Metal.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 200, unique: true }),
    __metadata("design:type", String)
], Metal.prototype, "metal_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: true }),
    __metadata("design:type", Boolean)
], Metal.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_date", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Metal.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_date", nullable: true, onUpdate: "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Object)
], Metal.prototype, "updatedDate", void 0);
exports.Metal = Metal = __decorate([
    (0, typeorm_1.Entity)({ name: 'metal' })
], Metal);

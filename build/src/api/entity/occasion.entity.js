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
exports.Occasion = void 0;
const typeorm_1 = require("typeorm");
let Occasion = class Occasion extends typeorm_1.BaseEntity {
};
exports.Occasion = Occasion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Occasion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, unique: true }),
    __metadata("design:type", String)
], Occasion.prototype, "occasion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: true }),
    __metadata("design:type", Boolean)
], Occasion.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_date" }),
    __metadata("design:type", Date)
], Occasion.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_date", default: null }),
    __metadata("design:type", Date)
], Occasion.prototype, "updatedDate", void 0);
exports.Occasion = Occasion = __decorate([
    (0, typeorm_1.Entity)({ 'name': 'occasion' })
], Occasion);

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
exports.MetalDailyPrice = void 0;
const typeorm_1 = require("typeorm");
const metal_entity_1 = require("./metal.entity"); // assuming Metal is in the same folder
let MetalDailyPrice = class MetalDailyPrice {
};
exports.MetalDailyPrice = MetalDailyPrice;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MetalDailyPrice.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], MetalDailyPrice.prototype, "metal_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", default: () => "CURRENT_DATE" }),
    __metadata("design:type", String)
], MetalDailyPrice.prototype, "metal_price_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", precision: 15, scale: 4 }),
    __metadata("design:type", Number)
], MetalDailyPrice.prototype, "metal_price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", precision: 10, scale: 2, default: 1 }),
    __metadata("design:type", Number)
], MetalDailyPrice.prototype, "metal_gram", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_date", type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], MetalDailyPrice.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_date", type: "timestamp", nullable: true, onUpdate: "now()" }),
    __metadata("design:type", Date)
], MetalDailyPrice.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => metal_entity_1.Metal, (metal) => metal.id),
    (0, typeorm_1.JoinColumn)({ name: "metal_id" }),
    __metadata("design:type", metal_entity_1.Metal)
], MetalDailyPrice.prototype, "metal", void 0);
exports.MetalDailyPrice = MetalDailyPrice = __decorate([
    (0, typeorm_1.Entity)({ name: "metal_daily_price" })
], MetalDailyPrice);

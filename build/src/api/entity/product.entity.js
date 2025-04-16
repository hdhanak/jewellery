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
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const product_category_entity_1 = require("./product_category.entity");
const product_images_entity_1 = require("./product_images.entity");
const occasion_entity_1 = require("./occasion.entity");
const metal_entity_1 = require("./metal.entity");
const user_entity_1 = require("./user.entity");
let Product = class Product extends typeorm_1.BaseEntity {
};
exports.Product = Product;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', }),
    __metadata("design:type", String)
], Product.prototype, "product_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', }),
    __metadata("design:type", String)
], Product.prototype, "product_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Product.prototype, "product_title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Product.prototype, "product_detail", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: null }),
    __metadata("design:type", String)
], Product.prototype, "product_sub_detail", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.Users),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", user_entity_1.Users)
], Product.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_images_entity_1.ProductImage, (product_images) => product_images.product),
    __metadata("design:type", Array)
], Product.prototype, "product_images", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_category_entity_1.ProductCategory, { eager: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'product_category_id' }),
    __metadata("design:type", product_category_entity_1.ProductCategory)
], Product.prototype, "product_category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', default: null }),
    __metadata("design:type", Number)
], Product.prototype, "product_type", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => occasion_entity_1.Occasion),
    (0, typeorm_1.JoinTable)({
        name: 'product_occasion',
        joinColumn: {
            name: 'product_id', // Name of the column in the join table that references the Product table
            referencedColumnName: 'id', // Column in the Product table that is referenced
        },
        inverseJoinColumn: {
            name: 'occasion_id', // Name of the column in the join table that references the ProductCategory table
            referencedColumnName: 'id', // Column in the ProductCategory table that is referenced
        },
    }),
    __metadata("design:type", Array)
], Product.prototype, "occasion", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => metal_entity_1.Metal, (metal) => metal.id),
    (0, typeorm_1.JoinColumn)({ name: "metal_id" }),
    __metadata("design:type", metal_entity_1.Metal)
], Product.prototype, "metal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: null }),
    __metadata("design:type", Number)
], Product.prototype, "gold_purity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 10, scale: 2, default: null }),
    __metadata("design:type", String)
], Product.prototype, "gross_weight", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 1 }),
    __metadata("design:type", Number)
], Product.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 10, scale: 2, default: null }),
    __metadata("design:type", String)
], Product.prototype, "height", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 10, scale: 2, default: null }),
    __metadata("design:type", String)
], Product.prototype, "width", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 10, scale: 2, default: null }),
    __metadata("design:type", String)
], Product.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 10, scale: 2, default: null }),
    __metadata("design:type", String)
], Product.prototype, "diamond_clarity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: null }),
    __metadata("design:type", String)
], Product.prototype, "diamond_color", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 10, scale: 2, default: null }),
    __metadata("design:type", String)
], Product.prototype, "diamond_weight", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', default: null }),
    __metadata("design:type", Number)
], Product.prototype, "no_of_diamonds", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 10, scale: 2, default: null }),
    __metadata("design:type", String)
], Product.prototype, "extra_add_price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 10, scale: 2, default: null }),
    __metadata("design:type", String)
], Product.prototype, "diamond_price_per_item", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], Product.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_date", type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Product.prototype, "created_date", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_date" }),
    __metadata("design:type", Date)
], Product.prototype, "updated_date", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)({ 'name': 'product' })
], Product);

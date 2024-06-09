import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, JoinColumn, ManyToMany, ManyToOne, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { ProductCategory } from "./product_category.entity";
@Entity({ 'name': 'product' })
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    'id': number;

    @Column({ type: 'varchar', })
    'product_code': string;

    @Column({ type: 'varchar', })
    'product_name': string;

    @Column({ type: 'varchar' })
    'product_title': string;

    @Column({ type: 'varchar' })
    'product_detail': string;

    @Column({ type: 'varchar', default: null })
    'product_sub_detail': string;

    @Column({ type: 'varchar' })
    'product_image': string;

    @ManyToOne(() => ProductCategory, { eager: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product_category_id' })
    "product_category": ProductCategory;

    @Column({ type: 'bigint', default: null })
    'product_type': number; // Ring

    @Column({ type: 'varchar', default: null })
    'occasion': string;

    @Column({ type: 'integer', default: null })
    'gold_purity': number; //Karatage

    @Column({ type: 'numeric', precision: 10, scale: 2, default: null })
    "gross_weight": string;

    @Column({ type: 'integer', default: 1 })
    'gender': number; //0-male 1-female 2-other

    @Column({ type: 'numeric', precision: 10, scale: 2, default: null })
    'height': string;

    @Column({ type: 'numeric', precision: 10, scale: 2, default: null })
    'width': string;

    @Column({ type: 'numeric', precision: 10, scale: 2, default: null })
    'size': string;

    @Column({ type: 'numeric', precision: 10, scale: 2, default: null })
    'diamond_clarity': string;

    @Column({ type: 'varchar', default: null })
    'diamond_color': string;

    @Column({ type: 'numeric', precision: 10, scale: 2, default: null })
    'diamond_weight': string;

    @Column({ type: 'bigint', default: null })
    'no_of_diamonds': number;

    @Column({ type: "boolean", default: false })
    'status': boolean; //* -0 not-availble -availble

    @CreateDateColumn({ name: "created_date", type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    "created_date": Date;

    @UpdateDateColumn({ name: "updated_date" })
    "updated_date": Date;

}

// Specifications
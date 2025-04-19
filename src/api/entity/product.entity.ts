import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, JoinColumn, ManyToMany, ManyToOne, UpdateDateColumn, CreateDateColumn, JoinTable, OneToOne } from "typeorm";
import { ProductCategory } from "./product_category.entity";
import { ProductImage } from "./product_images.entity";
import { Occasion } from "./occasion.entity";
import { Metal } from "./metal.entity";
import { Users } from "./user.entity";
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

    @OneToOne(() => Users)
    @JoinColumn({ name: "user_id" })
    "users": Users

    @OneToMany(() => ProductImage, (product_images) => product_images.product)
    "product_images": ProductImage[]

    @ManyToOne(() => ProductCategory, { eager: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product_category_id' })
    "product_category": ProductCategory; //Ring,BANGLES,BRACELETS,EARRINGS,GOLD CHAINS,PENDANTS

    @Column({ type: 'bigint', default: null })
    'product_type': number;

    @ManyToMany(() => Occasion)
    @JoinTable({
        name: 'product_occasion',
        joinColumn: {
            name: 'product_id', // Name of the column in the join table that references the Product table
            referencedColumnName: 'id', // Column in the Product table that is referenced
        },
        inverseJoinColumn: {
            name: 'occasion_id', // Name of the column in the join table that references the ProductCategory table
            referencedColumnName: 'id', // Column in the ProductCategory table that is referenced
        },
    })
    "occasion": Occasion[]; // Office Wear, Traditional And Ethnic Wear


    // @Column({ type: 'integer', default: 2 })
    // 'metal': number; //2-Rose //1-white //0-yello

    @OneToOne(() => Metal, (metal) => metal.id)
    @JoinColumn({ name: "metal_id" })
    "metal": Metal;

    @Column({ type: 'integer', default: null })
    'gold_purity': number; //Karatage

    @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
    "gross_weight": string;

    @Column({ type: 'integer', default: 1 })
    'gender': number; //0-male 1-female 2-other

    @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
    'height': string;

    @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
    'width': string;

    @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
    'size': string;

    @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
    'diamond_clarity': string;

    @Column({ type: 'varchar', default: null })
    'diamond_color': string;

    @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
    'diamond_weight': string;

    @Column({ type: 'bigint', default: null })
    'no_of_diamonds': number;

    @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
    'extra_add_price': string;

    @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
    'diamond_price_per_item': string;

    @Column({ type: "boolean", default: false })
    'status': boolean; //* -0 not-availble -availble

    @CreateDateColumn({ name: "created_date", type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    "created_date": Date;

    @UpdateDateColumn({ name: "updated_date" })
    "updated_date": Date;

}


import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, JoinColumn, ManyToMany, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { Product } from "./product.entity";
@Entity({ 'name': 'product_image' })
export class ProductImage extends BaseEntity {
    @PrimaryGeneratedColumn()
    'id': number;

    @Column()
    'image': string;

    @ManyToOne(() => Product, (product) => product.product_images,{onUpdate:"CASCADE", onDelete:"CASCADE"})
    @JoinColumn({ name: 'product_id' })
    "product": Product

    @Column({ type: "boolean", default: false })
    'status': boolean;

    @CreateDateColumn({ name: "created_date" })
    "createdDate": Date;

    @UpdateDateColumn({ name: "updated_date", default: null })
    "updatedDate": Date;

}

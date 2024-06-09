import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, JoinColumn, ManyToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
@Entity({ 'name': 'product_category' })
export class ProductCategory extends BaseEntity {
    @PrimaryGeneratedColumn()
    'id': number;

    @Column()
    'product_category_code': string;

    @Column()
    'product_category_name': string;

    @Column({ type: "boolean", default: false })
    'status': boolean;

    @CreateDateColumn({ name: "created_date" })
    "createdDate": Date;

    @UpdateDateColumn({ name: "updated_date" })
    "updatedDate": Date;

}

import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, JoinColumn, ManyToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
@Entity({ 'name': 'occasion' })
export class Occasion extends BaseEntity {
    @PrimaryGeneratedColumn()
    'id': number;

    @Column()
    'occasion': string;

    @Column({ type: "boolean", default: false })
    'status': boolean;

    @CreateDateColumn({ name: "created_date" })
    "createdDate": Date;

    @UpdateDateColumn({ name: "updated_date", default: null })
    "updatedDate": Date;

}

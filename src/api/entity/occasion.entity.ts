import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, JoinColumn, ManyToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
@Entity({ 'name': 'occasion' })
export class Occasion extends BaseEntity {
    @PrimaryGeneratedColumn()
    'id': number;

    @Column({ type: "varchar", length: 100, unique: true })
    'occasion': string;

    @Column({ type: "boolean", default: true })
    'status': boolean;

    @CreateDateColumn({ name: "created_date" })
    "createdDate": Date;

    @UpdateDateColumn({ name: "updated_date", default: null })
    "updatedDate": Date;

}

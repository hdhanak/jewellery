import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'metal' })
export class Metal extends BaseEntity {

    @PrimaryGeneratedColumn()
    "id": number;

    @Column({ type: "varchar", length: 200, unique: true })
    "metal_name": string;

    @Column({ type: "boolean", default: true })
    "status": boolean;

    @CreateDateColumn({ name: "created_date", default: () => "CURRENT_TIMESTAMP" })
    "createdDate": Date;

    @UpdateDateColumn({ name: "updated_date", nullable: true, onUpdate: "CURRENT_TIMESTAMP" })
    "updatedDate": Date | null;

}

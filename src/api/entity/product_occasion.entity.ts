import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from "typeorm";

@Entity({ name: 'product_occasion' })
export class ProductOccasion {
    @PrimaryColumn()
    "occasion_id": number;

    @PrimaryColumn()
    "product_id": number;

    // @Column({ type: "boolean", default: false })
    // "status": boolean;

    // @CreateDateColumn({ name: "created_date" })
    // "createdDate": Date;

    // @UpdateDateColumn({ name: "updated_date", default: null })
    // "updatedDate": Date;
}

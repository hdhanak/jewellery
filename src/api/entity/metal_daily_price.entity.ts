import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Metal } from "./metal.entity"; // assuming Metal is in the same folder

@Entity({ name: "metal_daily_price" })
export class MetalDailyPrice {
    @PrimaryGeneratedColumn()
    "id": number;

    @Column()
    "metal_id": number;

    @Column({ type: "date", default: () => "CURRENT_DATE" })
    "metal_price_date": string;

    @Column({ type: "numeric", precision: 15, scale: 4 })
    "metal_price": number;

    @Column({ type: "numeric", precision: 10, scale: 2, default: 1 })
    "metal_gram": number;

    @CreateDateColumn({ name: "created_date", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    "createdDate": Date;

    @UpdateDateColumn({ name: "updated_date", type: "timestamp", nullable: true, onUpdate: "now()" })
    "updatedDate": Date;

    // Foreign key relation with Metal entity
    @ManyToOne(() => Metal, (metal) => metal.id)
    @JoinColumn({ name: "metal_id" })
    "metal": Metal;

    // You can add validation, hooks, etc., if needed here
}

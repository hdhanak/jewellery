import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    BeforeInsert,
    BeforeUpdate,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Unique
} from "typeorm";
import bcrypt = require("bcrypt")
import { Role } from "./role.entity";
@Entity({ name: "users" })
@Unique(['email'])
@Unique(['phone'])

export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    'id': number;

    @Column({ type: "varchar", length: 255, nullable: true })
    "first_name": string;

    @Column({ type: "varchar", length: 255, nullable: true })
    "last_name": string;

    @Column({ type: "varchar", length: 255, unique: true })
    "email": string;

    @Column({ type: "varchar", length: 255 })
    "phone": string;

    @Column({ default: null })
    'auth_token': string

    @Column({ default: false })
    'status': boolean // 0 - inactivate 1-active

    @Column()
    'password': string
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        console.log(this.password, 'this.password');
        if (this.password)
            this.password = await bcrypt.hash(this.password, 10);
    }

    @Column({ default: false })
    "is_deleted": boolean; // if deleted = true

    @CreateDateColumn({ name: "created_date" })
    "created_date": Date;

    @UpdateDateColumn({ name: "updated_date", default: null })
    "updated_date": Date;

    @DeleteDateColumn({ name: "deleted_date", default: null })
    "deleted_date": Date;

}


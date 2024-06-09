import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    BeforeInsert,
    BeforeUpdate,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    Unique
} from "typeorm";
import bcrypt = require("bcrypt")
import { Role } from "./role.entity";
@Entity({ name: "users" })
@Unique(['email'])
@Unique(['phone'])
@Unique(['user_code'])

export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    'id': number;

    @Column({ type: "varchar", default: null })
    'user_code': string

    @Column()
    'first_name': string;

    @Column({ default: null })
    'last_name': string;

    @Column()
    'email': string;

    @Column()
    'phone': string;

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

    @ManyToOne(() => Role, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'role_id' })
    'role': Role

    @Column({ default: false })
    "is_deleted": boolean; // if deleted = true

    @CreateDateColumn({ name: "created_date" })
    "created_date": Date;

    @UpdateDateColumn({ name: "updated_date", default: null })
    "updated_date": Date;

    @DeleteDateColumn({ name: "deleted_date" })
    "deleted_date": Date;

}


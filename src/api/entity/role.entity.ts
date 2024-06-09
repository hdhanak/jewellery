import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  JoinColumn,
  ManyToMany,
  JoinTable,
  UpdateDateColumn,
  CreateDateColumn
} from "typeorm";
// import { RolesPermission } from "./rolesPermission";

@Entity({ name: "roles" })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  "id": number;

  @Column()
  "name": string;

  // @Column({ type: "boolean", default: true })
  // "status": boolean;
  // @ManyToMany(() => Permission, {
  //   cascade: true,
  //   nullable: true
  // })
  // @JoinTable({name:'rolesPermission'})
  // "permission":Permission[]

  // @OneToMany(() => RolesPermission, (rolePer) => rolePer.roles)
  // @JoinColumn()
  // 'rolesPermission': RolesPermission[]

  @CreateDateColumn({ name: "created_date", })
  "created_date": Date;

  @UpdateDateColumn({ name: "updated_date", default: null })
  "updated_date": Date;

}


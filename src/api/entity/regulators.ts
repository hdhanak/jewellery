// import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, JoinColumn, ManyToMany } from "typeorm";
// import { Regulations } from "./regulations";
// import { CustomerOrganization } from "./customerOrganization";
// @Entity({'name':'regulators'})
// export class Regulators extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   'id': number;

//   @Column()
//   'regulatorShortName': string;

//   @Column()
//   'regulatorLongName': string;

//   @Column()
//   'regulatorDesc': string;

//   @Column()
//   'regulatorMainUrl': string;

//   @Column()
//   'regulatorUpdateSource': string;

//   @Column()
//   'regulatorUpdateContact': string;

//   @Column()
//   'country':string;

//   @Column()
//   'state':string;

//   @Column({default:""})
//   'county':string;

//   // @Column()
//   // 'jurisdiction': string;

//   @Column({ type: "boolean", default: false })
//   'status': boolean;

//   @Column({ name: "createdDate" })
//   "createdDate": Date;

//   @Column({ name: "updatedDate" })
//   "updatedDate": Date;

//   @OneToMany(() => Regulations, (regulation) => regulation.regulator)
//   @JoinColumn()
//   'regulations': Regulations[]

//   @ManyToMany(() => CustomerOrganization)
//   @JoinColumn()
//   'customerOrganization': CustomerOrganization[]

// }

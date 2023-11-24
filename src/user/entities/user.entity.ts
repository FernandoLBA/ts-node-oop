import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

import { CustomerEntity } from "../../customer/entities/customer.entity";
import { RoleType } from "../types/user.type";

@Entity({ name: "user" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  lastName!: string;

  @Column()
  @Unique(["email"])
  email!: string;

  // * el select hace que cuando se pida la data no traiga la password
  @Column({ select: false })
  password!: string;

  @Column()
  gender!: string;

  // * Creamos un enum de tipo RoleType no nullable
  @Column({ type: "enum", enum: RoleType, nullable: false })
  role!: RoleType;

  // * Opción con configuración y sin usar @Column
  /* @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" }) */
  // * Opción sin configuración y con @Column
  @Column()
  @CreateDateColumn()
  createdAt!: Date;

  // * Opción con configuración y sin usar @Column
  // @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  // * Opción sin configuración y con @Column
  @Column()
  @UpdateDateColumn()
  updatedAt!: Date;

  // * Relacion 1:1 con customer, y relaciona a customer con user
  @OneToOne(() => CustomerEntity, (customer) => customer.user)
  customer!: CustomerEntity;
}

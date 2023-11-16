import { Column, Entity, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

import { CustomerEntity } from "../../customer/entities/customer.entity";

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

  @Column()
  gender!: string;

  @Column()
  createdAt!: Date;

  @Column()
  updatedAt!: Date;

  // * Relacion 1:1 con customer, y relaciona a customer con user
  @OneToOne(() => CustomerEntity, (customer) => customer.user)
  customer!: CustomerEntity;
}

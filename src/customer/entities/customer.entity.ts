import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../user/entities/user.entity";

@Entity({ name: "customer" })
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  createdAt!: Date;

  @Column()
  updatedAt!: Date;

  // * Relacion 1:1 con user
  @OneToOne(() => UserEntity, (user) => user.customer)
  @JoinColumn({ name: "user_id" })
  user!: UserEntity;
}

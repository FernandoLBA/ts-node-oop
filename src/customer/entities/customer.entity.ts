import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { UserEntity } from "../../user/entities/user.entity";
import { TestimonialEntity } from "../../testimonial/entities/testimonial.entity";

@Entity({ name: "customer" })
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt!: Date;

  // * Relacion 1:1 con user, y relaciona a user con customer
  @OneToOne(() => UserEntity, (user) => user.customer)
  // * crea una columna user_id (Foreign key) para relacionarse con user
  @JoinColumn({ name: "user_id" })
  user!: UserEntity;

  // * Relación 1:N con testimonial, relaciona a testimonial con customer
  @OneToMany(() => TestimonialEntity, (testimonial) => testimonial.customer)
  testimonials!: TestimonialEntity[];
}

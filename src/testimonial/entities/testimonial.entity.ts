import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CustomerEntity } from "../../customer/entities/customer.entity";
import { TestimonialUsageEntity } from "./testimonial-usage.entity";

@Entity({ name: "testimonial" })
export class TestimonialEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  content!: string;

  @Column()
  isNameUsageOnWebsiteGranted!: number;

  @Column()
  isNameUsageOnSocialMediaGranted!: number;

  @Column()
  isContentUsageOnWebsiteGranted!: number;

  @Column()
  isContentUsageOnSocialMediaGranted!: number;

  @Column()
  isLogoUsageOnWebsiteGranted!: number;

  @Column()
  isLogoUsageOnSocialMediaGranted!: number;

  @Column()
  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt!: Date;

  // * relación N:1 con customer, relaciona customer con testimonials
  @ManyToOne(() => CustomerEntity, (customer) => customer.testimonials)
  @JoinColumn({ name: "customer_id" })
  customer!: CustomerEntity;

  @OneToMany(() => TestimonialUsageEntity, (testimonialUsage) => testimonialUsage.testimonial)
  testimonialUsages!: TestimonialUsageEntity;
}
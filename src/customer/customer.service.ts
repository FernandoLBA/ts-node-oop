import { DeleteResult, UpdateResult } from "typeorm";

import { BaseService } from "../config/base.service";
import { CustomerEntity } from "./entities/customer.entity";
import { logger } from "../utils/logger";
import { CustomerDTO } from "./dto/customer.dto";

class CustomerService extends BaseService<CustomerEntity> {
  constructor() {
    super(CustomerEntity);
  }

  async getAllCustomers(): Promise<CustomerEntity[]> {
    logger.info(`${CustomerService.name} - getAllCustomers 🦌`);

    return await (await this.useRepository).find();
  }

  async getCustomerById(id: string): Promise<CustomerEntity | null> {
    logger.info(`${CustomerService.name} - getCustomerById - id: ${id} 🦌`);
    console.log("🚀 ~ file: customer.service.ts:20 ~ CustomerService ~ getCustomerById ~ id:", id);

    return (await this.useRepository).findOneBy({ id });
  }

  async createCustomer(customer: CustomerDTO): Promise<CustomerEntity | null> {
    logger.info(`${CustomerService.name} - createCustomer 🦌`);
    console.log("🚀 ~ file: customer.service.ts:22 ~ CustomerService ~ createCustomer ~ customer:", customer);

    return (await this.useRepository).save(customer);
  }

  async updateCustomerById(id: string, customerUpdated: CustomerDTO): Promise<UpdateResult | null> {
    logger.info(`${CustomerService.name} - updateCustomerById - id: ${id} 🦌`);
    console.log(
      "🚀 ~ file: customer.service.ts:28 ~ CustomerService ~ updateCustomerById ~ customerUpdated:",
      customerUpdated,
    );

    return (await this.useRepository).update(id, customerUpdated);
  }

  async deleteCustomerById(id: string): Promise<DeleteResult | null> {
    console.log("🚀 ~ file: customer.service.ts:34 ~ CustomerService ~ deleteCustomerById ~ id:", id);

    return (await this.useRepository).delete({ id });
  }
}

export default CustomerService;

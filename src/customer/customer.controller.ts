import { Request, Response } from "express";

import CustomerService from "./customer.service";
import { logger } from "../utils/logger";

class CustomerController {
  constructor(private readonly customerService: CustomerService = new CustomerService()) {}

  public getAllCustomers = async (_req: Request, res: Response) => {
    logger.info(`${CustomerController.name} - getAllCustomers 🦁`);
    const customers = await this.customerService.getAllCustomers();

    return res.json({
      customers,
    });
  };

  public getCustomerById = async (req: Request, res: Response) => {
    const { id } = req.params;
    logger.info(`${CustomerController.name} - getCustomerById - id: ${id} 🦁`);
    const customer = await this.customerService.getCustomerById(id);

    return res.json({ customer });
  };

  public createCustomer = async (req: Request, res: Response) => {
    logger.info(`${CustomerController.name} - createCustomer 🦁`);
    const { body } = req;
    const createdCustomer = await this.customerService.createCustomer(body);

    return res.json({ createdCustomer });
  };

  public updateCustomerById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    logger.info(`${CustomerController.name} - updateCustomerById - id: ${id} 🦁`);
    const updatedCustomer = await this.customerService.updateCustomerById(id, body);

    return res.json({ updatedCustomer });
  };

  public deleteCustomerById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedCustomer = await this.customerService.deleteCustomerById(id);

    return res.json({ deletedCustomer });
  };
}

export default CustomerController;

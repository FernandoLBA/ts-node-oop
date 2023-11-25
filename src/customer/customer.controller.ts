import { Request, Response } from "express";

import CustomerService from "./customer.service";
import { logger } from "../utils/logger";
import { HttpResponse } from "../shared/response/http.response";

class CustomerController {
  constructor(
    private readonly customerService: CustomerService = new CustomerService(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  public getAllCustomers = async (_req: Request, res: Response) => {
    try {
      logger.info(`${CustomerController.name} - getAllCustomers 🦁`);
      const customers = await this.customerService.getAllCustomers();

      return this.httpResponse.OK(res, customers);
    } catch (error) {
      logger.error(error);

      return this.httpResponse.ERROR(res, error);
    }
  };

  public getCustomerById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      logger.info(`${CustomerController.name} - getCustomerById - id: ${id} 🦁`);
      const customer = await this.customerService.getCustomerById(id);
      console.log("🚀 ~ file: customer.controller.ts:31 ~ CustomerController ~ getCustomerById= ~ customer:", customer);

      return this.httpResponse.OK(res, customer);
    } catch (error) {
      logger.error(error);

      return this.httpResponse.ERROR(res, error);
    }
  };

  public createCustomer = async (req: Request, res: Response) => {
    try {
      logger.info(`${CustomerController.name} - createCustomer 🦁`);
      const { body } = req;
      const createdCustomer = await this.customerService.createCustomer(body);

      return this.httpResponse.OK(res, createdCustomer);
    } catch (error) {
      logger.error(error);

      return this.httpResponse.ERROR(res, error);
    }
  };

  public updateCustomerById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { body } = req;
      logger.info(`${CustomerController.name} - updateCustomerById - id: ${id} 🦁`);
      const updatedCustomer = await this.customerService.updateCustomerById(id, body);

      return this.httpResponse.OK(res, updatedCustomer);
    } catch (error) {
      logger.error(error);

      return this.httpResponse.ERROR(res, error);
    }
  };

  public deleteCustomerById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedCustomer = await this.customerService.deleteCustomerById(id);

      return this.httpResponse.OK(res, deletedCustomer);
    } catch (error) {
      logger.error(error);

      return this.httpResponse.ERROR(res, error);
    }
  };
}

export default CustomerController;

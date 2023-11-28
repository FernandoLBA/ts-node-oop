import { NextFunction, Request, Response, Router } from "express";

import CustomerController from "../customer/controllers/customer.controller";
import { ValidateMiddlewareDTO } from "../shared/middleware/validate-dto.middleware";
import { BaseRouter } from "../shared/router/base.router";
import { CustomerDTO } from "../customer/dto/customer.dto";

class CustomerRoutes extends BaseRouter<CustomerController, ValidateMiddlewareDTO> {
  public path = "/customer";
  public router = Router();
  public customerController = new CustomerController();

  constructor() {
    super(CustomerController, ValidateMiddlewareDTO);
    this.initCustomerRoutes();
  }

  public initCustomerRoutes() {
    this.router.get(`${this.path}s`, this.customerController.getAllCustomers);

    this.router.get(`${this.path}/:id`, this.customerController.getCustomerById);

    this.router.post(
      `${this.path}`,
      (req: Request, res: Response, next: NextFunction) => this.middleware.validator(req, res, next, CustomerDTO),
      this.customerController.createCustomer,
    );

    this.router.put(`${this.path}/:id`, this.customerController.updateCustomerById);

    this.router.delete(`${this.path}/:id`, this.customerController.deleteCustomerById);
  }
}

export default CustomerRoutes;

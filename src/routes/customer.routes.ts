import { Router } from "express";

import CustomerController from "../customer/customer.controller";
import { Routes } from "../interfaces/route.interface";

class CustomerRoutes implements Routes {
  public path = "/customer";
  public router = Router();
  public customerController = new CustomerController();

  constructor() {
    this.initCustomerRoutes();
  }

  public initCustomerRoutes() {
    this.router.get(`${this.path}s`, this.customerController.getAllCustomers);

    this.router.get(`${this.path}/:id`, this.customerController.getCustomerById);

    this.router.post(`${this.path}`, this.customerController.createCustomer);

    this.router.put(`${this.path}/:id`, this.customerController.updateCustomerById);

    this.router.delete(`${this.path}/:id`, this.customerController.deleteCustomerById);
  }
}

export default CustomerRoutes;

import { NextFunction, Request, Response, Router } from "express";

import { ValidateMiddlewareDTO } from "../shared/middleware/validate-dto.middleware";
import { BaseRouter } from "../shared/router/base.router";
import TestimonialController from "../testimonial/controllers/testimonial.controller";
import { TestimonialDTO } from "../testimonial/dto/testimonial.dto";

class TestimonialRoutes extends BaseRouter<TestimonialController, ValidateMiddlewareDTO> {
  public path: string = "/testimonial";
  public router = Router();
  public testimonialController = new TestimonialController();

  constructor() {
    super(TestimonialController, ValidateMiddlewareDTO);
    this.initTestimonialRoutes();
  }

  initTestimonialRoutes() {
    this.router.get(`${this.path}s`, this.testimonialController.getAllTestimonials);
    this.router.get(`${this.path}/:id`, this.testimonialController.getTestimonialById);
    this.router.get(
      `${this.path}/:id/customer`,
      this.middleware.passAuth("jwt"),
      this.testimonialController.getTestimonialByIdWithCustomerRelation,
    );
    this.router.post(
      `${this.path}`,
      (req: Request, res: Response, next: NextFunction) => [this.middleware.validator(req, res, next, TestimonialDTO)],
      this.testimonialController.createTestimonial,
    );
    this.router.put(`${this.path}/:id`, this.testimonialController.updateTestimonialById);
    this.router.delete(`${this.path}/:id`, this.testimonialController.deleteTestimonialById);
  }
}

export default TestimonialRoutes;

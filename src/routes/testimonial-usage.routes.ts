import { NextFunction, Request, Response, Router } from "express";

import { ValidateMiddlewareDTO } from "../shared/middleware/validate-dto.middleware";
import { BaseRouter } from "../shared/router/base.router";
import TestimonialUsageController from "../testimonial/controllers/testimonial-usage.controller";
import { TestimonialUsagelDTO } from "../testimonial/dto/testimonial-usage.dto";

class TestimonialUsageRoutes extends BaseRouter<TestimonialUsageController, ValidateMiddlewareDTO> {
  public path: string = "/testimonial-usage";
  public router = Router();
  public testimonialUsageController = new TestimonialUsageController();

  constructor() {
    super(TestimonialUsageController, ValidateMiddlewareDTO);
    this.initTestimonialUsageRoutes();
  }

  public initTestimonialUsageRoutes() {
    this.router.get(
      `${this.path}s`,
      this.middleware.passAuth("jwt"),
      this.testimonialUsageController.getAllTestimonialsUsage,
    );
    this.router.get(
      `${this.path}/:id`,
      this.middleware.passAuth("jwt"),
      this.testimonialUsageController.getTestimonialUsageById,
    );
    this.router.post(
      `${this.path}`,
      this.middleware.passAuth("jwt"),
      (req: Request, res: Response, next: NextFunction) => [
        this.middleware.validator(req, res, next, TestimonialUsagelDTO),
      ],
      this.testimonialUsageController.createTestimonialUsage,
    );
    this.router.put(
      `${this.path}/:id`,
      this.middleware.passAuth("jwt"),
      (req: Request, res: Response, next: NextFunction) => [
        this.middleware.validator(req, res, next, TestimonialUsagelDTO),
      ],
      this.testimonialUsageController.updateTestimonialUsageById,
    );
    this.router.delete(
      `${this.path}/:id`,
      this.middleware.passAuth("jwt"),
      (req: Request, res: Response, next: NextFunction) => [this.middleware.checkAdminRole(req, res, next)],
      this.testimonialUsageController.deleteTestimonialUsageById,
    );
  }
}

export default TestimonialUsageRoutes;

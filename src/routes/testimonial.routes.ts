import { NextFunction, Request, Response, Router } from "express";

import { ValidateMiddlewareDTO } from "../shared/middleware/validate-dto.middleware";
import { BaseRouter } from "../shared/router/base.router";
import TestimonialController from "../testimonial/controllers/testimonial.controller";
import { TestimonialDTO } from "../testimonial/dto/testimonial.dto";

/**
 * @swagger
 * components:
 *  schemas:
 *    Testimonials:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: testimonial id
 *        content:
 *          type: string
 *          description: body of the content
 *        isNameUsageOnWebsiteGranted:
 *          type: number
 *          description: defines if we can use this testimonial or not
 *        createdAt:
 *          type: number
 *          format: date
 *          description: creating date of the testimonial
 *        updatedAt:
 *          type: number
 *          format: date
 *          description: updating date of the testimonial
 *      example:
 *        id: 1
 *        name: testimonial 1
 *        content: desciption of the testimonial
 *        isNameUsageOnWebsiteGranted: 0
 *        createdAt: 2023-11-12
 *        updatedAt: 2023-11-12
 *    Testimonial:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: testimonial id
 *        content:
 *          type: string
 *          description: body of the content
 *        isNameUsageOnWebsiteGranted:
 *          type: number
 *          description: defines if we can use this testimonial or not
 *        createdAt:
 *          type: number
 *          format: date
 *          description: creating date of the testimonial
 *        updatedAt:
 *          type: number
 *          format: date
 *          description: updating date of the testimonial
 *      example:
 *        id: 1
 *        name: testimonial 1
 *        content: desciption of the testimonial
 *        isNameUsageOnWebsiteGranted: 0
 *        createdAt: 2023-11-12
 *        updatedAt: 2023-11-12
 *    TestimonialWithCustomer:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: testimonial id
 *        content:
 *          type: string
 *          description: body of the content
 *        isNameUsageOnWebsiteGranted:
 *          type: number
 *          description: defines if we can use this testimonial or not
 *        createdAt:
 *          type: number
 *          format: date
 *          description: creating date of the testimonial
 *        updatedAt:
 *          type: number
 *          format: date
 *          description: updating date of the testimonial
 *        customer:
 *          type: object
 *          description: customer relationship
 *      example:
 *        id: 1
 *        name: testimonial 1
 *        content: desciption of the testimonial
 *        isNameUsageOnWebsiteGranted: 0
 *        createdAt: 2023-11-12
 *        updatedAt: 2023-11-12
 *        customer:
 *          id: 1
 *          name: Fernando
 *          createdAt: 2023-11-12
 *          updatedAt: 2023-11-123
 *    CreateTestimonial:
 *      type: object
 *      properties:
 *        content:
 *          type: string
 *          description: body of the content
 *        isNameUsageOnWebsiteGranted:
 *          type: number
 *          description: defines if we can use this testimonial or not
 *        createdAt:
 *          type: number
 *          format: date
 *          description: creating date of the testimonial
 *        updatedAt:
 *          type: number
 *          format: date
 *          description: updating date of the testimonial
 *        customer:
 *          type: object
 *          description: customer relationship
 *      example:
 *        name: testimonial 1
 *        content: desciption of the testimonial
 *        isNameUsageOnWebsiteGranted: 0
 *        createdAt: 2023-11-12
 *        updatedAt: 2023-11-12
 *        customer: 1
 *    UpdateTestimonial:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: testimonial id
 *        content:
 *          type: string
 *          description: body of the content
 *        isNameUsageOnWebsiteGranted:
 *          type: number
 *          description: defines if we can use this testimonial or not
 *        createdAt:
 *          type: number
 *          format: date
 *          description: creating date of the testimonial
 *        updatedAt:
 *          type: number
 *          format: date
 *          description: updating date of the testimonial
 *      example:
 *        id: 1
 *        name: testimonial 1
 *        content: desciption of the testimonial
 *        isNameUsageOnWebsiteGranted: 0
 *        createdAt: 2023-11-12
 *        updatedAt: 2023-11-123
 *    DeleteTestimonial:
 *      type: object
 *      properties:
 *        affected:
 *          type: number
 *          description: record affected
 *      example:
 *        affected: 1
 *    NonDeleteTestimonial:
 *      type: object
 *      properties:
 *        affected:
 *          type: number
 *          description: record affected
 *      example:
 *        affected: 0
 *    Customer:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: customer id
 *        name:
 *          type: string
 *          description: customer's name
 *        createdAt:
 *          type: number
 *          format: date
 *          description: creating date of the testimonial
 *        updatedAt:
 *          type: number
 *          format: date
 *          description: updating date of the testimonial
 *      example:
 *        id: 1
 *        name: Fernando
 *        createdAt: 2023-11-12
 *        updatedAt: 2023-11-123
 */

/**
 * @swagger
 *  tags:
 *    name: Testimonials
 *    description: Testimonials Endpoints
 */
class TestimonialRoutes extends BaseRouter<TestimonialController, ValidateMiddlewareDTO> {
  public path: string = "/testimonial";
  public router = Router();
  public testimonialController = new TestimonialController();

  constructor() {
    super(TestimonialController, ValidateMiddlewareDTO);
    this.initTestimonialRoutes();
  }

  initTestimonialRoutes() {
    /**
     * @swagger
     * /api/v1/testimonials:
     *  get:
     *    summary: get all testimonials from DB
     *    tags: [Testimonials]
     *    responses:
     *      200:
     *        description: ✅ - OK
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: '#components/schemas/Testimonials'
     *              description: array of testimonials
     *      400:
     *        description: bad request
     *      500:
     *        description: server side error
     */
    this.router.get(`${this.path}s`, this.testimonialController.getAllTestimonials);
    /**
     * @swagger
     * /api/v1/testimonial/{id}:
     *  get:
     *    summary: get testimonial by id from DB
     *    parameters:
     *      - in: path
     *        name: id
     *        required: true
     *        schema:
     *          type: string
     *    tags: [Testimonials]
     *    responses:
     *      200:
     *        description: ✅ - OK
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              $ref: '#components/schemas/Testimonial'
     *              description: testimonial
     *      400:
     *        description: bad request / general error
     *      404:
     *        description: 🕵️ - Not Found
     *      500:
     *        description: server side error
     */
    this.router.get(`${this.path}/:id`, this.testimonialController.getTestimonialById);
    /**
     * @swagger
     * /api/v1/testimonial/{id}/customer:
     *  get:
     *    summary: get testimonial by id from the DB with customer
     *    parameters:
     *      - in: path
     *        name: id
     *        required: true
     *        schema:
     *          type: string
     *    tags: [Testimonials]
     *    responses:
     *      200:
     *        description: ✅ - OK
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              $ref: '#components/schemas/TestimonialWithCustomer'
     *              description: testimonial
     *      400:
     *        description: bad request / general error
     *      401:
     *        description: unauthorized
     *      404:
     *        description: 🕵️ - Not Found
     *      500:
     *        description: server side error
     */
    this.router.get(
      `${this.path}/:id/customer`,
      this.middleware.passAuth("jwt"),
      this.testimonialController.getTestimonialByIdWithCustomerRelation,
    );
    /**
     * @swagger
     * /api/v1/testimonial:
     *  post:
     *    summary: create a testimonial from the DB
     *    tags: [Testimonials]
     *    responses:
     *      200:
     *        description: ✅ - OK
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              $ref: '#components/schemas/Testimonial'
     *              description: testimonial
     *      400:
     *        description: bad request / general error
     *      401:
     *        description: unauthorized
     *      403:
     *        description: forbidden
     *      500:
     *        description: server side error
     */
    this.router.post(
      `${this.path}`,
      (req: Request, res: Response, next: NextFunction) => [this.middleware.validator(req, res, next, TestimonialDTO)],
      this.testimonialController.createTestimonial,
    );
    /**
     * @swagger
     * /api/v1/testimonial/{id}:
     *  put:
     *    summary: update testimonial by id in the DB
     *    parameters:
     *      - in: path
     *        name: id
     *        required: true
     *        schema:
     *          type: string
     *    tags: [Testimonials]
     *    responses:
     *      200:
     *        description: ✅ - OK
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              $ref: '#components/schemas/UpdateTestimonial'
     *              description: testimonial
     *      400:
     *        description: bad request / general error
     *      401:
     *        description: Unauthorized
     *      404:
     *        description: Not found
     *      500:
     *        description: server side error
     */
    this.router.put(`${this.path}/:id`, this.testimonialController.updateTestimonialById);
    /**
     * @swagger
     * /api/v1/testimonial/{id}:
     *  delete:
     *    summary: delete a testimonial by id from the DB
     *    parameters:
     *      - in: path
     *        name: id
     *        required: true
     *        schema:
     *          type: string
     *    tags: [Testimonials]
     *    responses:
     *      200:
     *        description: ✅ - OK
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              $ref: '#components/schemas/DeleteTestimonial'
     *              description: testimonial
     *      400:
     *        description: bad request / general error
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              $ref: '#components/schemas/NonDeleteTestimonial'
     *              description: testimonial
     *      401:
     *        description: Unauthorized
     *      404:
     *        description: Not found
     *      500:
     *        description: server side error
     */
    this.router.delete(`${this.path}/:id`, this.testimonialController.deleteTestimonialById);
  }
}

export default TestimonialRoutes;

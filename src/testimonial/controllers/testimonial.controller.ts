import { Request, Response } from "express";
import { DeleteResult, UpdateResult } from "typeorm";

import { HttpResponse } from "../../shared/response/http.response";
import { logger } from "../../utils/logger";
import TestimonialService from "../services/testimonial.service";

class TestimonialController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private readonly testimonialService: TestimonialService = new TestimonialService(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  /**
   *
   * @param _req
   * @param res
   * @returns
   */
  public getAllTestimonials = async (_req: Request, res: Response) => {
    try {
      // * Identificamos cual controller y método se ejecuta
      logger.info(`${TestimonialController.name} - getAllTestimonials 🦁`);
      const testimonials = await this.testimonialService.getAllTestimonials();

      return this.httpResponse.OK(res, testimonials);
    } catch (error) {
      logger.error(error);

      return this.httpResponse.INTERNAL_SERVER_ERROR(res, null);
    }
  };

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  public getTestimonialById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      logger.info(`${TestimonialController.name} - getTestimonialById - id: ${id} 🦁`);
      const testimonial = await this.testimonialService.getTestimonialById(id);

      if (!testimonial) {
        logger.warn(`Testimonial with id ${id} not found 🕵️`);
        return this.httpResponse.NOT_FOUND(res, null);
      }

      return this.httpResponse.OK(res, testimonial);
    } catch (error) {
      logger.error(error);

      return this.httpResponse.ERROR(res, error);
    }
  };

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  public getTestimonialByIdWithCustomerRelation = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      logger.info(`${TestimonialController.name} - geTestimonialByIdWithCustomerRelation - id: ${id} 🦁`);
      const testimonial = await this.testimonialService.getTestimonialByIdWithCustomerRelation(id);

      if (!testimonial) {
        logger.warn(`Testimonial with id ${id} not found 🕵️`);
        return this.httpResponse.NOT_FOUND(res, null);
      }

      return this.httpResponse.OK(res, testimonial);
    } catch (error) {
      logger.error(error);

      return this.httpResponse.ERROR(res, error);
    }
  };

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  public createTestimonial = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      logger.info(`${TestimonialController.name} - createTestimonial 🦁`);
      const newTestimonial = await this.testimonialService.createTestimonial(body);

      return this.httpResponse.OK(res, newTestimonial);
    } catch (error) {
      logger.error(error);

      return this.httpResponse.ERROR(res, error);
    }
  };

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  public updateTestimonialById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { body } = req;
      logger.info(`${TestimonialController.name} - updateTestimonialById - id: ${id} 🦁`);
      const updatedTestimonial: UpdateResult | undefined = await this.testimonialService.updateTestimonialById(
        id,
        body,
      );

      if (!updatedTestimonial) {
        return this.httpResponse.NOT_FOUND(res, null);
      }

      return this.httpResponse.OK(res, updatedTestimonial);
    } catch (error) {
      logger.error(error);

      return this.httpResponse.ERROR(res, error);
    }
  };

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  public deleteTestimonialById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      logger.info(`${TestimonialController.name} - deleteTestimonialById - id: ${id} 🦁`);
      const deletedTestimonial: DeleteResult | null | undefined =
        await this.testimonialService.deleteTestimonialById(id);

      if (deletedTestimonial?.affected === 0) {
        return this.httpResponse.NOT_FOUND(res, null);
      }

      return this.httpResponse.OK(res, deletedTestimonial);
    } catch (error) {
      logger.error(error);

      return this.httpResponse.ERROR(res, error);
    }
  };
}

export default TestimonialController;

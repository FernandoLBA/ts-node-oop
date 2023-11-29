import { Request, Response } from "express";
import { HttpResponse } from "../../shared/response/http.response";
import { logger } from "../../utils/logger";
import TestimonialUsageService from "../services/testimonial-usage.service";
import { DeleteResult, UpdateResult } from "typeorm";

class TestimonialUsageController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private readonly testimonialUsageService: TestimonialUsageService = new TestimonialUsageService(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  /**
   *
   * @param _req
   * @param res
   * @returns
   */
  public getAllTestimonialsUsage = async (_req: Request, res: Response) => {
    try {
      // * Identificamos cual controller y método se ejecuta
      logger.info(`${TestimonialUsageController.name} - getAllTestimonialsUsage 🦁`);
      const testimonials = await this.testimonialUsageService.getAllTestimonialsUsage();

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
  public getTestimonialUsageById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      logger.info(`${TestimonialUsageController.name} - getTestimonialUsageById - id: ${id} 🦁`);
      const testimonial = await this.testimonialUsageService.getTestimonialUsageById(id);

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
  public createTestimonialUsage = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      logger.info(`${TestimonialUsageController.name} - createTestimonialUsage 🦁`);
      const newTestimonial = await this.testimonialUsageService.createTestimonialUsage(body);

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
  public updateTestimonialUsageById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { body } = req;
      logger.info(`${TestimonialUsageController.name} - updateTestimonialUsageById - id: ${id} 🦁`);
      const updatedTestimonial: UpdateResult | undefined =
        await this.testimonialUsageService.updateTestimonialUsageById(id, body);

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
  public deleteTestimonialUsageById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      logger.info(`${TestimonialUsageController.name} - deleteTestimonialUsageById - id: ${id} 🦁`);
      const deletedTestimonial: DeleteResult | null | undefined =
        await this.testimonialUsageService.deleteTestimonialUsageById(id);

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

export default TestimonialUsageController;

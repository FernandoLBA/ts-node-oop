import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { TestimonialUsagelDTO } from "../dto/testimonial-usage.dto";
import { TestimonialUsageEntity } from "../entities/testimonial-usage.entity";
import { logger } from "../../utils/logger";
import { HttpException } from "../../exception/httpException";
import { ReasonPhrases } from "http-status-codes";

class TestimonialUsageService extends BaseService<TestimonialUsageEntity> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {
    // * La clase BaseService recibe la entidad al cual se conectará
    super(TestimonialUsageEntity);
  }

  /**
   * getAllTestimonialsUsage
   */
  public async getAllTestimonialsUsage(): Promise<TestimonialUsageEntity[] | undefined> {
    try {
      // * retorna el nombre de la clase y el nombre del método
      logger.info(`${TestimonialUsageService.name} - getAllTestimonialsUsage 🦌`);

      // * Acá comenzamos a usar el repositorio devuelto de la clase BaseService
      // * el cual nos dará acceso a los métodos del repositorio
      const testimonials = await (await this.useRepository).find();

      return testimonials;
    } catch (error) {
      logger.error(error);
    }
  }

  /**
   * getTestimonialUsageById
   * @param id
   * @returns
   */
  public async getTestimonialUsageById(id: string): Promise<TestimonialUsageEntity | null | undefined> {
    try {
      logger.info(`${TestimonialUsageService.name} - getTestimonialUsageById - id: ${id} 🦌`);
      const testimonial = await (await this.useRepository).findOneBy({ id });

      if (!testimonial) {
        throw new HttpException(409, ReasonPhrases.NOT_FOUND);
      }

      return testimonial;
    } catch (error) {
      logger.error(error);
    }
  }

  /**
   * createTestimonialUsage
   * @param body
   * @returns
   */
  public async createTestimonialUsage(body: TestimonialUsagelDTO): Promise<TestimonialUsageEntity | undefined> {
    try {
      logger.info(`${TestimonialUsageService.name} - createTestimonialUsage 🦌`);
      console.log("🚀 ~ file: testimonial.service.ts:146 ~ TestimonialService ~ createTestimonialUsage ~ body:", body);
      const newTestimonial = (await this.useRepository).create(body);

      return (await this.useRepository).save(newTestimonial);
    } catch (error) {
      logger.error(error);
    }
  }

  /**
   * updateTestimonialUsageById
   * @param id
   * @param body
   * @returns
   */
  public async updateTestimonialUsageById(id: string, body: TestimonialUsagelDTO): Promise<UpdateResult | undefined> {
    try {
      logger.info(`${TestimonialUsageService.name} - updateTestimonialUsageById - id: ${id} 🦌`);
      console.log(
        "🚀 ~ file: testimonial.service.ts:81 ~ TestimonialService ~ updateTestimonialUsageById ~ body:",
        body,
      );
      const testimonialFinded = await (await this.useRepository).findOneBy({ id });

      if (!testimonialFinded) {
        console.log("El testimonio no existe");
      }

      return await (await this.useRepository).update(id, body);
    } catch (error) {
      logger.error(error);
    }
  }

  /**
   * deleteTestimonialUsageById
   * @param id
   * @returns
   */
  public async deleteTestimonialUsageById(id: string): Promise<DeleteResult | null | undefined> {
    try {
      logger.info(`${TestimonialUsageService.name} - deleteTestimonialUsageById - id: ${id} 🦌`);
      const testimonialFinded = await (await this.useRepository).findOneBy({ id });

      if (!testimonialFinded) {
        console.log("El testimonio no existe");
      }

      return await (await this.useRepository).delete(id);
    } catch (error) {
      logger.error(error);
    }
  }
}

export default TestimonialUsageService;

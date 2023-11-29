import { DeleteResult, UpdateResult } from "typeorm";

import { ReasonPhrases } from "http-status-codes";
import { BaseService } from "../../config/base.service";
import { HttpException } from "../../exception/httpException";
import { logger } from "../../utils/logger";
import { TestimonialDTO } from "../dto/testimonial.dto";
import { TestimonialEntity } from "../entities/testimonial.entity";

class TestimonialService extends BaseService<TestimonialEntity> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {
    // * La clase BaseService recibe la entidad al cual se conectará
    super(TestimonialEntity);
  }

  /**
   * getAllTestimonials
   */
  public async getAllTestimonials(): Promise<TestimonialEntity[] | undefined> {
    try {
      // * retorna el nombre de la clase y el nombre del método
      logger.info(`${TestimonialService.name} - getAllTestimonials 🦌`);

      // * Acá comenzamos a usar el repositorio devuelto de la clase BaseService
      // * el cual nos dará acceso a los métodos del repositorio
      const testimonials = await (await this.useRepository).find();

      return testimonials;
    } catch (error) {
      logger.error(error);
    }
  }

  /**
   * getTestimonialById
   * @param id
   * @returns
   */
  public async getTestimonialById(id: string): Promise<TestimonialEntity | null | undefined> {
    try {
      logger.info(`${TestimonialService.name} - getTestimonialById - id: ${id} 🦌`);
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
   * getTestimonialByIdWithCustomerRelation
   * @param id
   * @returns
   */
  public async getTestimonialByIdWithCustomerRelation(id: string): Promise<TestimonialEntity | null | undefined> {
    try {
      logger.info(`${TestimonialService.name} - getTestimonialByIdWithCustomerRelation - id: ${id} 🦌`);
      const testimonial = await (await this.useRepository)
        .createQueryBuilder("testimonial")
        .leftJoinAndSelect("testimonial.customer", "customer")
        .where({ id })
        .getOne();

      return testimonial;
    } catch (error) {
      logger.error(error);
    }
  }

  /**
   * createTestimonial
   * @param body
   * @returns
   */
  public async createTestimonial(body: TestimonialDTO): Promise<TestimonialEntity | undefined> {
    try {
      logger.info(`${TestimonialService.name} - createTestimonial 🦌`);
      console.log("🚀 ~ file: testimonial.service.ts:146 ~ TestimonialService ~ createTestimonial ~ body:", body);
      const newTestimonial = (await this.useRepository).create(body);

      return (await this.useRepository).save(newTestimonial);
    } catch (error) {
      logger.error(error);
    }
  }

  /**
   * updateTestimonialById
   * @param id
   * @param body
   * @returns
   */
  public async updateTestimonialById(id: string, body: TestimonialDTO): Promise<UpdateResult | undefined> {
    try {
      logger.info(`${TestimonialService.name} - updateTestimonialById - id: ${id} 🦌`);
      console.log("🚀 ~ file: testimonial.service.ts:81 ~ TestimonialService ~ updateTestimonialById ~ body:", body);
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
   * deleteTestimonialById
   * @param id
   * @returns
   */
  public async deleteTestimonialById(id: string): Promise<DeleteResult | null | undefined> {
    try {
      logger.info(`${TestimonialService.name} - deleteTestimonialById - id: ${id} 🦌`);
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

export default TestimonialService;

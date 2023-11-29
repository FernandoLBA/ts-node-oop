import { plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

import { SharedMiddleware } from "./shared.middleware";

export class ValidateMiddlewareDTO extends SharedMiddleware {
  constructor() {
    super();
  }

  /**
   * Valida la data que recibe
   * @param req
   * @param res
   * @param next
   * @param DtoClass
   */
  validator(req: Request, res: Response, next: NextFunction, DtoClass: any) {
    console.log("🚀 ~ file: validate-dto.middleware.ts:14 ~ ValidateMiddlewareDTO ~ validator ~ DtoClass:", DtoClass);
    // * Recibe una Clase (DtoClass) para o validar un objeto plano (body)
    // * y retornar una instancia de una clase validada y limpia
    const dtoInstance = plainToInstance(DtoClass, req.body);

    validate(dtoInstance).then((err) => {
      // * Si existen errores de validación
      if (err.length > 0) {
        const dtoErrors = err.map((error: ValidationError) => (Object as any).values(error.constraints)).join(", ");
        console.log(
          "🚀 ~ file: validate-dto.middleware.ts:22 ~ ValidateMiddlewareDTO ~ validate ~ dtoErrors:",
          dtoErrors,
        );

        return this.httpResponse.BAD_REQUEST(res, dtoErrors);
      } else {
        // * actualiza el body con el objeto tipado
        req.body = dtoInstance;

        // * Si todo está bien entonces continúa al controller
        next();
      }
    });
  }
}

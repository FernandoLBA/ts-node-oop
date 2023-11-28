import { plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

import { HttpResponse } from "../response/http.response";

export class ValidateMiddlewareDTO {
  constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) {}

  validator(req: Request, res: Response, next: NextFunction, DtoClass: any) {
    // * Recibe una Clase (DtoClass) para o validar un objeto plano (body)
    // * y retornar una instancia de una clase validada y limpia
    const dtoInstance = plainToInstance(DtoClass, req.body);

    validate(dtoInstance).then((err) => {
      // * Si existen errores de validación
      if (err.length > 0) {
        const dtoErrors = err.map((error: ValidationError) => (Object as any).values(error.constraints)).join(", ");

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

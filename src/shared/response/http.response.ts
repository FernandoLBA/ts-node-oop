import { Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export class HttpResponse {
  // * Métodos de respuestas
  OK(res: Response, data: any) {
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: `✅ - ${ReasonPhrases.OK}`,
      data,
    });
  }

  NOT_FOUND(res: Response, data: any) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: StatusCodes.NOT_FOUND,
      message: `🕵️ - ${ReasonPhrases.NOT_FOUND}`,
      data,
    });
  }

  UNAUTHORIZED(res: Response, data: any) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      status: StatusCodes.UNAUTHORIZED,
      message: `👮 - ${ReasonPhrases.UNAUTHORIZED}`,
      data,
    });
  }

  FORBIDDEN(res: Response, data: any) {
    return res.status(StatusCodes.FORBIDDEN).json({
      status: StatusCodes.FORBIDDEN,
      message: `🚫 - ${ReasonPhrases.FORBIDDEN}`,
      data,
    });
  }

  ERROR(res: Response, data: any) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: StatusCodes.BAD_REQUEST,
      message: `🔥 - ERROR: ${data?.sqlMessage ?? "Unknown Error"} - CODE: ${data?.errno ?? "Unknown"}`,
      data: null,
    });
  }

  INTERNAL_SERVER_ERROR(res: Response, data: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: `💥 - ERROR: ${ReasonPhrases.INTERNAL_SERVER_ERROR}`,
      data,
    });
  }
}

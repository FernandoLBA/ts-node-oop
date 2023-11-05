import { Request, Response, Router } from "express";
import { Routes } from "../interfaces/route.interface";

class BaseRoutes implements Routes {
  public path? = "/alive";
  public router = Router();

  constructor() {
    this.initBaseRoutes();
  }

  /**
   * inicializa una ruta base /alive, de prueba
   */
  public initBaseRoutes() {
    this.router.get(`${this.path}`, (_req: Request, res: Response) => {
      res.status(200).json({
        ok: true,
        message: "I'am an API and I am alive",
      });
    });
  }
}

export default BaseRoutes;

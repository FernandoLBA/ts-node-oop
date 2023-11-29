import { Router } from "express";

// * Esta es una clase genérica, que recibe un controller y un middleware
// * su función es generar middlewares
export class BaseRouter<T, U> {
  public router: Router;
  public controller: T;
  public middleware: U;

  // * El constructor recibe 2 instancias genéricas de tipo T y U
  constructor(TController: { new (): T }, UMiddleware: { new (): U }) {
    this.router = Router();
    this.controller = new TController();
    this.middleware = new UMiddleware();
    this.routes();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  routes() {}
}

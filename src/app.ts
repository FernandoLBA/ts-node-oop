import express, { Application } from "express";
import { API_VERSION, NODE_ENV, PORT } from "./config/config";
import { Routes } from "./interfaces/route.interface";
import { logger } from "./utils/logger";
import cors from "cors";
import displayRoutes from "express-routemap";

class App {
  public app: Application;
  public env: string;
  public port: number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || "development";
    this.port = Number(PORT) || 3000;

    this.initializeRoutes(routes);
  }

  /**
   *
   * @param routes
   */
  public initializeRoutes(routes: Routes[]) {
    this.app.use(cors());
    this.app.use(express.json());

    // * Se iteran las rutas y se asignan a la app
    routes.forEach((route) => {
      this.app.use(`/api/${API_VERSION}`, route.router);
    });
  }

  /**
   * Método listen que inicializa el servidor
   */
  public listen() {
    this.app.listen(this.port, () => {
      // * esto muestra todas las endpoints de mi api
      displayRoutes(this.app);
      logger.info("==================================");
      logger.info(`======= ENV: "${this.env}" =======`);
      logger.info(`🚀 App listening on port - ${this.port} 🚀`);
      logger.info(`🔗 http://localhost:${this.port}/api/${API_VERSION} 🔗`);
      logger.info("==================================");
    });
  }
}

export default App;

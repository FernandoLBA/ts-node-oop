import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import displayRoutes from "express-routemap";
import helmet from "helmet";
import hpp from "hpp";
import { IncomingMessage, Server, ServerResponse } from "http";
import morgan from "morgan";
import { DataSource } from "typeorm";

import { API_VERSION, ConfigServer, LOG_FORMAT, NODE_ENV, PORT } from "./config/config";
import corsConfig from "./config/cors.config";
import { Routes } from "./interfaces/route.interface";
import { logger, stream } from "./utils/logger";
import { LoginStrategy } from "./auth/strategies/login.strategy";
import { JwtStrategy } from "./auth/strategies/jwt.strategy";

class App extends ConfigServer {
  public app: Application;
  public env: string;
  public port: number;
  public server!: Server<typeof IncomingMessage, typeof ServerResponse>;

  // * El constructor recibe un array de rutas
  constructor(routes: Routes[]) {
    // * Cuando extendemos, se debe hacer una instanciación de esa clase instanciada
    // * por eso usamo super, para tener un enlace a la clase extendida
    super();
    this.app = express();
    this.env = NODE_ENV || "development";
    this.port = Number(PORT) || 3000;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.passportUse();
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  /**
   * Obtiene el servidor
   * @returns
   */
  public getServer() {
    return this.app;
  }

  /**
   * Cierra el servidor
   * @param done
   */
  public closeServer(done?: any) {
    this.server = this.app.listen(this.port, () => {
      done();
    });
  }

  /**
   * Esto retorna un array donde se inyectan las estrategias de passport
   * @returns
   */
  public passportUse() {
    return [new LoginStrategy().use, new JwtStrategy().use];
  }

  /**
   * Se conecta a la base de datos a través del método initConnect
   * que pertenece la clase abstracta heredada: ConfigServer
   */
  private async connectToDatabase(): Promise<DataSource | void> {
    return this.initConnect
      .then(() => {
        logger.info(`======= 🔌 DB Connected 🔌 =======`);
        logger.info("==================================");
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  /**
   * Inicializa y configura todos los middlewares de la app
   */
  private initializeMiddlewares() {
    // * Permite visualizar las peticiones HTTP
    this.app.use(morgan(LOG_FORMAT ?? "../logs", { stream }));
    // * Permite la conexión entre dominios
    this.app.use(cors(corsConfig));
    // * Permite ???
    this.app.use(hpp());
    // * Brinda mayor seguridad a la API, al evitar inyecciones en los headers
    this.app.use(helmet());
    // * Permite transformar el body en un json
    this.app.use(express.json());
    // * Permite el soporte de urlencoded
    this.app.use(express.urlencoded({ extended: true }));
    // * Permite el manejo de cookies
    this.app.use(cookieParser());
  }

  /**
   * Inicializa las rutas
   * @param routes
   */
  public initializeRoutes(routes: Routes[]) {
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
      logger.info(`🦻 App listening on port - ${this.port} 🦻`);
      logger.info(`🔗 http://localhost:${this.port}/api/${API_VERSION} 🔗`);
      logger.info("==================================");
    });
  }

  private initializeSwagger() {
    // TODO: init swagger
  }

  private initializeErrorHandling() {
    // TODO: configure error handling
  }
}

export default App;

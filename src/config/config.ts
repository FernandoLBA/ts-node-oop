import { config } from "dotenv";
import { DataSource } from "typeorm";

import { AppDataSource } from "./data.source";

// * Presetea el config de dotenv y asigna la ruta con nombre del archivo .env según el ambiente
config({
  path: `.env.${process.env.NODE_ENV || "development"}.local`,
});

// * Desestructura y exporta las variables de entorno del archivo .env
export const {
  NODE_ENV,
  PORT,
  LOG_DIR,
  LOG_FORMAT,
  API_VERSION,
  ORIGIN,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_PASSWORD,
  DB_USER,
} = process.env;

/**
 * Esta clase abstracta tiene un método get que retorna una promesa de tipo DataSource
 * la cual permite inicializar el servidor y esta clase puede ser heredada para
 * utilizar este método.
 */
export abstract class ConfigServer {
  get initConnect(): Promise<DataSource> {
    return AppDataSource.initialize();
  }
}

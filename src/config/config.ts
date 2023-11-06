import { config } from "dotenv";

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

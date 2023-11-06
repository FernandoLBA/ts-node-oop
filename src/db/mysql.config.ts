import { DataSource } from "typeorm";

import { DB_NAME, DB_PORT } from "../config/config";
import { AppDataSource } from "../config/data.source";
import { logger } from "../utils/logger";

/**
 * Inicializa la conexión a la base de datos a través del DataSource de TypeORM
 * @returns 
 */
export const mySqlConnection = async (): Promise<DataSource> => {
  try {
    logger.info("===============================================");
    logger.info(`====== 🚀 PORT: "${DB_PORT}" ========================`);
    logger.info(`====== 🚀 DATABASE: "${DB_NAME}" =====`);
    logger.info("===============================================");

    return await AppDataSource.initialize();
  } catch (error) {
    console.log(error);

    throw new Error(`Error trying to connect with MySql`);
  }
};

import { join } from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } =
  process.env;

// * Archivo de configuración de typeORM
const configDBConnection: DataSourceOptions = {
  type: "mysql",
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  migrationsRun: false,
  logging: false,
  entities: [join(__dirname, "../**/*.entity{.ts,.js}")],
  migrations: [join(__dirname, "../**/*.migration{.ts,.js}")],
  subscribers: [join(__dirname, "../**/*.subscriber{.ts,.js}")],
  // * Esto tiene una instancia de typeorm-naming-sttategies, la cual convierte los nombres de camelCase a snake_case
  namingStrategy: new SnakeNamingStrategy(),
};

export const AppDataSource: DataSource = new DataSource(configDBConnection);

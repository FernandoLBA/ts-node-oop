import { EntityTarget, ObjectLiteral, Repository } from "typeorm";

import { ConfigServer } from "./config";

// * Esta clase hereda de la clase abstracta ConfigServer
// * y es de tipo generíco
export class BaseService<T extends ObjectLiteral> extends ConfigServer {
  // * este atributo se usa para almacenar un repositorio
  public useRepository: Promise<Repository<T>>;

  // * Obtiene una entidad de la base de datos
  constructor(private getEntity: EntityTarget<T>) {
    super();
    // * Le pasamos la entidad al método y se almacena un repositorio
    this.useRepository = this.initRepository(this.getEntity);
  }

  /**
   * Recibe una entidad y retorna una conexión al repositorio de
   * esa entidad
   * @param entity
   * @returns
   */
  async initRepository<T extends ObjectLiteral>(entity: EntityTarget<T>) {
    // * aquí usamos el método de la clase abstracta el cual nos devuelve
    // * una conexión a la base de datos
    const connection = await this.initConnect;

    // * retorna un repositorio de la entidad recibida
    return connection.getRepository(entity);
  }
}

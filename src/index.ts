import App from "./app";
import AuthRoutes from "./routes/auth.routes";
import BaseRoutes from "./routes/base.routes";
import CustomerRoutes from "./routes/customer.routes";
import UserRoutes from "./routes/user.routes";

/**
 * Aquí creamos una instancia de la clase App.
 * La cual recibe un array de rutas, por lo tanto, enviamos
 * un array con la instancia de la clase BaseRoutes, o cualquiera
 * que contenga rutas para ser añadidas y expuestas acá
 */
const app = new App([new BaseRoutes(), new UserRoutes(), new CustomerRoutes(), new AuthRoutes()]);

app.listen();

import App from './app';
import BaseRoutes from './routes/base.routes';

/**
 * Aquí creamos una instancia de la calse App.
 * La cual recibe un array de rutas, por lo tanto, enviamos
 * un array con la instancia de la clase BaseRoutes, la cuál contendrá
 * las rutas de la API.
 */
const app = new App([new BaseRoutes()]);

app.listen();
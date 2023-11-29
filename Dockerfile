FROM node:16-alpine

# Instalamos ts-node de forma global para correr la API
RUN npm install -g ts-node

# Definimos el directorio donde estará la API
WORKDIR /usr/src/app

# Copiamos package.json y package-lock.json
COPY package*.json .

# Copiamos todo el proyecto
COPY . .

# Instalamos todas las dependencias
RUN npm install

# Modificamos la variable de entorno NODE_ENV y le asignamos el valor production
ENV NODE_ENV=production

# Exponemos la API en el puerto 6000, el mismo del .env
EXPOSE 6000

# Colocamos el comando de arranque de nuestra API en producción
CMD [ "npm", "run", "start:prod" ]
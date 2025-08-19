# Etapa 1: Construir la aplicación de Angular
# Usamos una imagen de Node.js v20 para asegurar la compatibilidad.
FROM node:20-alpine AS builder

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos package.json y package-lock.json e instalamos las dependencias
# Esto ayuda a aprovechar el cache de Docker.
COPY package.json package-lock.json ./
RUN npm install

# Copiamos el resto del código de la aplicación al contenedor
COPY . .

# Construimos la aplicación de Angular en modo producción.
# El flag --base-href / es esencial para el enrutamiento.
# La salida se genera en el directorio /dist/out.
RUN npm run build -- --output-path=./dist/out --base-href /

# Etapa 2: Servir la aplicación con Nginx
# Usamos una imagen de Nginx ligera como servidor web.
FROM nginx:alpine

# Copiamos los archivos de la aplicación compilada desde la etapa "builder".
# La ruta correcta para Angular 16+ es /app/dist/out/browser.
COPY --from=builder /app/dist/out/browser /usr/share/nginx/html

# Copiamos el archivo de configuración personalizado de Nginx.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponemos el puerto 80, que es el puerto por defecto de Nginx.
EXPOSE 80

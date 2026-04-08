# ── STAGE 1: BUILD ────────────────────────────────────────────────────────────
# Usamos Node 18 para compilar la app de React
FROM node:18-slim AS build

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos primero package.json para aprovechar el cache de Docker:
# si no cambian las dependencias, no las reinstala en cada build
COPY package.json package-lock.json* ./
RUN npm install

# Copiamos el resto del código y generamos el build de producción
# "npm run build" ejecuta react-scripts build y genera la carpeta /app/build
COPY . .
RUN npm run build

# ── STAGE 2: SERVIDOR ─────────────────────────────────────────────────────────
# Usamos nginx (servidor web liviano) para servir los archivos estáticos del build
# Esto es más eficiente que servir React con Node en producción
FROM nginx:alpine

# Copiamos los archivos compilados de React al directorio que sirve nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copiamos nuestra configuración personalizada de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Puerto que expone el contenedor
EXPOSE 80

# nginx arranca automáticamente con la imagen, no necesita CMD explícito

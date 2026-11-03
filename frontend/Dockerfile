# Web: Angular prerenderizado servido por nginx. Se construye desde la raíz del repo:
#   docker build -f frontend/Dockerfile .

# --- 1. Compilar Angular (prerender a HTML estático) ---
FROM node:24-slim AS build
WORKDIR /src
# Primero solo los package.json, para que la capa de npm ci se reutilice si no cambian
COPY package.json package-lock.json ./
COPY frontend/package.json frontend/
COPY backend/package.json backend/
RUN npm ci
COPY frontend/ frontend/
RUN npm run build -w frontend

# --- 2. Imagen final: solo nginx y los archivos estáticos ---
FROM nginx:stable-alpine
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /src/frontend/dist/kaitzlab-web/browser /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -qO /dev/null http://127.0.0.1/ || exit 1

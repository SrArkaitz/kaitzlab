# API NestJS. Se construye desde la raíz del repo:
#   docker build -f backend/Dockerfile .

# --- 1. Compilar TypeScript ---
FROM node:24-slim AS build
WORKDIR /src
# Primero solo los package.json, para que la capa de npm ci se reutilice si no cambian
COPY package.json package-lock.json ./
COPY frontend/package.json frontend/
COPY backend/package.json backend/
RUN npm ci
COPY backend/ backend/
RUN npm run build -w backend

# --- 2. Dependencias de producción (solo las del backend) ---
# En Alpine, como la imagen final, por si alguna dependencia futura trae binarios nativos
FROM node:24-alpine AS deps
WORKDIR /src
COPY package.json package-lock.json ./
COPY frontend/package.json frontend/
COPY backend/package.json backend/
RUN npm ci --omit=dev -w backend && mkdir -p backend/node_modules

# --- 3. Imagen final: dist + dependencias de producción, sin usuario root ---
FROM node:24-alpine
ENV NODE_ENV=production \
    PORT=3000
WORKDIR /app
COPY --from=deps /src/node_modules ./node_modules
COPY --from=deps /src/backend/node_modules ./backend/node_modules
# El package.json hace falta en ejecución: marca el proyecto como ESM y da la versión al health
COPY backend/package.json ./backend/
COPY --from=build /src/backend/dist ./backend/dist
WORKDIR /app/backend
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s \
  CMD wget -qO /dev/null http://127.0.0.1:3000/api/health || exit 1
CMD ["node", "dist/main.js"]

# Dockerfile para deploy alternativo
FROM node:18-alpine

WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production

# Copiar código fonte
COPY . .

# Gerar cliente Prisma
RUN npx prisma generate

# Fazer build da aplicação
RUN npm run build

# Expor porta
EXPOSE 3000

# Rodar migrações e iniciar aplicação
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]

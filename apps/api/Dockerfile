FROM node:20.19.4-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY tsconfig.base.json ./
COPY apps/api ./apps/api
COPY packages/contracts ./packages/contracts

RUN npm ci
RUN npm run build --workspace apps/api
RUN npm prune --omit=dev

FROM node:20.19.4-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/tsconfig.base.json ./
COPY --from=builder /app/apps/api/package*.json ./apps/api/
COPY --from=builder /app/packages/contracts/package*.json ./packages/contracts/
COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma

WORKDIR /app/apps/api
EXPOSE 3000

CMD ["npm", "run", "start:prod:migrate"]

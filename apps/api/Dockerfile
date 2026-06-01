FROM node:20.19.4-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY tsconfig.base.json ./
# Copy workspace manifests first so npm ci can be layer-cached
# across regular source-code deploys.
COPY apps/api/package*.json ./apps/api/
COPY packages/contracts/package*.json ./packages/contracts/

RUN npm ci

# Copy full sources only after dependency install.
COPY apps/api ./apps/api
COPY packages/contracts ./packages/contracts

RUN npx prisma generate --schema=apps/api/prisma/schema.prisma
RUN npm run build --workspace packages/contracts
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
COPY --from=builder /app/packages/contracts ./packages/contracts

COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma

WORKDIR /app/apps/api
EXPOSE 3000

CMD ["npm", "run", "start:prod:migrate"]

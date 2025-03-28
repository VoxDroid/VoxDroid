FROM node:22-alpine AS builder
WORKDIR /docker
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
FROM node:22-alpine AS runner
WORKDIR /docker
COPY --from=builder /docker/package*.json ./
COPY --from=builder /docker/.next ./.next
COPY --from=builder /docker/public ./public
COPY --from=builder /docker/next.config.mjs ./
RUN npm install --legacy-peer-deps --production
EXPOSE 3000
CMD ["npm", "start"]
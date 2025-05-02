FROM node:22
LABEL authors="darth"

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /src

COPY pnpm-lock.yaml package.json ./

RUN pnpm install

COPY . .

RUN pnpm prisma generate

EXPOSE 3000

CMD ["pnpm", "run", "start:dev"]

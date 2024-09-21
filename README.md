# Neura SpaceX

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Start up Mongo with Docker

Start the development server on `http://localhost:3000`:

```bash
docker-compose up
```

## Setup App

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

rename `.env.example` to `.env`. It includes:

```
MONGODB_URI=[your connection string here]
```

Start the development server on `http://localhost:3000`:

```bash
yarn dev
```

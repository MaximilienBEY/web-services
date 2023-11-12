# Web Service

## Description

A basic CRUD service for movies, using Bun, Elysia, Prisma and Sqlite.

## Installation

Install bun if you haven't already:

```bash
curl -fsSL https://bun.sh/install | bash
```

Install the dependencies:

```bash
bun install
```

Generate the database:

```bash
bunx prisma db push
```

## Usage

Start the server:

```bash
bun run
```

Or start the server in development mode:

```bash
bun run dev
```

## License

MIT
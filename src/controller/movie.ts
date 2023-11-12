import { Elysia, NotFoundError, t } from "elysia"

import prismaPlugin from "../plugins/prisma"
import {
  movieCreateSchema,
  movieSchema,
  movieUpdateSchema,
} from "../schemas/movie"

const movieController = new Elysia()
  .use(prismaPlugin)
  .get(
    "/movies",
    async ({ store: { db } }) => {
      return db.movie.findMany()
    },
    { response: t.Array(movieSchema) },
  )
  .post(
    "/movies",
    async ({ store: { db }, body }) => {
      return db.movie.create({ data: body })
    },
    {
      body: movieCreateSchema,
      response: movieSchema,
    },
  )
  .get(
    "/movies/:id",
    async ({ store: { db }, params: { id } }) => {
      const movie = await db.movie.findUnique({ where: { id: Number(id) } })
      if (!movie) throw new NotFoundError("Movie not found")

      return movie
    },
    { response: movieSchema },
  )
  .patch(
    "/movies/:id",
    async ({ store: { db }, params: { id }, body }) => {
      const movie = await db.movie.findUnique({ where: { id: Number(id) } })
      if (!movie) throw new NotFoundError("Movie not found")

      return db.movie.update({ where: { id: Number(id) }, data: body })
    },
    {
      body: movieUpdateSchema,
      response: movieSchema,
    },
  )
  .delete(
    "/movies/:id",
    async ({ store: { db }, params: { id } }) => {
      const deleted = await db.movie
        .delete({ where: { id: Number(id) } })
        .then(Boolean)
        .catch(() => false)

      if (!deleted) throw new NotFoundError("Movie not found")
      return "Movie successfully deleted"
    },
    {
      response: t.String(),
    },
  )

export default movieController

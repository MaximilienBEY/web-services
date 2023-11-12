import { Elysia, NotFoundError } from "elysia"

import prismaPlugin from "../plugins/prisma"
import { movieCreateSchema, movieUpdateSchema } from "../schemas/movie"

const movieController = new Elysia()
  .use(prismaPlugin)
  .get("/movies", async ({ store: { db } }) => {
    return db.movie.findMany()
  })
  .post(
    "/movies",
    async ({ store: { db }, body, set }) => {
      set.status = 201
      return db.movie.create({ data: body })
    },
    { body: movieCreateSchema },
  )
  .get("/movies/:id", async ({ store: { db }, params: { id } }) => {
    const movie = await db.movie.findUnique({ where: { id: Number(id) } })
    if (!movie) throw new NotFoundError("Movie not found")

    return movie
  })
  .patch(
    "/movies/:id",
    async ({ store: { db }, params: { id }, body }) => {
      const movie = await db.movie.findUnique({ where: { id: Number(id) } })
      if (!movie) throw new NotFoundError("Movie not found")

      return db.movie.update({ where: { id: Number(id) }, data: body })
    },
    { body: movieUpdateSchema },
  )
  .delete("/movies/:id", async ({ store: { db }, params: { id } }) => {
    const deleted = await db.movie
      .delete({ where: { id: Number(id) } })
      .then(Boolean)
      .catch(() => false)

    if (!deleted) throw new NotFoundError("Movie not found")
    return "Movie successfully deleted"
  })

export default movieController

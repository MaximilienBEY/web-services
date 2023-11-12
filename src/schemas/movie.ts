import { t } from "elysia"

export const movieCreateSchema = t.Object({
  title: t.String({ maxLength: 128 }),
  description: t.String({ maxLength: 2048 }),
  releaseAt: t
    .Transform(t.String({ format: "date", default: new Date() }))
    .Decode(value => new Date(value))
    .Encode(value => value.toISOString()),
  rating: t.Nullable(t.Number({ min: 0, max: 5 })),
})

export const movieUpdateSchema = t.Partial(movieCreateSchema)

export const movieSchema = t.Object({
  id: t.Number(),
  title: t.String(),
  description: t.String(),
  releaseAt: t.Date(),
  rating: t.Nullable(t.Number()),
})

import swagger from "@elysiajs/swagger"
import { Elysia } from "elysia"

import controllersPlugin from "./controller"

new Elysia()
  .use(swagger())
  .use(controllersPlugin)
  .onStart(() => {
    console.log(
      "Server started at http://localhost:8888\nSwagger at http://localhost:8888/swagger",
    )
  })
  .listen(8888)

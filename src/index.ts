import swagger from "@elysiajs/swagger"
import { Elysia } from "elysia"
import { toXML, XmlElement } from "jstoxml"

import controllersPlugin from "./controller"

new Elysia()
  .use(swagger())
  .onAfterHandle(({ request, response, set }) => {
    if (request.headers.get("accept") === "application/xml") {
      set.headers = {
        "Content-Type": "application/xml",
      }
      return toXML(response as XmlElement)
    }
  })
  .use(controllersPlugin)
  .onStart(() => {
    console.log(
      "Server started at http://localhost:8888\nSwagger at http://localhost:8888/swagger",
    )
  })
  .listen(8888)

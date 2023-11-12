import Elysia from "elysia"

import movieController from "./movie"

const controllersPlugin = new Elysia().use(movieController)

export default controllersPlugin

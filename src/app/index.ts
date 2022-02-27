import Koa from "koa"
import bodyParser from "koa-bodyparser"

import { errorHandler } from "./error.handler"
import { useRoutes } from "../router"

const app = new Koa()

// register middleware（in order）
app.use(bodyParser())
useRoutes(app)

// listener
app.on("error", errorHandler)

export default app

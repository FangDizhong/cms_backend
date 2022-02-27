import Koa from "koa"
import bodyParser from "koa-bodyparser"

import userRouter from "../router/user.router"
import { errorHandler } from "./error.handler"

const app = new Koa()

// register middleware（in order）
app.use(bodyParser())
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

// listener
app.on("error", errorHandler)

export default app

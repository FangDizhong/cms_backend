import Router from "koa-router"
import userController from "../controller/user.controller"
import { verifyUser, handlePassword } from "../middleware/user.middleware"

const userRouter = new Router({ prefix: "/users" })

// http request with a bunch of middlewares
userRouter.post("/", verifyUser, handlePassword, userController.create)

export default userRouter

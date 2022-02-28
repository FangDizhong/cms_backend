import Router from "koa-router"
import userController from "../controller/user.controller"
import { verifyUser, handlePassword } from "../middleware/user.middleware"

const userRouter = new Router({ prefix: "/user" })

// http request with a bunch of middlewares
userRouter.post("/", verifyUser, handlePassword, userController.create)

export = userRouter
// dynamic import in this case:
// import(`./${fileName}`).then((router) => {}).catch((err) => {})
/**{
  ...
  default: Router {
    opts: {},
    methods: [
      'HEAD',   'OPTIONS',
      'GET',    'PUT',
      'PATCH',  'POST',
      'DELETE'
    ],
    params: {},
    stack: [ [Layer] ]
  }
}**/

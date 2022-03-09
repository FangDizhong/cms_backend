import Router from "koa-router"
import { verifyToken, verifyAuth } from "../middleware/auth.middleware"
import momentController from "../controller/moment.controller"

const momentRouter = new Router({ prefix: "/moment" })

// http request with a bunch of middlewares
momentRouter.post("/", verifyToken, momentController.create)
momentRouter.get("/", momentController.getMoments)
momentRouter.get("/:momentID", momentController.getDetail)
momentRouter.patch(
  "/:momentID",
  verifyToken,
  verifyAuth,
  momentController.updateMoment
)
momentRouter.delete(
  "/:momentID",
  verifyToken,
  verifyAuth,
  momentController.deleteMoment
)

export = momentRouter

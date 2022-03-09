import Router from "koa-router"
import labelController from "../controller/label.controller"
import { verifyAuth, verifyToken } from "../middleware/auth.middleware"
import {
  verifyLabelExists,
  verifyEveryLabelExists
} from "../middleware/label.middleware"

const labelRouter = new Router()

labelRouter.post(
  "/label",
  verifyToken,
  verifyLabelExists,
  labelController.create
)

// labels for moment API
labelRouter.post(
  "/moment/:momentID/labels",
  verifyToken,
  verifyAuth,
  verifyEveryLabelExists,
  labelController.addLabelsForMoment
)
labelRouter.get("/moment/:momentID/labels", labelController.getLabelsForMoment)

export = labelRouter

import { Context, Next } from "koa"
import labelService from "../service/label.service"

class LabelController {
  async create(ctx: Context, next: Next) {
    const labelName = ctx.request.body.label

    const result = await labelService.create(labelName)
    ctx.body = result
  }

  async addLabelsForMoment(ctx: Context, next: Next) {
    const { momentID } = ctx.params
    const labels = ctx.request.body.labels

    const newLabelsForMoment = []

    // if label_moment NOT exists, create one
    for (let label of labels) {
      const labelMomentResult = (await labelService.getLabelForMomentByID(
        momentID,
        label.id
      )) as any[]
      if (!labelMomentResult.length) {
        const result = await labelService.addLabelForMoment(momentID, label.id)
        newLabelsForMoment.push(result)
      }
    }
    ctx.body = { newLabelsForMoment }
  }

  async getLabelsForMoment(ctx: Context, next: Next) {
    const { momentID } = ctx.params
    const result = await labelService.getLabelsByMomentID(momentID)
    ctx.body = result
  }
}
export = new LabelController()

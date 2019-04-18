import { JsonController, Get, Put, Param, Body, NotFoundError, Authorized } from 'routing-controllers'
import Progress from '../progress/entity';

@JsonController()
export default class ProgressController {

  @Get("/ideas/:id/progress")
  getAll(@Param("id") id: number,
  ) {
    return Progress.find({ where: { idea: id } });
  }

  @Authorized()
  @Put("/ideas/:id/progress")
  async put(@Param("id") id: number,
    @Body() update: Partial<Progress>
  ) {
    const progress = await Progress.findOne({ where: { idea: id } })
    if (!progress) throw new NotFoundError('Cannot find idea status')
    return Progress.merge(progress, update).save();
  }
}

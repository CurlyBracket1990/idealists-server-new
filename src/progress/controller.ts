import { JsonController, Get, Post, Put, Param, Body, NotFoundError, HttpCode } from 'routing-controllers'
import Group from './entity'
import Progress from '../progress/entity';
import Idea from '../ideas/entity';

@JsonController()
export default class ProgressController {

  @Get("/ideas/:id/status")
  getAll(@Param("id") id: number,
  ) {
    return Progress.find({ where: { idea: id } });
  }

  @Post("/ideas/:id/status")
  @HttpCode(201)
  post(
    @Param("id") id: Idea,
    @Body() status: Progress
  ) {
    const { idea, ...rest } = status
    const entity = Progress.create(rest)
    entity.idea = id
    return entity.save()
  }

  @Put("/ideas/:id/status")
  async put(@Param("id") id: number,
    @Body() update: Partial<Progress>
  ) {
    const group = await Progress.findOne({where: {idea:id}})
    if (!group) throw new NotFoundError('Cannot find idea status')

    return Group.merge(group, update).save();
  }

  // @Delete("/groups/:id")
  // remove(@Param("id") id: number) {
  //   return Group.delete(id);
  // }
}

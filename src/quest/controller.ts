import { JsonController, Get, Post, Put, Delete, Param, Body, NotFoundError } from 'routing-controllers'
import Quest from './entity';

@JsonController()
export default class QuestController {

  @Get("/quest")
  getAll() {
    return Quest.find();
  }

  @Get("/quest/:id")
  getOne(
    @Param("id") id: number
  ) {
    return Quest.findOne(id);
  }

  @Post("/quest")
  post(
    @Body() quest: Quest
  ) {
    return quest.save();
  }

  @Put("/quest/:id")
  async put(@Param("id") id: number,
    @Body() update: Partial<Quest>
  ) {
    const quest = await Quest.findOne(id)
    if (!quest) throw new NotFoundError('Cannot find questionaire')

    return Quest.merge(quest, update).save();
  }

  @Delete("/quest/:id")
  remove(@Param("id") id: number) {
    return Quest.delete(id);
  }
}

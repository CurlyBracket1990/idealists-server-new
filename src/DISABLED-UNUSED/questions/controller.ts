import { JsonController, Get, Post, Put, Delete, Param, Body, NotFoundError, HttpCode } from 'routing-controllers'
import Question from './entity'
import Group from '../groups/entity';

@JsonController()
export default class QuestionController {

  @Get("/groups/:id/questions")
  getAll(
    @Param("id") id: number
  ) {
    return Question.find({ where: { group: id } });
  }

  @Get("/questions/:id")
  getOne(
    @Param("id") id: number
  ) {
    return Question.findOne(id);
  }

  @Post("/groups/:groupId/questions")
  @HttpCode(201)
  post(
    // @CurrentUser({ required: true }) userId: User, // Gets id of authorized user and adds it to event.user
    @Param("groupId") groupId: Group,
    @Body() question: Question
  ) {
    const { group, ...rest } = question
    const entity = Question.create(rest)
    // entity.user = 1 // userId
    entity.group = groupId
    return entity.save()
  }

  @Put("/questions/:id")
  async put(@Param("id") id: number,
    @Body() update: Partial<Question>
  ) {
    const question = await Question.findOne(id)
    if (!question) throw new NotFoundError('Cannot find page')

    return Question.merge(question, update).save();
  }

  @Delete("/questions/:id")
  remove(@Param("id") id: number) {
    return Question.delete(id);
  }
}

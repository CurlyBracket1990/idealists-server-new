import { JsonController, Get, Post, Put, Delete, Param, Body, NotFoundError, HttpCode, CurrentUser, } from 'routing-controllers'
import Idea from './entity'
import User from '../users/entity'
import { getRepository } from 'typeorm';
// import apiCheck from '../api/apiCheck';

@JsonController()
export default class IdeaController {

  @Get("/ideas")
  async getAll(
    @CurrentUser({ required: true }) userId: User
  ) {
    const usr = await User.findOne(userId)

    if (!usr) throw new NotFoundError('Cannot find user')
    if (usr.role === 'expert') {
      const idee = await getRepository(Idea)
        .createQueryBuilder('idea')
        .where(`idea.idea::json#>>'{2, answers, 1, qAnswer, value}' LIKE '${usr.industry}'`)
        .getMany()
      return idee
    }
    if (usr.role === 'admin') {
      return Idea.find();
    }
    return Idea.find({ where: { user: userId } });
    // Ideas will be public or private in the future for public to evaluate/comment
  }

  // @Get("/ideas/:id/description")
  // async getIt(
  //   @Param("id") id: number
  // ) {
  //   let idea = await Idea.findOne(id);
  //   apiCheck(idea)
  //   return 'Doing API Check!'
  // }

  @Get("/ideas/:id")
  getOne(
    @Param("id") id: number
  ) {
    return Idea.findOne(id);
  }

  @Post("/ideas")
  @HttpCode(201)
  post(
    @CurrentUser({ required: true }) userId: User, // Gets id of authorized user and adds it to event.user
    @Body() idea: Idea
  ) {
    const { user, ...rest } = idea
    const entity = Idea.create(rest)
    entity.user = userId
    return entity.save()
  }

  @Put("/ideas/:id")
  async put(@Param("id") id: number,
    @Body() update: Partial<Idea>
  ) {
    const idea = await Idea.findOne(id)
    if (!idea) throw new NotFoundError('Cannot find page')
    return Idea.merge(idea, update).save();
  }

  @Delete("/ideas/:id")
  remove(@Param("id") id: number) {
    return Idea.delete(id);
  }
}

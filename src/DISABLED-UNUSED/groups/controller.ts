import { JsonController, Get, Post, Put, Delete, Param, Body, NotFoundError, HttpCode } from 'routing-controllers'
import Group from './entity'
import Survey from '../surveys/entity';

@JsonController()
export default class GroupController {

  @Get("/surveys/:surveyId/groups")
  getAll(@Param("surveyId") surveyId: number,
  ) {
    return Group.find({ where: { survey: surveyId } });
  }

  @Get("groups/:id")
  getOne(
    @Param("id") id: number
  ) {
    return Group.findOne(id);
  }

  @Post("/surveys/:surveyId/groups")
  @HttpCode(201)
  post(
    // @CurrentUser({ required: true }) userId: User, // Gets id of authorized user and adds it to event.user
    @Param("surveyId") surveyId: Survey,
    @Body() group: Group
  ) {
    const { survey, ...rest } = group
    const entity = Group.create(rest)
    // entity.user = 1 // userId
    entity.survey = surveyId
    return entity.save()
  }

  @Put("/groups/:id")
  async put(@Param("id") id: number,
    @Body() update: Partial<Group>
  ) {
    const group = await Group.findOne(id)
    if (!group) throw new NotFoundError('Cannot find survey')

    return Group.merge(group, update).save();
  }

  @Delete("/groups/:id")
  remove(@Param("id") id: number) {
    return Group.delete(id);
  }
}

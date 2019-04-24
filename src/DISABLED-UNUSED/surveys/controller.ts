import { JsonController, Get, Post, Put, Delete, Param, Body, NotFoundError } from 'routing-controllers'
import Survey from './entity'

@JsonController()
export default class SurveyController {

  @Get("/surveys")
  getAll() {
    return Survey.find();
  }

  @Get("/surveys/:id")
  getOne(
    @Param("id") id: number
  ) {
    return Survey.findOne(id);
  }

  @Post("/surveys")
  post(
    @Body() survey: Survey
  ) {
    return Survey.insert(survey);
  }

  @Put("/surveys/:id")
  async put(@Param("id") id: number,
    @Body() update: Partial<Survey>
  ) {
    const survey = await Survey.findOne(id)
    if (!survey) throw new NotFoundError('Cannot find survey')

    return Survey.merge(survey, update);
  }

  @Delete("/surveys/:id")
  remove(@Param("id") id: number) {
    return Survey.delete(id);
  }
}

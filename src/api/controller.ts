import { JsonController, Get, Param, Delete, } from 'routing-controllers'
import AutoMatch from './entity'
// import Idea from '../ideas/entity';
// import User from '../users/entity'



@JsonController()
export default class AutoMatchController {

  @Get("/automatch")
  getAll() {
    return AutoMatch.find();
  }

  @Get("/automatch/:id")
  getOne(
    @Param("id") id: number
  ) {
    return AutoMatch.findOne(id);
  }

  // @Post("/automatch")
  // save(
  //   // @CurrentUser
  //   @Body() atm: AutoMatch
  // ) {
  //   const { idea, ...rest } = atm
  //   const entity = AutoMatch.create(rest)
  //   return entity.save()
  // }

  @Delete("/automatch/:id")
  remove(@Param("id") id: number) {
    return AutoMatch.delete(id);
  }
}


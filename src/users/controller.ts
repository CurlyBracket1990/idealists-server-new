import { JsonController, Get, Post, Put, Delete, Param, Body, NotFoundError, Authorized, CurrentUser } from 'routing-controllers'
import User from './entity'

@JsonController()
export default class UserController {

  @Get("/users")
  getAll() {
    return User.find();
  }

  @Get("/users/:id")
  getOne(
    @Param("id") id: number
  ) {
    return User.findOne(id);
  }

  @Authorized()
  @Get("/current")
  getCurrent(
    @CurrentUser({ required: true }) userId: User, // Gets id of authorized user
  ) {
    return User.findOne(userId);
  }

  @Post('/users')
  async createUser(
    @Body() user: User
  ) {
    const { password, ...rest } = user
    const entity = User.create(rest)
    await entity.setPassword(password)
    return entity.save()
  }

  @Put("/users")
  async put(
    // @Param("id") id: number,
    @CurrentUser({ required: true }) id: User, // Gets id of authorized user
    @Body() update: Partial<User>
  ) {
    const user = await User.findOne(id)
    if (!user) throw new NotFoundError('Cannot find page')

    return User.merge(user, update).save();
  }

  @Delete("/users/:id")
  remove(@Param("id") id: number) {
    return User.delete(id);
  }
}

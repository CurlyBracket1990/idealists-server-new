import { JsonController, Get, Post, Put, Delete, Param, Body, NotFoundError, Authorized, CurrentUser, HttpError } from 'routing-controllers'
import User from './entity'

@JsonController()
export default class UserController {

  @Authorized()
  @Get("/users")
  getAll() {
    return User.find();
  }

  @Authorized()
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
    if (await User.findOne({ email: user.email })) throw new HttpError(409, 'User with this email already exists')
    else {
      const { password, ...rest } = user
      const entity = User.create(rest)
      await entity.setPassword(password)
      return entity.save()
    }
  }

  @Authorized()
  @Put("/users")
  async put(
    @CurrentUser({ required: true }) userId: User, // Gets id of authorized user
    @Body() update: Partial<User>
  ) {
    const user = await User.findOne(userId)
    if (!user) throw new NotFoundError('Cannot find user')

    User.merge(user, update).save();
    if (update.password) await user.setPassword(update.password)
    return user.save();
  }

  @Authorized()
  @Delete("/users/:id")
  remove(@Param("id") id: number) {
    return User.delete(id);
  }
}

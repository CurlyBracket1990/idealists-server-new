import "reflect-metadata"; // this shim is required
import { createExpressServer, Action } from "routing-controllers";
import setupDb from './db'
import { verify } from './auth/jwt'
// import { CronJob } from 'cron'
import UserController from './users/controller'
import LoginController from "./auth/login";
import ResetPasswordController from "./auth/resetpass";
import IdeaController from "./ideas/controller";
import AutoMatchController from "./api/controller";
import ProgressController from "./progress/controller";
import QuestController from "./quest/controller";

const port = process.env.PORT || 4000

const app = createExpressServer({
  cors: true,
  controllers: [
    UserController,
    LoginController,
    ResetPasswordController,
    IdeaController,
    AutoMatchController,
    ProgressController,
    QuestController,
  ],
  authorizationChecker: (action: Action) => {
    const header: string = action.request.headers.authorization

    if (header && header.startsWith('Bearer ')) {
      const [, token] = header.split(' ')
      return !!(token && verify(token))
    }
    return false
  },
  // Return id of the user based on the header token
  currentUserChecker: async (action: Action) => {
    const header: string = action.request.headers.authorization
    if (header && header.startsWith('Bearer ')) {
      const [, token] = header.split(' ')
      return verify(token).data.id
    }
    return false
  },
});


// Timer for later implementation
// const job = new CronJob('0 */30 * * * *', function () {
  const d = new Date();
  console.log('Time:', d);
// });
// job.start();

setupDb()
  .then(_ =>
    app.listen(port, () => console.log(`Listening on port ${port}`))
  )
  .catch(err => console.error(err))



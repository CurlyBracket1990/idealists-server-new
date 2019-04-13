import "reflect-metadata"; // this shim is required
import { createExpressServer, Action } from "routing-controllers";
import setupDb from './db'
import { verify } from './auth/jwt'
// import { CronJob } from 'cron'
import UserController from './users/controller'
import LoginController from "./auth/login";
import ResetPasswordController from "./auth/resetpass";
import SurveyController from "./surveys/controller";
import GroupController from "./groups/controller";
import QuestionController from "./questions/controller";
import IdeaController from "./ideas/controller";
import UploadController from "./files/controller";
import QuestController from "./quest/controller";
import AutoMatchController from "./api/controller";
require('dotenv').config()
console.log('DOT___ENV___PORT!!!',process.env.PORT)

const port = process.env.PORT || 4000

const app = createExpressServer({
  cors: true,
  controllers: [
    UserController,
    LoginController,
    ResetPasswordController,
    SurveyController,
    GroupController,
    QuestionController,
    IdeaController,
    UploadController,
    QuestController,
    AutoMatchController,
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

// Timer
// const job = new CronJob('0 */30 * * * *', function () {
//   const d = new Date();
//   console.log('Every 30 mins:', d);
// });
// job.start();

setupDb()
  .then(_ =>
    app.listen(port, () => console.log(`Listening on port ${port}`))
  )
  .catch(err => console.error(err))



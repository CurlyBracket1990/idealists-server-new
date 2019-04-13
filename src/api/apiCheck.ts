import AutoMatch from "./entity";
import Idea from "../ideas/entity";
import { NotFoundError } from "routing-controllers";
import User from "../users/entity";

const request = require('superagent');

export default async function apiCheck(object) {
  // Find an idea
  let idea = await Idea.findOne(object.id).catch(err => console.log(err))
  if (!idea) throw new NotFoundError('Cannot find idea')

  // Find the user
  const usr = await User.findOne(idea.user).catch(err => console.log(err))
  if (!usr) throw new NotFoundError('Cannot find user')

  // Extract relevant text from the idea
  let idd = idea.idea[4].answers[0].qAnswer

  // Create new Automatch assign idea and user to it
  const entry = new AutoMatch
  entry.idea = object.id
  entry.user = usr

  // Prepare JSON for AutoMatch
  const json = {
    "query": idd,
    "requested-hits": "10",
    "view": "bibliographic,passage" // important 
  }
  // console.log('MY JSOOOOONNN!!!', json)
  // console.log('MY USEERR!!!', entry.user.id)
  request
    .post('https://api.auto-match.se/v2.1/search')
    .set(`Authorization=${process.env.AUTOMATCH_AUTH}`)
    .set(`reference-number=${entry.user.id}`)
    .set('Content-Type', 'application/json')
    .send(json)
    .then(response => {
      entry.ticket = response.body.data
    }
      // entry.autoMatch = response.body.data['automatch-results']['index-1']
    )
    // .then(rsp => console.log('Response from saving', rsp))
    .catch(error => console.log(error))

  await entry.save()
  const update = { autoMatch: entry }
  await Idea.merge(idea, update).save()

}
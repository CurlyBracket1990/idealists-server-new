import AutoMatch from "./entity";
// require('dotenv').config()
// import Idea from "../ideas/entity";
// import { NotFoundError } from "routing-controllers";
// import User from "../users/entity";

const request = require('superagent');
const atmkey = process.env.AUTOMATCH_AUTH

export default async function apiCheck(object) {
  // Find an idea
  // const idea = await Idea.findOne(object.id).catch(err => console.log(err))
  // if (!idea) throw new NotFoundError('Cannot find idea')

  // Find the user
  // const usr = await User.findOne(idea.user.id).catch(err => console.log(err))
  // if (!usr) throw new NotFoundError('Cannot find user')

  // Extract relevant text from the idea
  const idee = object.idea
  let idd = idee[4].answers[0].qAnswer

  // Create new Automatch assign idea and user to it
  const entry = new AutoMatch()
  // entry.idea = idea
  // entry.user = usr
  entry.idea = object
  entry.user = object.user

  // Prepare JSON for AutoMatch
  const json = {
    "query": idd,
    "requested-hits": "10",
    "view": "bibliographic,passage,pdf"
  }

  request
    .post('https://api.auto-match.se/v2.1/search')
    .set('Authorization', atmkey)
    .set('reference-number', object.user)
    .set('Content-Type', 'application/json')
    .send(json)
    .then(response => {
      entry.ticket = response.body.data
      return entry.save()
    })
    .then(atm => getResults(atm))  // getResults waits 60 seconds and retrieves & saves results
    .catch(error => console.log(error))
}

async function getResults(atm) {
  setTimeout(
    () => {
      request
        .get(`https://api.auto-match.se/v2.1/search?ticket=${atm.ticket}`)
        .set('Authorization', atmkey)
        .then(response => {
          const patents = { autoMatch: response.body.data } // response.body.data['automatch-results']['index-1'] }
          return AutoMatch.merge(atm, patents).save()
        })
        .catch(error => console.log(error))
    },
    1000 * 60 // Wait 1 minute for automatch to calculate results
  )
}
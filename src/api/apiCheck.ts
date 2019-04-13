import AutoMatch from "./entity";
// import Idea from "../ideas/entity";
// import { NotFoundError } from "routing-controllers";
// import User from "../users/entity";


const request = require('superagent');
const atmkey = process.env.AUTOMATCH_AUTH

export default async function apiCheck(object) {
  // Find an idea
  // let idea = await Idea.findOne(object.id).catch(err => console.log(err))
  // if (!idea) throw new NotFoundError('Cannot find idea')

  // console.log('MY IDEA!!!', idea.user)
  // Find the user
  // const usr = await User.findOne({ where: idea.user }).catch(err => console.log(err))
  // if (!usr) throw new NotFoundError('Cannot find user')

  // Extract relevant text from the idea
  // let idd = idea.idea[4].answers[0].qAnswer

  // Create new Automatch assign idea and user to it
  const entry = new AutoMatch
  // entry.idea = object.id
  // entry.user = usr

  // Prepare JSON for AutoMatch
  const json = {
    "query": "Technology which enables a trackpad or touchscreen to recognize more than one or more than two points of contact with the display.",// idd,
    "requested-hits": "10",
    "view": "bibliographic,passage" // important 
  }
  console.log('MY JSOOOOONNN!!!', json)
  // console.log('MY USR.ID!!!', usr.id)
  // console.log('MY USR!!!', usr)
  console.log('MY OBJECT!!!', object)
  request
    .get('https://api.auto-match.se/v2.1/index')
    // .post('https://api.auto-match.se/v2.1/search')
    .set('Authorization', atmkey)

    // .set(`reference-number:${entry.user.id}`)
    // .set('Content-Type', 'application/json')
    // .send(json)
    .then(response => {
      entry.autoMatch = response.body.data
      return entry.save()
    }
      // entry.autoMatch = response.body.data['automatch-results']['index-1']
    )
    .then(rsp => console.log('Response from saving', rsp))
    .catch(error => console.log(error))

  // const update = { autoMatch: entry }
  // await Idea.merge(idea, update).save()

}
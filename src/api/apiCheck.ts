import AutoMatch from "./entity";
import Idea from "../ideas/entity";
import { NotFoundError } from "routing-controllers";
import User from "../users/entity";
require('dotenv').config()


const request = require('superagent');
const atmkey = process.env.AUTOMATCH_AUTH
console.log(atmkey)

// let myTicket;

export default async function apiCheck(object) {
  // Find an idea
  const idea = await Idea.findOne(object.id).catch(err => console.log(err))
  if (!idea) throw new NotFoundError('Cannot find idea')

  // console.log('MY USERR!!!', idea.user)
  // Find the user
  const usr = await User.findOne(idea.user.id).catch(err => console.log(err))
  if (!usr) throw new NotFoundError('Cannot find user')

  // Extract relevant text from the idea
  // let idd = idea.idea[4].answers[0].qAnswer

  // Create new Automatch assign idea and user to it
  const entry = new AutoMatch
  entry.idea = idea
  entry.user = usr



  // Prepare JSON for AutoMatch
  const json = {
    "query": "Technology which enables a trackpad or touchscreen to recognize more than one or more than two points of contact with the display.",
    "requested-hits": "10",
    "view": "bibliographic,passage"
  }
  console.log('MY JSOOOOONNN!!!', json)
  // console.log('MY USR.ID!!!', idd)
  // console.log('MY USR!!!', usr.id)
  request
    .get('https://www.google.com')
    // .get('https://api.auto-match.se/v2.1/index')
    // .post('https://api.auto-match.se/v2.1/search')
    // .set('Authorization', atmkey)
    // .set('reference-number', usr.id)
    // .set('Content-Type', 'application/json')
    // .send(json)
    .then(response => {
      console.log('GoogleRESPONSEbody??', response.body)
      entry.ticket = "158956472643eaf9bf994a9bf49f4838" // = response.body.data
      // myTicket = "158956472643eaf9bf994a9bf49f4838" // = response.body.data
      return entry.save()
    })
    .then(atm => getResults(atm))
    // .then(rsp => {
    //   const update = { autoMatch: rsp }
    //   return Idea.merge(idea, update).save()
    // })
    .catch(error => console.log(error))
}

async function getResults(atm) {
  setTimeout(
    () => {
      console.log('MYTICKEEETTT IN DELAAAYY', atm.ticket)
      request
        .get('https://www.google.com')

        // .get(`https://api.auto-match.se/v2.1/search?ticket=${atm.ticket}`)
        // .set('Authorization', atmkey)
        .then(response => {
          const patents = { autoMatch: response.body } // response.body.data['automatch-results']['index-1'] }
          return AutoMatch.merge(atm, patents).save()
          // entry.autoMatch = response.body.data['automatch-results']['index-1']
          // console.log('MY MASSIVE RESPONSE', response.body.data['automatch-results']['index-1'])
        })
        .catch(error => console.log(error))

    },
    1000 * 5 // Wait 1 minute for automatch to calculate results
  )
}
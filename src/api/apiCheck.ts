import AutoMatch from "./entity";
import Idea from "../ideas/entity";

const request = require('superagent');

export default async function apiCheck(object) {
  let idea = await Idea.findOne(object.id)
  let idd = idea!.idea[4].answers[0].qAnswer

  const json = {
    "query": idd,
    "requested-hits": "10",
    "view": "bibliographic,passage" // important 
  }
  console.log('MY OBJECTSENTTTT!!!', json)
  const entry = new AutoMatch
  request
    .get('https://39631edd-e73e-426e-8ee5-524a923295b1.mock.pstmn.io/v2.1/search?ticket=495fdecd03dbec28ed86fa8cb40758ae')
    // .auth( ... ) // API key
    .send(json)
    .set('Content-Type', 'application/json')
    .then(response => {
      entry.autoMatch = response.body.data['automatch-results']['index-1']
      return entry.save()
    }
    )
    .then(rsp => console.log('Response from saving', rsp))
    .catch(error => console.log(error))

}
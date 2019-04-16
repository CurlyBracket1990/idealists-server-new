import Idea from "../ideas/entity";
import { NotFoundError } from "routing-controllers";

export default async function updateIdea(atm) {
  console.log('myOBJ', atm)
  const idee = await Idea.findOne(atm.idea).catch(err => console.log(err))
  if (!idee) throw new NotFoundError('Cannot find idea')

  const upd: Partial<Idea> = { autoMatch: atm }
  return Idea.merge(idee, upd).save()
}
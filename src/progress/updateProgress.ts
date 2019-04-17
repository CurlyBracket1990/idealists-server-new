import Progress from "./entity";

export function createEntry(idea) {
  console.log('MYTHISSSS', idea)
  const entry = new Progress()
  entry.idea = idea
  return entry.save()
}
import Progress from "./entity";

export function createEntry(idea) {
  const entry = new Progress()
  entry.idea = idea
  return entry.save()
}
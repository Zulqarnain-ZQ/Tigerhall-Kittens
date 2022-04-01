import { Tiger, TigerSighting } from '../db/models'

export function buildSightingFromTigetInput(
  inputData: Partial<TigerSighting>,
  tiger: Tiger
) {
  const sighting = new TigerSighting()

  sighting.createdAt = new Date()
  sighting.imageURL = inputData.imageURL || null
  sighting.lastSeenAt = inputData.lastSeenAt
  sighting.location = `(${inputData.location.lat}, ${inputData.location.lon})`
  sighting.updatedAt = new Date()
  sighting.tiger = tiger

  return sighting
}

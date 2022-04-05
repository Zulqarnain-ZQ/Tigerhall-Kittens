import { v4 } from 'uuid'
import { Tiger, TigerSighting } from '../db/models'

export function buildTiger() {
  const defaultTiger: Tiger = new Tiger()

  defaultTiger.createdAt = new Date()
  defaultTiger.dateOfBirth = new Date()
  defaultTiger.name = `Tiger ${v4()}`
  defaultTiger.updatedAt = new Date()
  defaultTiger.sightings = []

  const tigerSighting: TigerSighting = new TigerSighting()

  tigerSighting.createdAt = new Date()
  tigerSighting.imageURL = ''
  tigerSighting.lastSeenAt = new Date()
  tigerSighting.location = { lat: 172, lon: 12 }
  tigerSighting.updatedAt = new Date()
  tigerSighting.tiger = defaultTiger

  defaultTiger.sightings = [tigerSighting]

  return defaultTiger
}

import { Tiger } from '../db/models'

export function buildTiger(inputData: Partial<Tiger>) {
  const tiger = new Tiger()

  tiger.createdAt = new Date()
  tiger.dateOfBirth = inputData.dateOfBirth
  tiger.name = inputData.name
  tiger.updatedAt = new Date()

  return tiger
}

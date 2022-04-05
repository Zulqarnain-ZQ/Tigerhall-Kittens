import { getManager } from 'typeorm'

export async function removeTestTigers() {
  const manager = getManager()

  await manager.query(`TRUNCATE TABLE tiger_sightings, tigers;`)
}

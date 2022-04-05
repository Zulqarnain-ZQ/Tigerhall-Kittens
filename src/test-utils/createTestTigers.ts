import { getManager } from 'typeorm'
import { Tiger } from '../db/models'
import { buildTiger } from './buildTiger'

export async function createTestTigers() {
  const tiger1: Tiger = buildTiger()

  const tiger2: Tiger = buildTiger()

  const manager = getManager()

  await manager.save([tiger1, tiger2])
}

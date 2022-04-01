import { Arg, Mutation, Resolver } from 'type-graphql'
import { getManager } from 'typeorm'
import { Tiger } from '../db/models/Tiger'
import { CreateTigerInput } from '../graphql/inputs'
import { buildSightingFromTigetInput } from './buildSightingFromTigetInput'
import { buildTiger } from './buildTiger'

@Resolver((_type) => Tiger)
export class CreateTiger {
  @Mutation((_type) => Tiger)
  public async CreateTiger(
    @Arg('data') inputData: CreateTigerInput
  ): Promise<Tiger> {
    console.log(inputData)

    const manager = getManager()

    const tiger = buildTiger(inputData)
    const sighting = buildSightingFromTigetInput(inputData, tiger)

    tiger.sightings = [sighting]

    await manager.save([tiger, sighting])

    return tiger
  }
}

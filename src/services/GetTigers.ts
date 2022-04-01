import { Resolver, Query } from 'type-graphql'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { Tiger } from '../db/models/Tiger'
import { TigerRepository } from '../db/repositories'

@Resolver((_type) => Tiger)
export class GetTigers {
  constructor(
    @InjectRepository()
    private readonly tigerRepository: TigerRepository
  ) {}

  @Query((_type) => [Tiger])
  public async getTigers(): Promise<Tiger[]> {
    const tigers = await this.tigerRepository.find({
      relations: ['sightings'],
    })

    return tigers
  }
}

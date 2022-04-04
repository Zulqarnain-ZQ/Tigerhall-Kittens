import { Resolver, Query, Args } from 'type-graphql'
import { Service } from 'typedi'
import { TigerSighting } from '../../db/models'
import { Tiger } from '../../db/models/Tiger'
import { TigerSightingService } from '../../services/TigerSightingService'
import { SightingsArgs } from '../inputs'

@Service()
@Resolver((_type) => Tiger)
export class GetSightingsResolver {
  constructor(private readonly sightingService: TigerSightingService) {}

  @Query((_type) => [TigerSighting])
  public async getTigerSightings(
    @Args() args: SightingsArgs
  ): Promise<TigerSighting[]> {
    const sightings = await this.sightingService.getAll(args)

    return sightings
  }
}

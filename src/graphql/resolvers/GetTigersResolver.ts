import { Resolver, Query } from 'type-graphql'
import { Service } from 'typedi'
import { Tiger } from '../../db/models/Tiger'
import { TigerService } from '../../services/TigerService'

@Service()
@Resolver((_type) => Tiger)
export class GetTigersResolver {
  constructor(private readonly tigerService: TigerService) {}

  @Query((_type) => [Tiger])
  public async getTigers(): Promise<Tiger[]> {
    const tigers = await this.tigerService.getAll()

    return tigers
  }
}

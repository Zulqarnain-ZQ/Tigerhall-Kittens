import { Resolver, Query, Args } from 'type-graphql'
import { Service } from 'typedi'
import { Tiger } from '../../db/models/Tiger'
import { TigerService } from '../../services/TigerService'
import { ListArgs } from '../inputs'

@Service()
@Resolver((_type) => Tiger)
export class GetTigersResolver {
  constructor(private readonly tigerService: TigerService) {}

  @Query((_type) => [Tiger])
  public async getTigers(@Args() args: ListArgs): Promise<Tiger[]> {
    const tigers = await this.tigerService.getAll(args)

    return tigers
  }
}

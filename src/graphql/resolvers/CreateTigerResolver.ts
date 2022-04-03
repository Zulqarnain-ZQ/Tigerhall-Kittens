import { Arg, FieldResolver, Mutation, Resolver, Root } from 'type-graphql'
import { Service } from 'typedi'
import { Tiger } from '../../db/models/Tiger'
import { CreateTigerInput } from '../inputs'
import { TigerService } from '../../services/TigerService'
import { TigerSightingService } from '../../services/TigerSightingService'

@Service()
@Resolver((_type) => Tiger)
export class CreateTigerResolver {
  constructor(
    // constructor injection of a service
    private readonly tigerService: TigerService,
    private readonly sightingService: TigerSightingService
  ) {}

  /**
   * I have added custom field resolver for date of birth due to issues in javascript date types
   * FE passes date and it's stored as Date without any timestamp
   * On retrieving from DB, DOB has type has string
   */
  @FieldResolver()
  dateOfBirth(@Root() tiger: Tiger) {
    if (typeof tiger.dateOfBirth === 'string') {
      return tiger.dateOfBirth
    }

    return tiger.dateOfBirth.toISOString()
  }

  @Mutation((_type) => Tiger)
  public async createTiger(
    @Arg('data') inputData: CreateTigerInput
  ): Promise<Tiger> {
    console.log(inputData)

    const tiger = this.tigerService.buildTiger(inputData)
    const sighting = this.sightingService.buildSightingFromTigetInput(
      inputData,
      tiger
    )

    tiger.sightings = [sighting]

    await this.tigerService.createTiger(tiger)

    return tiger
  }
}

import { Service } from 'typedi'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { TigerSightingRepository } from '../db/repositories'
import { Tiger, TigerSighting } from '../db/models'
import { SightingsArgs } from '../graphql/inputs/SightingsArgs'
import { EntityManager, getManager } from 'typeorm'

@Service()
export class TigerSightingService {
  private readonly manager: EntityManager
  constructor(
    @InjectRepository()
    private readonly sightingRepository: TigerSightingRepository
  ) {
    this.manager = getManager()
  }

  async getAll({ skip, take, tigerId }: SightingsArgs) {
    const sightings = await this.sightingRepository.find({
      relations: ['tiger'],
      skip,
      take,
      where: { tigerId },
      order: { lastSeenAt: 'DESC' },
    })

    return sightings
  }

  buildSighting(inputData: Partial<TigerSighting>, tiger: Tiger) {
    const sighting = new TigerSighting()

    sighting.createdAt = new Date()
    sighting.imageURL = inputData.imageURL || null
    sighting.lastSeenAt = inputData.lastSeenAt
    sighting.location = inputData.location
    sighting.updatedAt = new Date()
    sighting.tiger = tiger

    return sighting
  }

  async createSighting(sighting: TigerSighting) {
    if (sighting.tiger.dateOfBirth > sighting.lastSeenAt)
      throw new Error('Tiger date of brith should be less than last seen at')

    return await this.manager.save(sighting)
  }
}

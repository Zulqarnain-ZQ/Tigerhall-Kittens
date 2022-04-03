import { Service } from 'typedi'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { TigerSightingRepository } from '../db/repositories'
import { Tiger, TigerSighting } from '../db/models'
import { SightingsArgs } from '../graphql/inputs/SightingsArgs'

@Service()
export class TigerSightingService {
  constructor(
    @InjectRepository()
    private readonly sightingRepository: TigerSightingRepository
  ) {}

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

  buildSightingFromTigetInput(inputData: Partial<TigerSighting>, tiger: Tiger) {
    const sighting = new TigerSighting()

    sighting.createdAt = new Date()
    sighting.imageURL = inputData.imageURL || null
    sighting.lastSeenAt = inputData.lastSeenAt
    sighting.location = inputData.location
    sighting.updatedAt = new Date()
    sighting.tiger = tiger

    return sighting
  }
}

import { Service } from 'typedi'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { TigerSightingRepository } from '../db/repositories'
import { Tiger, TigerSighting } from '../db/models'

@Service()
export class TigerSightingService {
  constructor(
    @InjectRepository()
    private readonly sightingRepository: TigerSightingRepository
  ) {}

  async getAll() {
    const sightings = await this.sightingRepository.find({
      relations: ['tiger'],
    })

    return sightings
  }

  async getOne(id: number) {
    const sighting = await this.sightingRepository.find({
      relations: ['tiger'],
      where: { id },
    })

    return sighting
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

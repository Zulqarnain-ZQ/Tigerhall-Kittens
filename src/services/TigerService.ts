import { Service } from 'typedi'
import { EntityManager, getManager } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { TigerRepository } from '../db/repositories'
import { Tiger } from '../db/models'

@Service()
export class TigerService {
  private readonly manager: EntityManager
  constructor(
    @InjectRepository()
    private readonly tigerRepository: TigerRepository
  ) {
    this.manager = getManager()
  }

  async getAll() {
    const tigers = await this.tigerRepository.find({
      relations: ['sightings'],
    })

    return tigers
  }

  async getOne(id: number) {
    const tiger = await this.tigerRepository.find({
      relations: ['sightings'],
      where: { id },
    })

    return tiger
  }

  buildTiger(inputData: Partial<Tiger>) {
    const tiger = new Tiger()

    tiger.createdAt = new Date()
    tiger.dateOfBirth = inputData.dateOfBirth
    tiger.name = inputData.name
    tiger.updatedAt = new Date()

    return tiger
  }

  async createTiger(tiger: Tiger) {
    this.validateTigerCreationInput(tiger)

    this.manager.save(tiger)
  }

  private validateTigerCreationInput(tiger: Tiger) {
    const sighting = tiger.sightings[0]

    if (!sighting) throw new Error('Tiger must have one sighting')

    if (tiger.dateOfBirth > sighting.lastSeenAt)
      throw new Error('Tiger date of brith should be less than last seen at')

    return true
  }
}

import { Arg, Mutation, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { TigerSighting } from '../../db/models/TigerSighting'
import { CreateSightingInput } from '../inputs'
import { TigerService } from '../../services/TigerService'
import { TigerSightingService } from '../../services/TigerSightingService'
import { FileService } from '../../services/FileService'
import { Upload } from '../../types/Upload'

@Service()
@Resolver((_type) => TigerSighting)
export class CreateSightingResolver {
  constructor(
    // constructor injection of a service
    private readonly tigerService: TigerService,
    private readonly sightingService: TigerSightingService,
    private readonly fileService: FileService
  ) {}

  @Mutation((_type) => TigerSighting)
  public async createSighting(
    @Arg('data') inputData: CreateSightingInput
  ): Promise<TigerSighting> {
    const tiger = await this.tigerService.getOne(inputData.tigerId)

    if (!tiger) throw new Error('Invalid tiger id')

    /** Converting to user defined type because destructuring does not give correct type */
    const upload: Upload = await inputData.file

    if (!this.fileService.isValidImage(upload))
      throw new Error('Unknown image format')

    const path = await this.fileService.storeImage(upload)

    const sighting = this.sightingService.buildSighting(
      { ...inputData, imageURL: path },
      tiger
    )

    return await this.sightingService.createSighting(sighting)
  }
}

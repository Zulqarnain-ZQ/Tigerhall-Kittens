import { EntityRepository, Repository } from 'typeorm'
import { TigerSighting } from '../models/TigerSighting'

@EntityRepository(TigerSighting)
export class TigerSightingRepository extends Repository<TigerSighting> {}

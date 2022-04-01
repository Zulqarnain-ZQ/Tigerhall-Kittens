import { EntityRepository, Repository } from 'typeorm'
import { Tiger } from '../models/Tiger'

@EntityRepository(Tiger)
export class TigerRepository extends Repository<Tiger> {}

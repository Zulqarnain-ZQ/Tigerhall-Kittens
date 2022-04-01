import { Field, InputType } from 'type-graphql'
import { Tiger } from '../../db/models'
import { PointType } from './PointType'

@InputType()
export class CreateTigerInput implements Partial<Tiger> {
  @Field()
  public name!: string

  @Field()
  public dateOfBirth!: Date

  @Field()
  public lastSeenAt!: Date

  @Field()
  public location!: PointType
}

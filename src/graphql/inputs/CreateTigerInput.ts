import { Field, InputType } from 'type-graphql'
import { Tiger } from '../../db/models'
import { PointType } from './PointType'
import { MaxLength } from 'class-validator'

@InputType()
export class CreateTigerInput implements Partial<Tiger> {
  @Field()
  @MaxLength(100)
  public name!: string

  @Field()
  public dateOfBirth!: Date

  @Field()
  public lastSeenAt!: Date

  @Field()
  public location!: PointType
}

import { Field, InputType } from 'type-graphql'
import { TigerSighting } from '../../db/models'
import { PointType } from './PointType'
import { Min } from 'class-validator'
import { GraphQLUpload } from 'graphql-upload'

@InputType()
export class CreateSightingInput implements Partial<TigerSighting> {
  @Field()
  @Min(1)
  public tigerId!: number

  @Field()
  public lastSeenAt!: Date

  @Field()
  public location!: PointType

  @Field((_type) => GraphQLUpload)
  public file!: GraphQLUpload
}

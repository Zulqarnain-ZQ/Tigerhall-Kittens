import { Field, InputType, Float } from 'type-graphql'

@InputType()
export class PointType {
  @Field((_type) => Float)
  public lat!: number

  @Field((_type) => Float)
  public lon!: number
}

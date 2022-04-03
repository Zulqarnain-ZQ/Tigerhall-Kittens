import { IsInt, Max, Min } from 'class-validator'
import { Field, InputType, Float } from 'type-graphql'

@InputType()
export class PointType {
  @IsInt()
  @Min(-90)
  @Max(90)
  @Field((_type) => Float)
  public lat!: number

  @IsInt()
  @Min(-180)
  @Max(180)
  @Field((_type) => Float)
  public lon!: number
}

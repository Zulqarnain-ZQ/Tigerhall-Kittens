import { Max, Min } from 'class-validator'
import { ArgsType, Field, Int } from 'type-graphql'

@ArgsType()
export class ListArgs {
  @Field((_type) => Int)
  @Min(0)
  skip: number = 0

  @Field((_type) => Int)
  @Min(1)
  @Max(50)
  take: number = 25
}

import { Min } from 'class-validator'
import { ArgsType, Field, Int } from 'type-graphql'
import { ListArgs } from './ListArgs'

@ArgsType()
export class SightingsArgs extends ListArgs {
  @Field((_type) => Int)
  @Min(1)
  tigerId: number
}

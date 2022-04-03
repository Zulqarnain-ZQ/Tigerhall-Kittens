import { buildSchema } from 'type-graphql'
import { CreateTigerResolver } from '../resolvers/CreateTigerResolver'
import { GetTigersResolver } from '../resolvers/GetTigersResolver'
import { GetSightingsResolver } from '../resolvers/GetSightingsResolver'

export default (Container: any) => {
  return buildSchema({
    container: Container,
    resolvers: [CreateTigerResolver, GetTigersResolver, GetSightingsResolver],
  })
}

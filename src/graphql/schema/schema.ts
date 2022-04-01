import { buildSchema } from 'type-graphql'
import { CreateTiger } from '../../services/CreateTiger'
import { GetTigers } from '../../services/GetTigers'

export default (Container: any) => {
  return buildSchema({
    container: Container,
    resolvers: [CreateTiger, GetTigers],
  })
}

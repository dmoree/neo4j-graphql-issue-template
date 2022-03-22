import { graphqlHTTP, Options } from 'express-graphql'
import { driver } from '@issue/neo4j/database'
import { ogm, neo4jGraphQL } from '@issue/neo4j/graphql'

export type ExpressGraphQLContext = {
  req: Parameters<Extract<Options, Function>>[0]
  ogm: typeof ogm
  driver: typeof driver
}

export default graphqlHTTP(async (req) => {
  const schema = await neo4jGraphQL.getSchema()
  await ogm.init()
  return {
    schema,
    graphiql: {
      headerEditorEnabled: true,
    },
    context: {
      req,
      ogm,
      driver,
    },
  }
})

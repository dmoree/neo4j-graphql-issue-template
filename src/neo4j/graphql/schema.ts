import { Neo4jGraphQL } from '@neo4j/graphql'
import { config } from '@issue/neo4j/graphql/config'
import { plugins } from '@issue/neo4j/graphql/plugins'
import { typeDefs, resolvers } from '@issue/graphql/schema'

export const neo4jGraphQL = new Neo4jGraphQL({
  config,
  typeDefs,
  resolvers,
  plugins,
})

import { Neo4jGraphQL } from '@neo4j/graphql'
import { Neo4jGraphQLAuthJWTPlugin } from '@neo4j/graphql-plugin-auth'
import { NEO4J_GRAPHQL_JWT_SECRET } from '@issue/config'

export const plugins: Neo4jGraphQL['plugins'] = {
  auth: new Neo4jGraphQLAuthJWTPlugin({ secret: NEO4J_GRAPHQL_JWT_SECRET }),
}

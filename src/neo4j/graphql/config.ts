import { Neo4jGraphQL } from '@neo4j/graphql'
import { NEO4J_DB } from '@issue/config'

export const config: NonNullable<Neo4jGraphQL['config']> = {
  driverConfig: { database: NEO4J_DB },
}

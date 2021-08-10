import { driver } from '@issue/neo4j/database'

export const clearDatabase = async () => {
  const session = driver.session()

  try {
    await session.run(`
      MATCH (n)
      DETACH DELETE n
    `)
  } finally {
    await session.close()
  }
}

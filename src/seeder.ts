import faker from 'faker'
import { User } from '@issue/graphql/types'
import { hashPassword } from '@issue/utils'
import * as neo4j from '@issue/neo4j'

const debug = neo4j.debug.extend('seeder')

const {
  database: { connect, disconnect },
  graphql: { ogm },
} = neo4j

const User = ogm.model('User')
const Blog = ogm.model('Blog')
const Post = ogm.model('Post')
const Comment = ogm.model('Comment')

const defaultEmail = 'admin@admin.com'
const defaultPassword = 'password'

const seeder = async () => {
  debug('Seeding started...')

  await connect()

  await Promise.all([User, Blog, Post, Comment].map((m) => m.delete({})))

  const { users } = await User.create<{ users: User[] }>({
    input: await Promise.all(
      [
        [defaultEmail, defaultPassword],
        [faker.internet.email(), faker.internet.password()],
        [faker.internet.email(), faker.internet.password()],
      ].map(async ([email, password]) => {
        return {
          email,
          password: await hashPassword(password),
        }
      })
    ),
  })

  await Blog.create({
    input: users.map((user) => {
      return {
        name: faker.lorem.word(),
        creator: {
          connect: { where: { id: user.id } },
        },
        posts: {
          create: new Array(3).fill(null).map(() => ({
            title: faker.lorem.word(),
            content: faker.lorem.paragraphs(4),
            author: {
              connect: { where: { id: user.id } },
            },
            comments: {
              create: new Array(3).fill(null).map(() => {
                const u = users[Math.floor(Math.random() * users.length)]

                return {
                  content: faker.lorem.paragraph(),
                  author: {
                    connect: { where: { id: u.id } },
                  },
                }
              }),
            },
          })),
        },
      }
    }),
  })

  await disconnect()

  debug('Seeding Finished')
}

seeder()

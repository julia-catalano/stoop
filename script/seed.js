'use strict'

const db = require('../server/db')
const {User, Cat} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  const cats = await Promise.all([
    Cat.create({
      name: 'Indy',
      time: '1:09PM',
      latitude: 40.6600605,
      longitude: -73.9609829,
      imageUrl: 'http://aws.random.cat/meow'
    }),
    Cat.create({
      name: 'BK Zinc Cat',
      time: '2:09PM',
      latitude: 40.6780161,
      longitude: -73.9670804,
      imageUrl: 'http://aws.random.cat/meow'
    }),
    Cat.create({
      name: 'bodegacat',
      time: '3:09PM',
      latitude: 40.6600615,
      longitude: -73.9554536,
      imageUrl: 'http://aws.random.cat/meow'
    }),
    Cat.create({
      name: 'meowby',
      time: '4:09PM',
      latitude: 40.6600605,
      longitude: -73.9620895,
      imageUrl: 'http://aws.random.cat/meow'
    })
  ])
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

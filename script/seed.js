'use strict'

const db = require('../server/db')
const {User, Cat} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', username: 'cody', password: '123'}),
    User.create({email: 'murphy@email.com', username: 'murph', password: '123'})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  const cats = await Promise.all([
    Cat.create({
      name: 'Indy',
      time: '1:09PM',
      userId: 1,
      latitude: 40.6600605,
      longitude: -73.9609829,
      imageUrl:
        'https://res.cloudinary.com/stoopcats/image/upload/v1596645068/IMG_5024_o0odqy.jpg'
    }),
    Cat.create({
      name: 'BK Zinc Cat',
      time: '2:09PM',
      userId: 1,
      latitude: 40.6780161,
      longitude: -73.9670804,
      imageUrl:
        'https://res.cloudinary.com/stoopcats/image/upload/v1596135176/indycopy_v3x1pn.jpg'
    }),
    Cat.create({
      name: 'bodegacat',
      time: '3:09PM',
      userId: 1,
      latitude: 40.6600615,
      longitude: -73.9554536,
      imageUrl:
        'https://res.cloudinary.com/stoopcats/image/upload/t_stoopcat/v1597601488/91951680_153774592632323_7043706309263746058_n.jpg_d6uc8r.jpg'
    }),
    Cat.create({
      name: 'meowby',
      time: '4:09PM',
      userId: 1,
      latitude: 40.6600605,
      longitude: -73.9620895,
      imageUrl:
        'https://res.cloudinary.com/stoopcats/image/upload/t_stoopcat/v1597601490/29089045_831749447030164_5191977808544399360_n.jpg_rnwwts.jpg'
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

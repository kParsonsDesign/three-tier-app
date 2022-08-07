// Install Express v.4.18.1
import express from 'express'
const app = express()

import compression from 'compression'
import helmet from 'helmet'

// Install LowDB v.3.0.0
import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));

// Set up LowDB, use JSON file for storage
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

// Set up Data-Parser
// use express built in json parser instead of body-parser
app.use(express.json())
// compress all routes
app.use(compression())
// express app security by setting HTTP headers
app.use(helmet())

// Serve static files using express
app.use(express.static(join(__dirname, 'public')))
// include Bootstrap
app.use('/bootstrap', express.static(join(__dirname, '/node_modules/bootstrap/dist')))
// include superagent
app.use('/superagent', express.static(join(__dirname, '/node_modules/superagent/dist')))


// ----------------------------------------------------
// Display all data
//    Endpoint: curl http://localhost:3000/data
// ----------------------------------------------------
app.get('/data', async function(req, res) {
  // set default data
  db.data ||= { users: [] }
  await db.read()
  res.send(db.data)
})

// ----------------------------------------------------
// Display all users
//    Endpoint: curl http://localhost:3000/users
// ----------------------------------------------------
app.get('/users', async function(req, res) {
  await db.read()
  res.send(db.data.users)
})

// ----------------------------------------------------
// Test Post Route
//    Endpoint: curl http://localhost:3000/test
//    test using Postman
// ----------------------------------------------------
app.post('/test', async function(req, res) {
  console.log(req.body)
  res.send(req.body.username + " " + req.body.password)
})

// ----------------------------------------------------
// Fake User
//    Endpoint: http://localhost:3000/fake
// ----------------------------------------------------
import { faker } from '@faker-js/faker'
app.get('/fake', async function(req, res) {
  const firstName     = faker.name.firstName()
  const lastName      = faker.name.lastName()
  const fullName      = `${firstName} ${lastName}`
  const dob           = faker.date.birthdate({ min: 18, max: 65, mode: 'age' })
  const email         = faker.internet.email(firstName, lastName)
  const username      = faker.internet.userName(firstName, lastName)
  const password      = faker.internet.password(8, true)
  const phone         = faker.phone.number()
  const streetaddress = faker.address.streetAddress()
  const city          = faker.address.cityName()
  const state         = faker.address.stateAbbr()
  const zip           = faker.address.zipCodeByState(state)
  const citystatezip  = `${city}, ${state} ${zip}`
  const latitude      = faker.address.latitude()
  const longitude     = faker.address.longitude()
  const avatar        = faker.image.avatar()

  const fakeUser = {
    firstName,
    lastName,
    fullName,
    dob,
    email,
    username,
    password,
    phone,
    streetaddress,
    city,
    state,
    zip,
    citystatezip,
    latitude,
    longitude,
    avatar
  }

  res.send(fakeUser)
})


// ----------------------------------------------------
// Add User
//    Endpoint: curl http://localhost:3000/add
// ----------------------------------------------------
app.post('/add', async function(req, res) {
  const firstName     = req.body.firstName
  const lastName      = req.body.lastName
  const fullName      = `${firstName} ${lastName}`
  const email         = req.body.email
  const phone         = req.body.phone
  const dob           = req.body.dob
  const avatar        = req.body.avatar
  const streetaddress = req.body.streetaddress
  const city          = req.body.city
  const state         = req.body.state
  const zip           = req.body.zip
  const citystatezip  = `${city}, ${state} ${zip}`
  const latitude      = req.body.latitude
  const longitude     = req.body.longitude
  const username      = req.body.username
  const password      = req.body.password

  // user object
  const user = {
    firstName,
    lastName,
    fullName,
    email,
    phone,
    dob,
    avatar,
    streetaddress,
    city,
    state,
    zip,
    citystatezip,
    latitude,
    longitude,
    username,
    password
  }

  await db.read()
  db.data.users.push(user)
  await db.write()
  console.log(db.data.users[db.data.users.length - 1])
  res.send(db.data.users[db.data.users.length - 1])
})

// ----------------------------------------------------
// Delete user by id
//    Endpoint: curl http://localhost:3000/users/delete/2
// ----------------------------------------------------
app.get('/users/delete/:id', async function(req, res) {
  let id = parseInt(req.params.id)
  await db.read()
  let userIndex = db.data.users.findIndex((user) => {return user.id === id})
  if (userIndex === -1) return
  db.data.users.splice(userIndex, 1)
  await db.write()
  res.send(db.data.users)
})



// ----------------------------------------------------
// Export app
// ----------------------------------------------------
export { app }

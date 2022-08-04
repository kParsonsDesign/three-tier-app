// Install Express v.4.18.1
import express from 'express'
const app = express()

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
// import bodyParser from 'body-parser'
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
app.use(express.json())

// Serve static files using express
import path from 'path'
app.use(express.static(path.join(__dirname, 'public')))
// add User reference
// app.use('/scripts/addUser.js', express.static(path.join(__dirname, 'addUser.js')))


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
// Add User
//    Endpoint: curl http://localhost:3000/add
// ----------------------------------------------------
// import { makeFakeUser } from './addUser'
import { faker } from '@faker-js/faker'
import { default as superagent } from 'superagent'
app.post('/add', async function(req, res) {

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

  // write to console
  // ----------------------
  console.log(firstName)
  console.log(lastName)
  console.log(fullName)
  // need to pretty dob
  console.log(dob)
  console.log(email)
  console.log(username)
  console.log(password)
  console.log(phone)
  console.log(streetaddress)
  console.log(citystatezip)
  console.log(latitude)
  console.log(longitude)
  console.log(avatar)

  // user object
  const user = {
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

  // const user = {
  //   'firstName'     : req.body.firstName,
  //   'lastName'      : req.body.lastName,
  //   'fullName'      : req.body.fullName,
  //   'dob'           : req.body.dob,
  //   'email'         : req.body.email,
  //   'username'      : req.body.username,
  //   'password'      : req.body.password,
  //   'phone'         : req.body.phone,
  //   'streetaddress' : req.body.streetaddress,
  //   'city'          : req.body.city,
  //   'state'         : req.body.state,
  //   'zip'           : req.body.zip,
  //   'citystatezip'  : req.body.citystatezip,
  //   'latitude'      : req.body.latitude,
  //   'longitude'     : req.body.longitude,
  //   'avatar'        : req.body.avatar
  // }

  await db.read()
  db.data.users.push(user)
  await db.write()
  console.log(db.data.users)
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

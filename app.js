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

// Serve static files using express
app.use(express.static('public'))


// ----------------------------------------------------
// Display all data
//    Endpoint: curl http://localhost:3000/data
// ----------------------------------------------------
app.get('/data', async function(req, res) {
  await db.read()
  // set default data
  db.data ||= { users: [] }
  res.send(db.data)
})

// ----------------------------------------------------
// Display all posts
//    Endpoint: curl http://localhost:3000/posts
// ----------------------------------------------------
app.get('/users', async function(req, res) {
  await db.read()
  res.send(db.data.users)
})



// ----------------------------------------------------
// Delete post by id
//    Endpoint: curl http://localhost:3000/posts/delete/2
// ----------------------------------------------------
app.get('/users/delete/:id', async function(req, res) {
  let id = parseInt(req.params.id)
  await db.read()
  let postIndex = db.data.posts.findIndex((post) => {return post.id === id})
  if (postIndex === -1) return
  db.data.posts.splice(postIndex, 1)
  await db.write()
  res.send(db.data.posts)
})



// ----------------------------------------------------
// Export app
// ----------------------------------------------------
export { app }

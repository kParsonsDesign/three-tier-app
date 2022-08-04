import { app } from './app.js' // module import

// ----------------------------------------------------
// Start Express
// ----------------------------------------------------
const port = 3000
app.listen(port, () => {
  console.log(`Running on port ${port}!`)
})

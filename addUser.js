import { faker } from '@faker-js/faker'
import { default as superagent } from 'superagent'

export function makeFakeUser() {
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
  return user

  // // post user
  // const url = 'http://localhost:3000/add'
  // superagent
  //   .post(url)
  //   .send(user)
  //   .end(function(err,res){
  //     if(err){
  //       console.log(err)
  //     }
  //     else{
  //       console.log(res)
  //       if(res.statusCode === 200){
  //         let message = `
  //         <b>Response: Satatus Code 200.</b>
  //         The HTTP 200 OK Success status
  //         response code indicates that the HTTP request has succeeded.<br />
  //         User: ${fullName}<br />
  //         ${new Date()}
  //         `
  //         return message
  //         // document.getElementById('status').
  //         // innerHTML = `
  //         //   <b>Response: Satatus Code 200.</b>
  //         //   The HTTP 200 OK Success status
  //         //   response code indicates that the HTTP request has succeeded.<br />
  //         //   User: ${fullName}<br />
  //         //   ${new Date()}
  //         //   `
  //       }
  //     }
  //   })

}
// add()

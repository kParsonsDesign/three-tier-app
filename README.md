# Simple Three Tier Project
> Week 22 MIT xPro Full Stack Developer Certificate Program

## Description
Similar to the week 21 project, this project is to create a simple CRUD application to create and destroy users to an application. 

### Differences from Week 21 Project
Including HTTP POST opperations.
Using Faker to create simulated user data for create user form.

### Week 21 Project Description
This project is a simple three-tier CRUD application. It uses [LowDB](https://www.npmjs.com/package/lowdb) as a very simple "database", [Express](https://expressjs.com/) to handle the API and [SuperAgent](https://github.com/visionmedia/superagent) to handle HTTP calls. The front-end styling is done with [Bootstrap](https://getbootstrap.com/).

Additionally, [Jest](https://jestjs.io/) and [SuperTest](https://github.com/visionmedia/supertest#readme) are used for unit testing.

## Refactoring
- Importing a navbar html file into all page files using w3-include-html method.
- Added a "Add User" form to make a more realistic information input, instead of having all of the new user data calculated in the middle tier.
- Calling the Faker function to populate the Add User form, instead of sending that data directly to the addUser function.
- New user added success message is in a Bootstrap Modal that is called directly from the javascript.
- All Users raw data is diplayed in JSON format in a CSS sctyled <code>pre</code> element. Some JavaSCript pattern matching and replacing was required to corectly style the JSON data.

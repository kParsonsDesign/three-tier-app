function users() {
  const users = document.getElementById('users');
  const allUsersUrl = '/users';
  const usersBody = document.getElementById('usersBody')

  superagent
    .get(allUsersUrl)
    .end((err, res) => {
      if (err) {
        console.log(err)
      } else {
        let allUsers = res.body
        if (allUsers) {
          if (usersBody.innerHTML !== '') usersBody.innerHTML = ''
          
          allUsers.forEach(user => {
            let row = document.createElement('tr')
            let avatar = document.createElement('td')
            avatar.innerHTML = `<img src="${user.avatar}" class="rounded-circle" width="64" height="64" crossorigin>`
            // avatar.innerHTML = user.avatar
            row.appendChild(avatar)
            let name = document.createElement('td')
            name.innerHTML = user.fullName
            row.appendChild(name)
            let dob = document.createElement('td')
            dob.innerHTML = new Date(user.dob).toLocaleDateString()
            row.appendChild(dob)
            let email = document.createElement('td')
            email.innerHTML = user.email
            row.appendChild(email)
            let username = document.createElement('td')
            username.innerHTML = user.username
            row.appendChild(username)
            let password = document.createElement('td')
            password.innerHTML = user.password
            row.appendChild(password)
            let phone = document.createElement('td')
            phone.innerHTML = user.phone
            row.appendChild(phone)
            let fulladdress = document.createElement('td')
            fulladdress.innerHTML = `<span style="white-space:nowrap">${user.streetaddress}</span><br />${user.citystatezip}`
            row.appendChild(fulladdress)
            // let streetaddress = document.createElement('td')
            // streetaddress.innerHTML = user.streetaddress
            // row.appendChild(streetaddress)
            // let citystatezip = document.createElement('td')
            // citystatezip.innerHTML = user.citystatezip
            // row.appendChild(citystatezip)
            usersBody.appendChild(row)
          });
        } else {
          usersBody.appendChild('<tr><td>No Users</td></tr>')
        }
        console.log(allUsers)
      }
    })
}
users()

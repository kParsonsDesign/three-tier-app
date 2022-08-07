function users() {
  const users = document.getElementById('users');
  const allUsersUrl = '/users';
  const usersDiv = document.getElementById('allUsers')

  superagent
    .get(allUsersUrl)
    .end((err, res) => {
      if (err) {
        console.log(err)
      } else {
        let allUsers = res.body
        if (allUsers) {
          if (usersDiv.innerHTML !== '') usersDiv.innerHTML = ''
          console.log(allUsers)
          let allData = JSON.stringify(allUsers, null, 2)
          // allData = allData.replace(/\{/g, "\n  {\n    ")
          // allData = allData.replace(/(?<!\})\,/g, "\,\n    ")
          // allData = allData.replace(/\}/g, "\n  }")
          // allData = allData.replace(/\]/g, "\n]")
          allData = allData.replace(/^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg, replacer)
          allData = allData.replace(/(?<=\"\w{1,8}\")\: /g, ':\t\t')
          allData = allData.replace(/(?<=\"\w{9,}\")\: /g, ':\t')
          usersDiv.innerHTML = allData
        } else {
          usersDiv.appendChild('<h3>No Users</h3>')
        }
      }
    })
}
users()

const replacer = function(match, indent, key, val, end) {
  const keyPrfx = '<span class=json-key>'
  const valPrfx = '<span class=json-value>'
  const strPrfx = '<span class=json-string>'
  let r = indent || ''
  if(key)
    r = r + keyPrfx + key + '</span>'
  if(val)
    r = r + (val[0] === '"' ? strPrfx : valPrfx) + val + '</span>'
  return r + (end || '')
}

const addUserButton = document.querySelector('#addUserButton');
const statusDiv     = document.querySelector('#status');

addUserButton.addEventListener('click', (e) => {
  e.preventDefault()
  console.log(e)
  superagent
    .post('/add')
    .end(function(err,res){
      if(err){
        console.log(err)
      }
      else{
        console.log(res)
        if(res.statusCode === 200){
          statusDiv.innerHTML = `
            <b>Response: Satatus Code 200.</b><br />
            The HTTP 200 OK Success status
            response code indicates that the HTTP request has succeeded.<br />
            <h5 class="mt-3">New User Created</h5>
            User: ${res.body.fullName}<br />
            Created at: ${new Date()}
            `
        }
      }
    });
});

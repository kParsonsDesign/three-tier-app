const statusModal     = new bootstrap.Modal(document.querySelector('#status'));
const statusBody      = document.querySelector('#statusBody');

const inputFirstName  = document.querySelector('#userFirstName');
const inputLastName   = document.querySelector('#userLastName');
const inputEmail      = document.querySelector('#userEmail');
const inputPhone      = document.querySelector('#userPhone');
const inputDOB        = document.querySelector('#userDOB');
const inputAvatar     = document.querySelector('#userAvatar');
const inputStreet     = document.querySelector('#userStreet');
const inputCity       = document.querySelector('#userCity');
const inputState      = document.querySelector('#userState');
const inputZip        = document.querySelector('#userZip');
const inputLat        = document.querySelector('#userLat');
const inputLong       = document.querySelector('#userLong');
const inputUsername   = document.querySelector('#userUsername');
const inputPass       = document.querySelector('#userPass');
const inputPassConf   = document.querySelector('#confPass');

// conf password
// inputPassConf.addEventListener('input', matchPass);
// function matchPass(input) {
//   if (input.value !== inputPass.value) {
//     input.setCustomValidity('Password must match');
//   } else {
//     // input is valid
//     input.setCustomValidity('');
//   }
// }

// add user
const addUserForm = document.querySelector('#addUserForm');
addUserForm.addEventListener('submit', addUser);

function addUser(e) {
  e.preventDefault()
  if (inputPass.value !== inputPassConf.value) return
  console.log(e)
  superagent
    .post('/add')
    .send({
      firstName       : inputFirstName.value,
      lastName        : inputLastName.value,
      email           : inputEmail.value,
      phone           : inputPhone.value,
      dob             : inputDOB.value,
      avatar          : inputAvatar.value,
      streetaddress   : inputStreet.value,
      city            : inputCity.value,
      state           : inputState.value,
      zip             : inputZip.value,
      latitude        : inputLat.value,
      longitude       : inputLong.value,
      username        : inputUsername.value,
      password        : inputPass.value
    })
    .end(function(err,res){
      if(err){
        console.log(err);
      }
      else{
        console.log(res)
        if(res.statusCode === 200){
          statusBody.innerHTML = `
            <b>Response: Satatus Code 200.</b><br />
            The HTTP 200 OK Success status
            response code indicates that the HTTP request has succeeded.<br />
            <h5 class="mt-3">New User Created</h5>
            User: ${res.body.fullName}<br />
            Created at: ${new Date()}
            `;
          statusModal.show();
          clearForm();
        }
      }
    });
};

// clear form
const clearFormButton = document.querySelector('#clearForm');
clearFormButton.addEventListener('click', clearForm);

function clearForm() {
  inputFirstName.value  = "";
  inputLastName.value   = "";
  inputEmail.value      = "";
  inputPhone.value      = "";
  inputDOB.value        = "";
  inputAvatar.value     = "";
  inputStreet.value     = "";
  inputCity.value       = "";
  inputState.value      = "";
  inputZip.value        = "";
  inputUsername.value   = "";
  inputPass.value       = "";
  inputPassConf.value   = "";
}

// fake data
const fakeDataButton = document.querySelector('#fakeDataButton');

fakeDataButton.addEventListener('click', async (e) => {
  e.preventDefault();
  // call create fake data endpoint
  superagent
    .get('/fake')
    .end(function(err,res){
      if(err){
        console.log(err)
      }
      else{
        // populate fields with fake data
        inputFirstName.value  = res.body.firstName;
        inputLastName.value   = res.body.lastName;
        inputEmail.value      = res.body.email;
        inputPhone.value      = res.body.phone;
        inputDOB.value        = res.body.dob.slice(0,10);
        inputAvatar.value     = res.body.avatar;
        inputStreet.value     = res.body.streetaddress;
        inputCity.value       = res.body.city;
        inputState.value      = res.body.state;
        inputZip.value        = res.body.zip;
        userLat.value        = res.body.latitude;
        inputZip.value        = res.body.zip;
        inputUsername.value   = res.body.username;
        inputPass.value       = res.body.password;
        inputPassConf.value   = res.body.password;
      }
    })
})

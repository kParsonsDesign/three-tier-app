function data() {
  const usersDiv = document.getElementById('allUsers')
  const url = '/users'
  let html = ''

  superagent
    .get(url)
    .end(function(err,res){
      if(err){
        console.log(err)
      }
      else{
        console.log(res)
        res.body.forEach((user, index) => {
          html += `
            <div class="card mx-1">
              <img class="rounded-circle m-2 mx-auto" style="width:6rem;height:6rem;" src="${user.avatar}" alt="Avatar for ${user.fullName}" crossorigin>
              <div class="card-body">
                <div class="text-center">
                  <h5 class="card-title fw-semibold">${user.fullName}</h5>
                  <p class="fw-light" style="font-size:0.85rem">${user.email}</p>
                </div>
                <p class="card-text" style="">
                  <span class="fw-light">DOB:</span> ${new Date(user.dob).toLocaleDateString()}<br />
                  <span class="fw-light">Username:</span><br />
                    <span class="ms-3">${user.username}</span><br />
                  <span class="fw-light">Phone:</span><br />
                    <span class="ms-3">${user.phone}</span><br />
                  <a class="btn w-100 m-0 p-1" data-bs-toggle="collapse" href="#collapse${index}" role="button" aria-expanded="false" aria-controls="collapse${index}" style="position:relative;left:-0.2rem;"><span class="fw-light" style="float:left">Address:</span> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" style="float:right; margin-top:0.5rem" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg></a>
                    <span class="collapse m-0" id="collapse${index}">
                      <span class="d-inline-block ms-3">${user.streetaddress}<br />
                      ${user.citystatezip}</span>
                    </span>
                  <span class="fw-light">Latitude:</span> ${user.latitude}<br />
                  <span class="fw-light">Longitude:</span> ${user.longitude}<br />
                </p>
              </div>
            </div>
          `
          // let card = document.createElement('div')
          // card.className = card
          // card.style = 'width: 10rem'

          // let img = document.createElement('img')
          // img.className = card-img-top
          // img.alt = `Avatar for ${user.fullName}`
          // img.src = user.avatar
          // card.appendChild(img)

          // let info = document.createElement('div')
          // info.className = card-body
          // card.appendChild(info)

        })
        usersDiv.innerHTML = html
      }
    })
}
data()

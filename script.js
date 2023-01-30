function validateForm() {
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let phone = document.getElementById('phone').value;
  let date = document.getElementById('date').value;
  let time = document.getElementById('time').value;

  if (name == "") {
    alert('Name is required');
    return false;
  }
  if (email == "") {
    alert('Email is required');
    return false;
  }
  if (phone == "") {
    alert('Phone Number is required');
    return false;
  }
  if (date == "") {
    alert('Date is required');
    return false;
  }
  if (time == "") {
    alert('Time is required');
    return false;
  }
  return true;
}


// Function to show data

function showData(response) {
  let html = "";

  for (let i = 0; i < response.data.length; i++) {
    html = html + "<tr>";
    html = html + "<td>" + response.data[i].name + "</td>";
    html = html + "<td>" + response.data[i].email + "</td>";
    html = html + "<td>" + response.data[i].phone + "</td>";
    html = html + "<td>" + response.data[i].date + "</td>";
    html = html + "<td>" + response.data[i].time + "</td>";
    html = html + '<td><button class="btn btn-danger deleteBtn" value=' +response.data[i]._id+ '>Delete</button><button class="btn btn-warning m-2 updateBtn" value=' +response.data[i]._id+ '>Edit</button></td>';
    html = html + "</tr>";
  }
  document.querySelector("#crudTable tbody").innerHTML = html;
}

// Get Api

axios.get('https://crudcrud.com/api/a172cdead9c449fc8c2e4e5884e944d7/appointmentData')
.then((response)=>{
  showData(response);
}).catch((err) => {
  console.log(err);
})

// Function to Add/Post Data

async function addData() {
  console.log('entered in addData');
  if (validateForm() == true) {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let date = document.getElementById('date').value;
    let time = document.getElementById('time').value;
    
    await axios.post('https://crudcrud.com/api/a172cdead9c449fc8c2e4e5884e944d7/appointmentData', { "name": name, "email":email, "phone": phone, "date": date, "time":time })
    .then((response)=>{
      showData(response);
    }).catch((err) => {
      console.log(err);
    })
    console.log('entered After Axios..')

    document.getElementById('name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('phone').value = "";
    document.getElementById('date').value = "";
    document.getElementById('time').value = "";

    // Get Api

    await axios.get('https://crudcrud.com/api/a172cdead9c449fc8c2e4e5884e944d7/appointmentData')
    .then((response)=>{
      showData(response);
    }).catch((err) => {
      console.log(err);
    })
  }
}

// Function to Delete Data

$("body").on("click", ".deleteBtn", async function () {
  let id = $(this).val();
  await axios.delete('https://crudcrud.com/api/a172cdead9c449fc8c2e4e5884e944d7/appointmentData' + '/' + id).then((response) => {
    console.log(response);
  }).catch((err) => {
    console.log(err);
  })

  // Get Api

  await axios.get('https://crudcrud.com/api/a172cdead9c449fc8c2e4e5884e944d7/appointmentData')
  .then((response)=>{
    showData(response);
  }).catch((err) => {
    console.log(err);
  })
  
});

// Function to Update/Edit Data

$("body").on("click", ".updateBtn", async function () {
  // Submit button will hide and Update button will show while clicking on edit button
  document.getElementById("Submit").style.display = "none";
  document.getElementById("Update").style.display = "block";

  let id = $(this).val();
  await axios
    .get(
      "https://crudcrud.com/api/a172cdead9c449fc8c2e4e5884e944d7/appointmentData" +
        "/" +
        id
    )
    .then((response) => {
      document.getElementById("name").value = response.data.name;
      document.getElementById("email").value = response.data.email;
      document.getElementById("phone").value = response.data.phone;
      document.getElementById("date").value = response.data.date;
      document.getElementById("time").value = response.data.time;

      document.querySelector("#Update").onclick = async function () {
        if (validateForm() == true) {
          let name = (response.data.name =
            document.getElementById("name").value);
          let email = (response.data.email =
            document.getElementById("email").value);
          let phone = (response.data.phone =
            document.getElementById("phone").value);
          let date = (response.data.date =
            document.getElementById("date").value);
          let time = (response.data.time =
            document.getElementById("time").value);

          await axios
            .put(
              "https://crudcrud.com/api/a172cdead9c449fc8c2e4e5884e944d7/appointmentData" +
                "/" +
                id,
              { name: name, email: email, phone: phone, date: date, time: time }
            )
            .then((response) => {
              console.log(response);
            })
            .catch((err) => {
              console.log(err);
            });
          
          document.getElementById("name").value = "";
          document.getElementById("email").value = "";
          document.getElementById("phone").value = "";
          document.getElementById("date").value = "";
          document.getElementById("time").value = "";

          // Update button will hide and Submit button will show after Updating details
          document.getElementById("Submit").style.display = "block";
          document.getElementById("Update").style.display = "none";

          // Get Api

          await axios
            .get(
              "https://crudcrud.com/api/a172cdead9c449fc8c2e4e5884e944d7/appointmentData"
            )
            .then((response) => {
              showData(response);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      };
    })
    .catch((err) => {
      console.log(err);
    });
});


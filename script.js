function validateForm() {
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var phone = document.getElementById('phone').value;
  var time = document.getElementById('time').value;

  if (name == "") {
    alert("Name is required");
    return false;
  }
  if (email == "") {
    alert("Email is required");
    return false;
  }
  if (phone == "") {
    alert("Phone is required");
    return false;
  }
  if (time == "") {
    alert("Date & Time is required");
    return false;
  }
  return true;
}

// Function to Show Data

function showData() {
  var appointmentList;
  if (localStorage.getItem("appointmentList") == null) {
    appointmentList = [];
  } else {
    appointmentList = JSON.parse(localStorage.getItem("appointmentList"));
  }

  var html = "";

  appointmentList.forEach(function (ele, index) {
    html += "<tr>";
    html += "<td>" + ele.name + "</td>";
    html += "<td>" + ele.email + "</td>";
    html += "<td>" + ele.phone + "</td>";
    html += "<td>" + ele.time + "</td>";
    html +=
      '<td><button onclick="deleteData(' +
      index +
      ')" class="btn btn-danger">Delete</button><button onclick="updateData(' +
      index +
      ')" class="btn btn-warning ml-2">Edit</button></td>';
    html += "</tr>";
  });

  document.querySelector('#crudTable tbody').innerHTML = html;
}

// Show Data On Page Load

document.onload = showData();

// Function to Add Data

function addData() {
  console.log('Book Appointent Clicked...!')
  if (validateForm() == true) {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var time = document.getElementById("time").value;

    var appointmentList;
    if (localStorage.getItem("appointmentList") == null) {
      appointmentList = [];
    } else {
      appointmentList = JSON.parse(localStorage.getItem("appointmentList"));
    }

    appointmentList.push({
      name: name,
      email: email,
      phone: phone,
      time: time,
    });

    localStorage.setItem("appointmentList", JSON.stringify(appointmentList));
    showData();
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("time").value = "";
  }
}

// Function to Delete Data

function deleteData(index) {
  var appointmentList;
  if (localStorage.getItem("appointmentList") == null) {
    appointmentList = [];
  } else {
    appointmentList = JSON.parse(localStorage.getItem("appointmentList"));
  }

  appointmentList.splice(index, 1);
  localStorage.setItem("appointmentList", JSON.stringify(appointmentList));
  showData();
}

// Function to Update/Edit Data

function updateData(index) {
  
  // Submit button will hide and update button will show

  document.getElementById('Submit').style.display = 'none';
  document.getElementById('Update').style.display = 'block';

  var appointmentList;
  if (localStorage.getItem("appointmentList") == null) {
    appointmentList = [];
  } else {
    appointmentList = JSON.parse(localStorage.getItem("appointmentList"));
  }

  document.getElementById('name').value = appointmentList[index].name;
  document.getElementById('email').value = appointmentList[index].email;
  document.getElementById('phone').value = appointmentList[index].phone;
  document.getElementById('time').value = appointmentList[index].time;

  document.querySelector('#Update').onclick = function () {
    if (validateForm() == true) {
      appointmentList[index].name = document.getElementById("name").value;
      appointmentList[index].email = document.getElementById("email").value;
      appointmentList[index].phone = document.getElementById("phone").value;
      appointmentList[index].time = document.getElementById("time").value;

      localStorage.setItem("appointmentList", JSON.stringify(appointmentList));
      showData();

      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("time").value = "";

      // Update button will hide and Submit button will show

      document.getElementById("Submit").style.display = "block";
      document.getElementById("Update").style.display = "none";
    }
  }
}
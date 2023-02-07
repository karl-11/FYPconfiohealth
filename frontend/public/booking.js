const baseUrl = "http://localhost:3000";

window.addEventListener('DOMContentLoaded', doctoroption());


function AddBooking() {
  // data extraction
  const date = document.getElementById('bookdate').value;
  const time = document.getElementById('booktime').value;
  const location = document.getElementById('location').value;
  const userid = localStorage.getItem('loggedInUserID');
  const doctorid = document.getElementById('doctor').value;
  // data compilation
  const requestBody = {
    date: date,
    time: time,
    location: location,
    userid: userid,
    doctorid: doctorid,
  };

  console.log(requestBody);
  if (requestBody.date == "" || requestBody.time == "") {
    alert("choose date and time");
  } else {
    axios.post(`${baseUrl}/booking`, requestBody)
      .then((response) => {
        console.log("booking response")
        console.log(response.data)
        alert('Booking Successful!');
        window.location.href = "/appview.html";
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

function doctoroption() {
  axios.get(`${baseUrl}/getDoctorName`)
    .then((response) => {
      console.log("booking response")
      var doctoroptionstring;

      var data = response.data
      console.log(data)
      for (var i = 0; i < data.length; i++) {
        console.log(data[i]);

        doctoroptionstring = doctoroptionstring +
          `  
        <option value="${data[i].id}">${"Dr " + data[i].full_name} </option>
        `
      }

      document.getElementById("doctor").innerHTML = doctoroptionstring


    })
    .catch((error) => {
      console.log(error);
    });
}

/////////////////////////////////////////////////////////////////////
// Function to Display Booking 
/////////////////////////////////////////////////////////////////////

function viewbooking() {

  const userid = localStorage.getItem('loggedInUserID');
  console.log(userid);
  // data compilation
  const requestBody = {
    userid: userid
  };


  axios.post(`${baseUrl}/viewbooking`, requestBody)
    .then((response) => {
      console.log("view booking ")
      console.log(response.data)
      let datetimestring = "";
      for (i = 0; i < response.data.length; i++) {

        var data = response.data[i];
        // Split timestamp into [ Y, M, D, h, m, s ]
        var t = data.date.split(/[- : T Z]/);

        // Apply each element to the Date function
        var d = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3] - 8, t[4]));
        console.log(t);
        console.log(d);

        var year = d.getFullYear();
        var month = (d.getMonth() + 1);
        var day = d.getDate();
        if (month < 10) {
          month = '0' + month
        };
        if (day < 10) {
          day = '0' + day
        };

        var hms = data.time.split(':');
        console.log(hms)
        var time = hms[0] + ":" + hms[1]

        // console.log(year);
        // console.log(month);
        // console.log(day);

        var date = year + '-' + month + '-' + day;
        //console.log(date);

        if (data.acceptance == "pending") {

          datetimestring = datetimestring +
            `
          <div class="row justify-content-between my-5 mx-1 align-items-center">
          <div class="text-decoration-none col-7 p-0 m-0 text-center">
              <p class="card flex-column shadow-bottom bg-cards border rounded-4 p-0 m-0">
                  ${"Date: " + date + " | Time: " + time} <br>
                  ${"Location: " + data.location} <br>
                  ${"Doctor: Dr " + data.full_name}
              </p>
          </div>
          <div class="text-decoration-none col-4 p-0 m-0 text-center">
              <p class="card flex-column shadow-bottom bg-warning border btn rounded-4 p-0 m-0"><strong>${data.acceptance}</strong></p>
          </div>
      </div>
    `
        }
        else if (data.acceptance == "accepted") {

          datetimestring = datetimestring +
            `
          <div class="row justify-content-between my-5 mx-1 align-items-center">
          <div class="text-decoration-none col-7 p-0 m-0 text-center">
              <p class="card flex-column shadow-bottom bg-cards border rounded-4 p-0 m-0">
                  ${"Date: " + date + " | Time: " + time} <br>
                  ${"Location: " + data.location} <br>
                  ${"Doctor: Dr " + data.full_name}
              </p>
          </div>
          <div class="text-decoration-none col-4 p-0 m-0 text-center">
              <p class="card flex-column shadow-bottom bg-success border btn rounded-4 p-0 m-0"><strong>${data.acceptance}</strong></p>
          </div>
      </div>
    `
        }
        else {
          datetimestring = datetimestring +
            `
        <div class="row justify-content-between my-5 mx-1 align-items-center">
        <div class="text-decoration-none col-7 p-0 m-0 text-center">
            <p class="card flex-column shadow-bottom bg-cards border rounded-4 p-0 m-0">
                ${"Date: " + date + " | Time: " + time} <br>
                ${"Location: " + data.location} <br>
                ${"Doctor: Dr " + data.full_name}
            </p>
        </div>
        <div class="text-decoration-none col-4 p-0 m-0 text-center">
            <p class="card flex-column shadow-bottom bg-danger border btn rounded-4 p-0 m-0"><strong>${data.acceptance}</strong></p>
        </div>
    </div>
  `
        }



        document.getElementById("arrPrint").innerHTML = datetimestring;

      }
    })
    .catch((error) => {
      console.log(error);
    });
}


const baseUrl = "http://localhost:3000";

function AddBooking() {
  // data extraction
  const date = document.getElementById('bookdate').value;
  const time = document.getElementById('booktime').value;
  const location = document.getElementById('location').value;
  const userid = localStorage.getItem('loggedInUserID');

  // data compilation
  const requestBody = {
    date: date,
    time: time,
    location: location,
    userid: userid,
  };

  console.log(requestBody);

  axios.post(`${baseUrl}/booking`, requestBody)
    .then((response) => {
      console.log("booking response")
      console.log(response.data)
      alert('Booking Successful!');
      window.location.href = "/optimisation.html";
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
        var hour = d.getHours();
        var minute = d.getMinutes();
        if (month < 10) {
            month = '0' + month
        };
        if (day < 10) {
            day = '0' + day
        };
        if (hour < 10) {
            hour = '0' + hour
        };
        if (minute < 10) {
            minute = '0' + minute
        };
        // console.log(year);
        // console.log(month);
        // console.log(day);
        // console.log(hour);
        // console.log(minute);
        var time = hour + ":" + minute;
        var date = year + '-' + month + '-' + day;
        //console.log(date);
        //console.log(time)


        datetimestring = datetimestring +
          `
    <p class="card flex-column shadow-bottom bg-cards border rounded-4 p-0 m-10">
    ${"Date: " + date} <br>
    ${"Time: " + response.data[i].time} <br>
    ${"Location: " + response.data[0].location}
    </p>
    `

        document.getElementById("arrPrint").innerHTML = datetimestring;

      }
    })
    .catch((error) => {
      console.log(error);
    });
}


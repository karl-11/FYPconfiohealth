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

axios.post(`${baseUrl}/booking`,requestBody )
.then((response) => {
    console.log("booking response")
    console.log(response.data)
    alert('Booking Successful!');
})
.catch((error) => {
    console.log(error);
});

    }

function viewbooking() {

    const userid = localStorage.getItem('loggedInUserID');

    axios.get('${baseUrl}/booking', userid )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
}
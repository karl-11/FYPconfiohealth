


function bookingfunction() {
    // data extraction
    const date = document.getElementById('bookdate').value;
    const time = document.getElementById('booktime').value;
    const location = document.getElementById('booklocation').value;

// data compilation
const requestBody = {
    date: date,
    time: time,
    location: location,
};

    console.log(requestBody);

    }
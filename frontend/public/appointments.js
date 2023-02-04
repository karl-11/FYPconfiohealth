const baseUrl = "http://localhost:3000";

var patientid;

// for doctor extracting patient id from url
const myUrl = new URL(window.location.toLocaleString()).searchParams;
var patientid = myUrl.get("patientid");

function viewbooking() {

    const userid = localStorage.getItem('loggedInUserID');
    console.log(userid);
    // data compilation
    var requestBody = {
        userid: userid
    };


    axios.get(`${baseUrl}/viewallbooking`, requestBody)
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
                    <div class="row justify-content-evenly my-5 mx-1 align-items-center">
                        <div class="text-decoration-none col-5 p-0 m-0 text-center">
                            <p class="card flex-column shadow-bottom bg-cards border rounded-4 p-0 m-0">
                                ${"Name: " + data.full_name} <br>
                                ${"Date: " + date + " | Time: " + time} <br>
                                ${"Location: " + data.location}
                            </p>
                        </div>
                        <div class = "col-2">
                            <div class="text-decoration-none col p-0 m-0 pb-2 text-center">
                                <p id="${"accept" + data.bookingid}" class="btn bg-success card flex-column shadow-bottom border rounded-4 p-0 m-0"><strong>Accept</strong></p>
                            </div>
                            <div class="text-decoration-none col p-0 m-0 text-center">
                                <p id="${"decline" + data.bookingid}" class="btn bg-danger card flex-column shadow-bottom border rounded-4 p-0 m-0"><strong>Decline</strong></p>
                            </div>
                        </div>

                    </div>
                    `
                } else {
                    datetimestring = datetimestring +
                        `
                <div class="row justify-content-evenly my-5 mx-1 align-items-center">
                    <div class="text-decoration-none col-5 p-0 m-0 text-center">
                        <p class="card flex-column shadow-bottom bg-cards border rounded-4 p-0 m-0">
                            ${"Name: " + data.full_name} <br>
                            ${"Date: " + date + " | Time: " + time} <br>
                            ${"Location: " + data.location}
                        </p>
                    </div>
                    <div class="text-decoration-none col-2 p-0 m-0 text-center">
                        <p class="card flex-column shadow-bottom bg-cards border btn rounded-4 p-0 m-0"><strong>${data.acceptance}</strong></p>
                    </div>
                </div>
                `
                }
                document.getElementById("arrPrint").innerHTML = datetimestring;

            }
            $(document).ready(function () {
                $('.bg-danger').click(function () {
                    var pending = $(this).attr("id").includes("accept");
                    //console.log(pending);
                    var bookingid = $(this).attr("id").replace(/decline|accept/gi, "");
                    console.log(bookingid);
                    var requestBody = {
                        userid: userid,
                        bookingid: bookingid
                    };
                    if (pending == true) {
                        console.log(pending);
                        axios.post(`${baseUrl}/acceptBooking`, requestBody)
                            .then((response) => {
                                console.log("data")
                                console.log(response.data)
                                viewbooking()
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    } else {
                        console.log(pending);
                        axios.post(`${baseUrl}/declineBooking`, requestBody)
                            .then((response) => {
                                console.log("data")
                                console.log(response.data)
                                viewbooking()
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    }
                });
                $('.bg-success').click(function () {
                    var pending = $(this).attr("id").includes("accept");
                    //console.log(pending);
                    var bookingid = $(this).attr("id").replace(/decline|accept/gi, "");
                    console.log(bookingid);
                    var requestBody = {
                        userid: userid,
                        bookingid: bookingid
                    };
                    if (pending == true) {
                        console.log(pending);
                        axios.post(`${baseUrl}/acceptBooking`, requestBody)
                            .then((response) => {
                                console.log("data")
                                console.log(response.data)
                                viewbooking()
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    } else {
                        console.log(pending);
                        axios.post(`${baseUrl}/declineBooking`, requestBody)
                            .then((response) => {
                                console.log("data")
                                console.log(response.data)
                                viewbooking()
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    }

                });


            });

        })
        .catch((error) => {
            console.log(error);
        });


}


function back() {
    var backbtn = document.getElementById("backbtn");
    console.log(backbtn);
    window.location.href = "doctorpage.html?patientid=" + patientid
}



const baseUrl = "http://localhost:3000";

const loggedInUserID = localStorage.getItem("loggedInUserID")
const loggedInUserType = localStorage.getItem("loggedInUserType")
const token = localStorage.getItem("token")

// requestconfig if endpoint needs authorization
var axiosConfigAuth = {
    headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + token
    }
};

var patientid;

// for doctor extracting patient id from url
var myUrl = new URL(window.location.toLocaleString()).searchParams;
var patientid = myUrl.get("patientid");

function viewbooking() {

    const userid = localStorage.getItem('loggedInUserID');
    console.log(userid);
    // data compilation
    var requestBody = {
        doctorid: userid,
        user_role: loggedInUserType
    };
    console.log(requestBody)

    axios.post(`${baseUrl}/viewmybooking`, requestBody, axiosConfigAuth)
        .then((response) => {
            console.log("view booking ")
            console.log(response.data)
            let datetimestring = "";
            for (i = 0; i < response.data.length; i++) {

                var data = response.data[i];
                // Split timestamp into [ Y, M, D, h, m, s ]
                var t = data.date.split(/[- : T Z]/);

                // Apply each element to the Date function
                var d = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4]));
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
                        <div class="text-decoration-none col-md-5 col-sm-5 p-0 m-0 mb-1 text-center">
                            <p class="card flex-column shadow-bottom bg-cards border rounded-4 p-0 m-0">
                                ${"Name: " + data.full_name} <br>
                                ${"Date: " + date + " | Time: " + time} <br>
                                ${"Location: " + data.location}
                            </p>
                        </div>
                        <div class = "col-md-2 col-sm-5">
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
                    <div class="text-decoration-none col-md-5 col-sm-5 p-0 m-0 mb-1 text-center">
                        <p class="card flex-column shadow-bottom bg-cards border rounded-4 p-0 m-0">
                            ${"Name: " + data.full_name} <br>
                            ${"Date: " + date + " | Time: " + time} <br>
                            ${"Location: " + data.location}
                        </p>
                    </div>
                    <div class = "col-md-2 col-sm-5">
                        <div class="text-decoration-none p-0 m-0 text-center">
                            <p class="card flex-column shadow-bottom bg-cards border btn rounded-4 p-0 m-0"><strong>${data.acceptance}</strong></p>
                        </div>
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
                        bookingid: bookingid,
                        user_role: loggedInUserType
                    };
                    if (pending == true) {
                        console.log(pending);
                        axios.post(`${baseUrl}/acceptBooking`, requestBody, axiosConfigAuth)
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
                        axios.post(`${baseUrl}/declineBooking`, requestBody, axiosConfigAuth)
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
                        bookingid: bookingid,
                        user_role: loggedInUserType
                    };
                    if (pending == true) {
                        console.log(pending);
                        axios.post(`${baseUrl}/acceptBooking`, requestBody, axiosConfigAuth)
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
                        axios.post(`${baseUrl}/declineBooking`, requestBody, axiosConfigAuth)
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



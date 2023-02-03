const baseUrl = "http://localhost:3000";

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
                    <div class="row justify-content-between my-5 mx-1">
                        <div class="text-decoration-none col-7 p-0 m-0 text-center">
                            <p class="card flex-column shadow-bottom bg-cards border rounded-4 p-0 m-0">
                                ${"Name: " + data.full_name} <br>
                                ${"Date: " + date + " | Time: " + time} <br>
                                ${"Location: " + data.location}
                            </p>
                        </div>
                        <div class="text-decoration-none col-2 p-0 m-0 text-center">
                            <p id="${"accept" + data.bookingid}" class="btn bg-success card flex-column shadow-bottom border rounded-4 p-0 m-0">Accept</p>
                        </div>
                        <div class="text-decoration-none col-2 p-0 m-0 text-center">
                        <p id="${"decline" + data.bookingid}" class="btn bg-danger card flex-column shadow-bottom border rounded-4 p-0 m-0">Decline</p>
                    </div>
                    </div>
                    `
                } else {
                    datetimestring = datetimestring +
                        `
                <div class="row justify-content-between my-5 mx-1 align-items-center">
                    <div class="text-decoration-none col-7 p-0 m-0 text-center">
                        <p class="card flex-column shadow-bottom bg-cards border rounded-4 p-0 m-0">
                            ${"Name: " + data.full_name} <br>
                            ${"Date: " + date + " | Time: " + time} <br>
                            ${"Location: " + data.location}
                        </p>
                    </div>
                    <div class="text-decoration-none col-2 p-0 m-0 text-center">
                        <p class="card flex-column shadow-bottom bg-cards border btn rounded-4 p-0 m-0">${data.acceptance}</p>
                    </div>
                </div>
                `
                }
                document.getElementById("arrPrint").innerHTML = datetimestring;

            }
            $(document).ready(function () {
                $('.btn').click(function () {
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




// Get vitals from table and put into html
const baseUrl = "http://localhost:3000";

// Data extraction from localstorage
const loggedinid = localStorage.getItem('loggedInUserID');
const loggedintype = localStorage.getItem('loggedInUserType');
const loggedInUserType = localStorage.getItem("loggedInUserType")
const token = localStorage.getItem("token")

// for doctor extracting patient id from url
const myUrl = new URL(window.location.toLocaleString()).searchParams;
var patientid = myUrl.get("patientid");
//console.log(patientid);
if (patientid != null) {
    var requestBody = {
        userid: loggedinid,
        patientid: patientid,
        user_role: loggedInUserType
    };
} else {
    // data compilation
    var requestBody = {
        userid: loggedinid,
        user_role: loggedInUserType
    };
}

axiosConfigAuth = {
    headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + token
    }
}

// console.log("---------------- compiled data -----------");
//console.log(requestBody);

if (patientid != null) {
    window.addEventListener('DOMContentLoaded', getPatientName());
}
window.addEventListener('DOMContentLoaded', selectedvitals());
window.addEventListener('DOMContentLoaded', notSelectedVitals());



function selectedvitals() {
    axios.post(`${baseUrl}/selectedvitals`, requestBody, axiosConfigAuth)
        .then((response) => {

            var vitalsStringSelected = "";
            var vitalsStringNav = "";
            // overlay button to add to end of nav
            var overlayButtonString =
                `
                 <div class="form-check form-check-inline">
                     <button type="button" class="btn flex-column card border-0 p-2 text-center" onclick="on()">
                     <img src="images/icons8-plus.png" alt="">
                     </button>
                 </div>
                 `;

            //console.log(response.data);

            for (i = 0; i < response.data.length; i++) {

                //console.log("select vitals");
                var data = response.data[i];
                //console.log(data);

                var vitalsStringSelected = vitalsStringSelected +
                    `
                     <div class="form-check col-lg-3 col-md-4 m-0 p-0">
                         <input class="form-check-input" type="checkbox" value="${data.vitalsid}" name="vitalscheck" id="${data.selectedVitals.toLowerCase()}">
                         <label class="form-check-label text-center" for="${data.selectedVitals.toLowerCase()}">
                              <img src="${data.vital_sign_img}" class="align-self-center" alt="">
                              <p>
                               ${data.selectedVitals}
                              </p>
                         </label>
                     </div>
              `

                var vitalsStringNav = vitalsStringNav +
                    `
                     <div class="form-check form-check-inline">
                         <input class="form-check-input" type="radio" name="vitalsradio" id="${data.selectedVitals.toLowerCase() + "selected"}" value="${data.vitalsid}">
                         <label class="form-check-label card border-0 p-2 text-center" style = "height: 145px" for="${data.selectedVitals.toLowerCase() + "selected"}">
                             <img src="${data.vital_sign_img}" class="align-self-center" alt="">
                             <p class = "p-0 m-0" style="white-space: normal;">
                               ${data.selectedVitals}
                             </p>                 
                         </label>
                     </div>
                     `
            }
            document.getElementById("selected").innerHTML = vitalsStringSelected;
            document.getElementById("vitalnav").innerHTML = vitalsStringNav + overlayButtonString;
            // Hide check Button
            for (let i = 0; i < vitalscheck.length; i++) {
                vitalscheck[i].style.display = "none";
            }
            // Hide Radio Button
            for (let i = 0; i < vitalsradio.length; i++) {
                vitalsradio[i].style.display = "none";
            }
            // Add border and background to Selected Radio
            $(document).ready(function () {
                $('.form-check-inline>label').click(function () {
                    $('label').removeClass(' shadow-bottom bg-cards border rounded-4');
                    $(this).addClass(' shadow-bottom bg-cards border rounded-4');
                });
            });

        })
        .catch((error) => {
            console.log(error);
        });

}

function notSelectedVitals() {
    axios.post(`${baseUrl}/notSelectedVitals`, requestBody, axiosConfigAuth)
        .then((response) => {

            var vitalsStringNotSelected = "";

            for (i = 0; i < response.data.length; i++) {

                //console.log("Not selected vitals");
                var data = response.data[i];
                //console.log(data);

                var vitalsStringNotSelected = vitalsStringNotSelected +
                    `
                         <div class="form-check col-lg-3 col-md-4 m-0 p-0">
                             <input class="form-check-input" type="checkbox" value="${data.id}" name="vitalscheck" id="${data.vital_sign_type.toLowerCase()}">
                                 <label class="form-check-label text-center" for="${data.vital_sign_type.toLowerCase()}">
                                     <img src="${data.vital_sign_img}" class="align-self-center" alt="">
                                     <p>
                                      ${data.vital_sign_type}
                                     </p>
                                 </label>
                         </div>
                         `
            }
            document.getElementById("notselected").innerHTML = vitalsStringNotSelected;

            // Hide check Button
            for (let i = 0; i < vitalscheck.length; i++) {
                vitalscheck[i].style.display = "none";
            }
        })
        .catch((error) => {
            console.log(error);
        });

}

//console.log(vitals);
var vitalsradio = document.getElementsByName("vitalsradio");
var vitalscheck = document.getElementsByName("vitalscheck");

console.log(vitalsradio);
console.log(vitalscheck);
var radioid;

// too see the value of selected radio
function displayRadioValue() {
    //console.log(vitalsradio)
    for (i = 0; i < vitalsradio.length; i++) {
        if (vitalsradio[i].checked) {
            radioid = vitalsradio[i].value;
            console.log("id: " + vitalsradio[i].value);
            console.log("Vital: " + vitalsradio[i].id.replace("selected", ""));
        }
    }
};

function displayCheckValue() {
    console.log(vitalscheck)
    for (i = 0; i < vitalscheck.length; i++) {
        if (vitalscheck[i].checked) {
            console.log("id: " + vitalscheck[i].id)
            console.log("value: " + vitalscheck[i].value)
        }
    }
};

function addSelectedVital() {
    for (i = 0; i < vitalscheck.length; i++) {
        if (vitalscheck[i].checked) {
            if (patientid != null) {
                var requestBody = {
                    userid: loggedinid,
                    patientid: patientid,
                    user_role: loggedInUserType,
                    vitalid: vitalscheck[i].value
                };
            } else {
                // data compilation
                var requestBody = {
                    userid: loggedinid,
                    user_role: loggedInUserType,
                    vitalid: vitalscheck[i].value
                };
            }
        }
    }
    //console.log(requestBody);

    axios.post(`${baseUrl}/addSelectedVitals`, requestBody, axiosConfigAuth)
        .then((response) => {

            //console.log("add selected vital");
            var data = response.data.affectedRows;
            console.log(data);
            selectedvitals();
            notSelectedVitals();
        })
        .catch((error) => {
            console.log(error);
        });

};

function removeSelectedVital() {

    for (i = 0; i < vitalscheck.length; i++) {
        if (vitalscheck[i].checked) {
            if (patientid != null) {
                var requestBody = {
                    userid: loggedinid,
                    patientid: patientid,
                    user_role: loggedInUserType,
                    vitalid: vitalscheck[i].value
                };
            } else {
                // data compilation
                var requestBody = {
                    userid: loggedinid,
                    user_role: loggedInUserType,
                    vitalid: vitalscheck[i].value
                };
            }
        }
    }
    //console.log(requestBody);

    axios.post(`${baseUrl}/removeSelectedVitals`, requestBody, axiosConfigAuth)
        .then((response) => {
            // console.log("Remove selected vitals");
            var data = response.data.affectedRows;
            // console.log("rows affected: " + data);
            selectedvitals();
            notSelectedVitals();
        })
        .catch((error) => {
            console.log(error);
        });



};

function getPatientName() {
    if (patientid != null) {
        var requestBody = {
            userid: loggedinid,
            patientid: patientid,
        };
    } else {
        // data compilation
        var requestBody = {
            userid: loggedinid,
        };
    }

    //console.log(requestBody);

    axios.post(`${baseUrl}/getPatientName`, requestBody)
        .then((response) => {

            //console.log("add selected vital");
            var data = response.data[0];
            console.log(data);

            var fullnamestring = `            
        <h2>
            Viewing results of: ${data.full_name} 
        </h2>`

            document.getElementById("patientnameplaceholder").innerHTML = fullnamestring;



        })
        .catch((error) => {
            console.log(error);
        });

};

// Make Vitals scrollable by dragging
const slider = document.querySelector('.scrollmenu');
let mouseDown = false;
let startX, scrollLeft;

let startDragging = function (e) {
    mouseDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
};
let stopDragging = function (event) {
    mouseDown = false;
};

slider.addEventListener('mousemove', (e) => {
    e.preventDefault();
    if (!mouseDown) { return; }
    const x = e.pageX - slider.offsetLeft;
    const scroll = x - startX;
    slider.scrollLeft = scrollLeft - scroll;
});

// Add the event listeners
slider.addEventListener('mousedown', startDragging, false);
slider.addEventListener('mouseup', stopDragging, false);
slider.addEventListener('mouseleave', stopDragging, false);

// Overlay On
function on() {
    document.getElementById("overlay").style.width = "100%";
    document.getElementById("overlaycontent").style.width = "50%";
}
// Overlay Off
function off() {
    document.getElementById("overlay").style.width = "0%";
    document.getElementById("overlaycontent").style.width = "0%";
};

function loadchart() {
    for (i = 0; i < vitalsradio.length; i++) {
        if (vitalsradio[i].checked) {
            if (patientid != null) {
                var requestBody = {
                    userid: loggedinid,
                    patientid: patientid,
                    user_role: loggedInUserType,
                    vitalid: vitalsradio[i].value
                };
                //console.log(requestBody);
            } else {
                var requestBody = {
                    userid: loggedinid,
                    user_role: loggedInUserType,
                    vitalid: vitalsradio[i].value
                };
                //console.log(requestBody);
            }

        }
    }
    if (requestBody.vitalid != 3) {
        axios.post(`${baseUrl}/getVitalValue`, requestBody, axiosConfigAuth)
            .then((response) => {
                //console.log("get vitals value");
                var res = response.data;
                //console.log(res);
                var number;
                //console.log("load chart");

                //Google Chart
                google.charts.load('current', { packages: ['corechart', 'line'] });

                google.charts.setOnLoadCallback(drawBackgroundColor);

                function drawBackgroundColor() {
                    var data = new google.visualization.DataTable();
                    data.addColumn('datetime', 'date/time');
                    data.addColumn('number', number);

                    var test = [];

                    if (res.length != 0) {
                        for (i = 0; i < res.length; i++) {

                            // Split timestamp into [ Y, M, D, h, m, s ]
                            var t = res[i].datetimecreated.split(/[- : T Z]/);

                            // Apply each element to the Date function
                            var d = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4]));
                            number = res[0].vital_value;
                            test.push([d, res[i].vitalvalue]);
                            //console.log(t);
                            //console.log(d);
                            //console.log(res[i]);
                        }
                        //console.log(test);

                        data.addRows(
                            test
                        );

                        var options = {
                            hAxis: {
                                title: 'Date / Time',
                                gridlines: {
                                    count: -1,
                                    units: {
                                        days: { format: ['MMM dd'] },
                                        hours: { format: ['HH:mm', 'ha'] },
                                    }
                                },
                            },
                            vAxis: {
                                title: number,
                            },
                            backgroundColor: '#ffffff',
                            legend: 'none',
                            pointSize: 10,
                            height: 400
                        };

                    }
                    else {
                        axios.get(`${baseUrl}/vitals`)
                            .then((response) => {
                                for (i = 0; i < vitalsradio.length; i++) {
                                    if (vitalsradio[i].checked) {
                                        //console.log("id: " + vitalsradio[i].value);
                                        //console.log("Vital: " + vitalsradio[i].id.replace("selected", ""));
                                        var radioid = vitalsradio[i].value;

                                    }
                                }
                                for (i = 0; i < response.data.length; i++) {
                                    //console.log("printing vital get response.data" + i);
                                    //console.log(response.data[i]);
                                    if (radioid == response.data[i].id) {
                                        number = response.data[i].vital_value;
                                        //console.log("-----------number-----------");
                                        //console.log(number);
                                    }
                                }
                                var d = new Date
                                test.push([d, null])
                                //console.log(test);

                                data.addRows(
                                    test
                                );

                                var options = {
                                    hAxis: {
                                        title: 'Date / Time',
                                        gridlines: {
                                            count: -1,
                                            units: {
                                                days: { format: ['MMM dd'] },
                                                hours: { format: ['HH:mm', 'ha'] },
                                            }
                                        },
                                    },
                                    vAxis: {
                                        title: number,
                                    },
                                    backgroundColor: '#ffffff',
                                    legend: 'none',
                                    pointSize: 10,
                                    height: 400
                                };

                                var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
                                chart.draw(data, options);

                            })
                            .catch((error) => {
                                console.log(error);
                            });

                    }

                    if (patientid != null) {
                        var valuebtn =
                            `
                        <div class="text-center">
                            <button type="button" class="btn bg-beige ">
                                <a class= "text-decoration-none text-dark" href="http://localhost:3001/vitalinput.html?patientid=${patientid}">Add Value</a>
                            </button>
                        </div>
                        `
                    } else {
                        var valuebtn =
                            `
                        <div class="text-center">
                            <button type="button" class="btn bg-beige ">
                                <a class= "text-decoration-none text-dark" href="http://localhost:3001/vitalinput.html">Add Value</a>
                            </button>
                        </div>
                        `
                    }


                    document.getElementById("valuebtn").innerHTML = valuebtn;

                    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
                    chart.draw(data, options);
                }

            })
            .catch((error) => {
                console.log(error);
            });
    }
    else {
        axios.post(`${baseUrl}/getBloodPressureValue`, requestBody, axiosConfigAuth)
            .then((response) => {
                //console.log("get vitals value");
                var res = response.data;
                //console.log(res);
                var number;
                var systolic;
                var diastolic;
                //console.log("load chart");

                //Google Chart
                google.charts.load('current', { packages: ['corechart', 'line'] });

                google.charts.setOnLoadCallback(drawBackgroundColor);

                function drawBackgroundColor() {
                    var data = new google.visualization.DataTable();
                    data.addColumn('datetime', 'date/time');
                    data.addColumn('number', number);
                    data.addColumn('number', number);
                    var test = [];

                    if (res.length != 0) {
                        for (i = 0; i < res.length; i++) {

                            // Split timestamp into [ Y, M, D, h, m, s ]
                            var t = res[i].datetimecreated.split(/[- : T Z]/);

                            // Apply each element to the Date function
                            var d = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4]));
                            number = res[0].vital_value;
                            test.push([d, res[i].diastolic, res[i].systolic]);
                            //console.log(t);
                            //console.log(d);
                            //console.log(res[i]);
                        }
                        // console.log(test);

                        data.addRows(
                            test
                        );

                        var options = {
                            hAxis: {
                                title: 'Date / Time',
                                gridlines: {
                                    count: -1,
                                    units: {
                                        days: { format: ['MMM dd'] },
                                        hours: { format: ['HH:mm', 'ha'] },
                                    }
                                },
                            },
                            vAxis: {
                                title: number,
                            },
                            backgroundColor: '#ffffff',
                            legend: 'none',
                            pointSize: 10,
                            height: 400
                        };

                    }
                    else {
                        axios.get(`${baseUrl}/vitals`)
                            .then((response) => {
                                for (i = 0; i < vitalsradio.length; i++) {
                                    if (vitalsradio[i].checked) {
                                        //console.log("id: " + vitalsradio[i].value);
                                        //console.log("Vital: " + vitalsradio[i].id.replace("selected", ""));
                                        var radioid = vitalsradio[i].value;

                                    }
                                }
                                for (i = 0; i < response.data.length; i++) {
                                    //console.log("printing vital get response.data" + i);
                                    //console.log(response.data[i]);
                                    if (radioid == response.data[i].id) {
                                        number = response.data[i].vital_value;
                                        //console.log("-----------number-----------");
                                        //console.log(number);
                                    }
                                }
                                var d = new Date
                                test.push([d, null])
                                //console.log(test);

                                data.addRows(
                                    test
                                );

                                var options = {
                                    hAxis: {
                                        title: 'Date / Time',
                                        gridlines: {
                                            count: -1,
                                            units: {
                                                days: { format: ['MMM dd'] },
                                                hours: { format: ['HH:mm', 'ha'] },
                                            }
                                        },
                                    },
                                    vAxis: {
                                        title: number,
                                    },
                                    backgroundColor: '#ffffff',
                                    legend: 'none',
                                    pointSize: 10,
                                    height: 400
                                };

                                var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
                                chart.draw(data, options);

                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    }
                    if (patientid != null) {
                        var valuebtn =
                            `
                        <div class="text-center">
                            <button type="button" class="btn bg-beige ">
                                <a class= "text-decoration-none text-dark" href="http://localhost:3001/vitalinput.html?patientid=${patientid}">Add Value</a>
                            </button>
                        </div>
                        `
                    } else {
                        var valuebtn =
                            `
                        <div class="text-center">
                            <button type="button" class="btn bg-beige ">
                                <a class= "text-decoration-none text-dark" href="http://localhost:3001/vitalinput.html">Add Value</a>
                            </button>
                        </div>
                        `
                    }
                    document.getElementById("valuebtn").innerHTML = valuebtn;

                    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
                    chart.draw(data, options);
                }

            })
            .catch((error) => {
                console.log(error);
            });
    }

}
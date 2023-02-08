// Get vitals from table and put into html
const baseUrl = "http://34.224.225.183:3000";

// Data extraction from localstorage
const loggedinid = localStorage.getItem('loggedInUserID');
const loggedInUserType = localStorage.getItem("loggedInUserType")
const token = localStorage.getItem("token")// for doctor extracting patient id from url

const myUrl = new URL(window.location.toLocaleString()).searchParams;
var patientid = myUrl.get("patientid");
//console.log(patientid);

if (patientid != null && loggedInUserType != "patient") {
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
var vitalhtml;
// console.log("---------------- compiled data -----------");
// console.log(requestBody);

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
var vitalvalue;

// too see the value of selected radio
function displayRadioValue() {
    console.log(vitalsradio)
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

const form = document.getElementById('inputvalue');
function getAllVitals() {
    if (radioid != 3) {
        axios.get(`${baseUrl}/vitals`)
            .then((response) => {
                for (i = 0; i < response.data.length; i++) {
                    if (radioid == response.data[i].id) {
                        vitalvalue = response.data[i].vital_value;
                        console.log("-----------vitalvalue-----------");
                        console.log(vitalvalue);
                    }
                }
                if (patientid != null) {
                    vitalhtml = `/vitals.html?patientid=${patientid}`;
                } else {
                    // data compilation
                    vitalhtml = "/vitals.html";
                }
                var valuestring =
                    `
                <div class="m-3 form-group">
                    <label for="${vitalvalue}" class="form-label">${vitalvalue}</label>
                    <input type="text" class="form-control" id="${vitalvalue}" placeholder="" name="${vitalvalue}">
                </div>
                <div class="m-3 form-group">
                    <label for="date" class="form-label">date</label>
                    <input type="date" class="form-control" id="date" placeholder="" name="date">
                </div>
                <div class="m-3 form-group">
                    <label for="time" class="form-label">time</label>
                    <input type="time" class="form-control" id="time" placeholder="" name="time">
                </div>
                <div class="text-center">
                    <button type="button" class="btn bg-beige rounded-3 px-5">
                        <a class="text-decoration-none text-dark" href="${vitalhtml}">
                            Back
                        </a>
                    </button>
                    <button type="submit" class="btn text-white rounded-3 px-5" style="background-color: #43AEA1 ;">
                        Save
                    </button>
            `
                var today = new Date();
                var year = today.getFullYear();
                var month = (today.getMonth() + 1);
                var day = today.getDate();
                var hour = today.getHours();
                var minute = today.getMinutes();
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
                // console.log(today);
                // console.log(year);
                // console.log(month);
                // console.log(day);
                // console.log(hour);
                // console.log(minute);
                var time = hour + ":" + minute;
                var date = year + '-' + month + '-' + day;
                console.log(date);
                console.log(time)
                document.getElementById("inputvalue").innerHTML = valuestring;
                document.getElementById('date').value = date;
                document.getElementById('time').value = time;

            })
            .catch((error) => {
                console.log(error);
            });
    } else {
        axios.get(`${baseUrl}/vitals`)
            .then((response) => {
                for (i = 0; i < response.data.length; i++) {
                    if (radioid == response.data[i].id) {
                        vitalvalue = response.data[i].vital_value;
                        console.log("-----------vitalvalue-----------");
                        console.log(vitalvalue);
                    }
                }
                if (patientid != null) {
                    vitalhtml = `/vitals.html?patientid=${patientid}`;
                } else {
                    // data compilation
                    vitalhtml = "/vitals.html";
                }
                var valuestring =
                    `
                <div class="m-3 form-group">
                    <label for="${vitalvalue + "1"}" class="form-label">${"Systolic (" + vitalvalue + ")"}</label>
                    <input type="text" class="form-control" id="${vitalvalue + "1"}" placeholder="" name="${vitalvalue + "1"}">
                </div>
                <div class="m-3 form-group">
                <label for="${vitalvalue + "2"}" class="form-label">${"Diastolic (" + vitalvalue + ")"}</label>
                <input type="text" class="form-control" id="${vitalvalue + "2"}" placeholder="" name="${vitalvalue + "2"}">
                </div>
                <div class="m-3 form-group">
                    <label for="date" class="form-label">date</label>
                    <input type="date" class="form-control" id="date" placeholder="" name="date">
                </div>
                <div class="m-3 form-group">
                    <label for="time" class="form-label">time</label>
                    <input type="time" class="form-control" id="time" placeholder="" name="time">
                </div>
                <div class="text-center">
                    <button type="button" class="btn bg-beige rounded-3 px-5">
                        <a class="text-decoration-none text-dark" href="${vitalhtml}">
                            Back
                        </a>
                    </button>
                    <button type="submit" class="btn text-white rounded-3 px-5" style="background-color: #43AEA1 ;">
                        Save
                    </button>
            `
                var today = new Date();
                var year = today.getFullYear();
                var month = (today.getMonth() + 1);
                var day = today.getDate();
                var hour = today.getHours();
                var minute = today.getMinutes();
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
                // console.log(today);
                // console.log(year);
                // console.log(month);
                // console.log(day);
                // console.log(hour);
                // console.log(minute);
                var time = hour + ":" + minute;
                var date = year + '-' + month + '-' + day;
                console.log(date);
                console.log(time)
                document.getElementById("inputvalue").innerHTML = valuestring;
                document.getElementById('date').value = date;
                document.getElementById('time').value = time;

            })
            .catch((error) => {
                console.log(error);
            });
    }
}
form.addEventListener('submit', (event) => {
    // handle the form data
    // prevent page reload
    event.preventDefault();

    // data extraction
    var userid = localStorage.getItem('loggedInUserID');
    var vitalid = radioid;
    var date = document.getElementById(`date`).value;
    var time = document.getElementById(`time`).value;
    var datetime = date + " " + time;
    console.log(radioid);
    if (radioid != 3) {
        var vital_value = document.getElementById(`${vitalvalue}`).value;

        if (isNaN(vital_value) == true || vital_value == "") {
            alert("insert proper value")
        } else {
            // data compilation
            var requestBody = {
                userid: userid,
                user_role: loggedInUserType,
                vitalid: vitalid,
                vital_value: vital_value,
                datetime: datetime,
            };
            if (patientid != null) {
                var requestBody = {
                    userid: loggedinid,
                    patientid: patientid,
                    user_role: loggedInUserType,
                    vitalid: vitalid,
                    vital_value: vital_value,
                    datetime: datetime
                };
            } else {
                // data compilation
                var requestBody = {
                    userid: userid,
                    user_role: loggedInUserType,
                    vitalid: vitalid,
                    vital_value: vital_value,
                    datetime: datetime
                };
            }

            axios.post(`${baseUrl}/addVitalValue`, requestBody, axiosConfigAuth)
                .then((response) => {
                    console.log("========= Add Vital Value response ==========")
                    console.log(response.data)

                    if (patientid != null) {
                        window.location.href = `/vitals.html?patientid=${patientid}`;
                    } else {
                        // data compilation
                        window.location.href = "/vitals.html";
                    }


                })
                .catch((error) => {
                    console.log(error);
                });
        }

    } else {

        var systolic = document.getElementById(`${vitalvalue + "1"}`).value;
        var diastolic = document.getElementById(`${vitalvalue + "2"}`).value;
        if (isNaN(systolic) == true || systolic == "" || isNaN(diastolic) || diastolic == "") {
            alert("insert proper value")
        } else {
            if (patientid != null) {
                var requestBody = {
                    userid: loggedinid,
                    patientid: patientid,
                    user_role: loggedInUserType,
                    vitalid: vitalid,
                    systolic: systolic,
                    diastolic: diastolic,
                    datetime: datetime
                };
            } else {
                // data compilation
                var requestBody = {
                    userid: userid,
                    user_role: loggedInUserType,
                    vitalid: vitalid,
                    systolic: systolic,
                    diastolic: diastolic,
                    datetime: datetime
                };
            }


            axios.post(`${baseUrl}/addBloodPressureValue`, requestBody, axiosConfig)
                .then((response) => {
                    console.log("========= Add Vital Value response ==========")
                    console.log(response.data)

                    if (patientid != null) {
                        window.location.href = `/vitals.html?patientid=${patientid}`;
                    } else {
                        // data compilation
                        window.location.href = "/vitals.html";
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }


        console.log("---------------- compiled data -----------");
        console.log(requestBody);
    }

});


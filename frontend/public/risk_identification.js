//paste this line whenever we need api or endpoints
const baseUrl = "http://localhost:3000";

const loggedInUserID = localStorage.getItem("loggedInUserID")
// console.log("printing loggedInUserID" + loggedInUserID)

const loggedInUserType = localStorage.getItem("loggedInUserType")
const token = localStorage.getItem("token")

// console.log("printing loggedInUserID" + loggedInUserID)

// requestconfig if endpoint needs authorization
var axiosConfigAuth = {
    headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + token
    }
};


$(document).ready(function () {
    // const loggedInUserType = localStorage.getItem('loggedInUserType')

    if (loggedInUserType == "patient") {
        console.log("patient user")
        loadAllData();
    } else if (loggedInUserType == "doctor") {
        console.log("doctor user")
        loadPatientDataForDoctor();
    } else {
        console.log("Invalid User!!!")
    }

})

function loadAllData() {
    axios.get(`${baseUrl}/getAllQnr`).then(function (response) {
        console.log("first")
        qnrCount = response.data.length;
        console.log("number of qnrs: " + qnrCount);
        for (i = 0; i < response.data.length; i++) {
            const { id, name, max_score, image_url } = response.data[i]
            var resultDataID = "result" + id;
            var qnrID = id;
            console.log("the qnrID is: " + qnrID);
            //progress bar is loaded in as 0/max_score with no values, if there is content, .html() function will replace those values
            $('#questionnaireContent').append(`
            <div class="card flex-column shadow-bottom bg-cards border rounded-4 p-0 m-0 mb-4"
                style="width: 290px; height:310px;">
                <a href="detailQuestionnaire.html" id=${qnrID} class="text-decoration-none stretched-link" onclick="sendID(this.id)">
                </a>
                <p class="text-start text-black p-0 mx-3 mt-3 mb-0 fs-5">${name}</p>
                <img src="${image_url}" alt="questionnaire image"
                    class="img-fluid align-self-center p-3 mt-0" style="height:200px;">
                <div id="${resultDataID}" class="card-body p-0 m-0 mb-2">
    
                <p class="text-start text-black p-0 mx-3 mb-2 fw-light">Result:0/${max_score}</p>
                <div class="progress mx-3 mb-2">
                    <div class="progress-bar  progress-bar-striped progress-bar-animated" role="progressbar"
                    aria-valuenow="" aria-valuemin="0" aria-valuemax="" style="width: %">
                    </div>
                </div>
    
                </div>
            </div>
            `)

        }
        // const user_id = localStorage.getItem('loggedInUserID')
        var requestBody = {
            userid: loggedInUserID,
            patientid: patientid, 
            user_role: loggedInUserType 
        };
        axios.post(`${baseUrl}/getQnrUserScoreByUser`, requestBody, axiosConfigAuth).then(function (response) {
            console.log("replace")
            for (i = 0; i < response.data.length; i++) {
                const { id, name, max_score, image_url, resultsID, questionnaireID, user_score, date_Taken, user_id } = response.data[i]
                var resultPercentage = (user_score / max_score) * 100
                if (resultPercentage <= 33) {
                    var barColor = "danger"
                } else if (resultPercentage <= 66 && resultPercentage > 33) {
                    var barColor = "warning"
                } else {
                    var barColor = "success"
                }
                var resultDataID = "result" + questionnaireID;
                //i have to append where the questionnaire ids are the same
                $(`#${resultDataID}`).html(`        
                <div id="${resultsID}">
                    <p class="text-start text-black p-0 mx-3 mb-2 fw-light">Result:${user_score}/${max_score}</p>
                    <div class="progress mx-3 mb-2">
                        <div class="progress-bar bg-${barColor} progress-bar-striped progress-bar-animated" role="progressbar"
                        aria-valuenow="${user_score}" aria-valuemin="0" aria-valuemax="" style="width: ${resultPercentage}%">
                        </div>
                    </div>
                </div>
            `)
            }
            $(document).ready(function () {
                $('a').click(function () {
                    var test = $(this).siblings().children()[0].id;
                    console.log(test);
                    localStorage.setItem('resultsID', test);
                })
            })
        })
    })
}

function loadPatientDataForDoctor() {
    axios.get(`${baseUrl}/getAllQnr`).then(function (response) {
        console.log("first")
        qnrCount = response.data.length;
        console.log("number of qnrs: " + qnrCount);

        var patientName = localStorage.getItem('patientName');
        $('#patientName').append(`
        <h2>Viewing results of: ${patientName}</h2>
        `)

        for (i = 0; i < response.data.length; i++) {
            const { id, name, max_score, image_url } = response.data[i]
            var resultDataID = "result" + id;
            var qnrID = id;
            console.log("the qnrID is: " + qnrID);


            // line 22: <a href="detailQuestionnaire.html" id=${qnrID} class="text-decoration-none stretched-link" onclick="sendID(this.id)">
            // </a>

            //progress bar is loaded in as 0/max_score with no values, if there is content, .html() function will replace those values
            $('#questionnaireContent').append(`
            <div class="card flex-column shadow-bottom bg-cards border rounded-4 p-0 m-0 mb-4"
                style="width: 270px; height:290px;">

                <p class="text-start text-black p-0 mx-3 mt-3 mb-0 fs-5">${name}</p>
                <img src="${image_url}" alt="questionnaire image"
                    class="img-fluid align-self-center p-3 mt-0" style="height:200px;">
                <div id="${resultDataID}" class="card-body p-0 m-0 mb-2">
    
                <p class="text-start text-black p-0 mx-3 mb-2 fw-light">Result:0/${max_score}</p>
                <div class="progress mx-3 mb-2">
                    <div class="progress-bar  progress-bar-striped progress-bar-animated" role="progressbar"
                    aria-valuenow="" aria-valuemin="0" aria-valuemax="" style="width: %">
                    </div>
                </div>
    
                </div>
            </div>
            `)

        }
        // const myUrl = new URL(window.location.toLocaleString()).searchParams;
        // var patientid = myUrl.get("patientid");
        var requestBody = {
            userid: loggedInUserID,
            patientid: patientid, 
            user_role: loggedInUserType 
        };
        axios.post(`${baseUrl}/getQnrUserScoreByUser`, requestBody, axiosConfigAuth).then(function (response) {
            console.log("replace")
            for (i = 0; i < response.data.length; i++) {
                const { id, name, max_score, image_url, resultsID, questionnaireID, user_score, date_Taken, user_id } = response.data[i]
                var resultPercentage = (user_score / max_score) * 100
                if (resultPercentage <= 33) {
                    var barColor = "danger"
                } else if (resultPercentage <= 66 && resultPercentage > 33) {
                    var barColor = "warning"
                } else {
                    var barColor = "success"
                }
                var resultDataID = "result" + questionnaireID;
                //i have to append where the questionnaire ids are the same
                $(`#${resultDataID}`).html(`        
                <div id="${resultsID}">
                    <p class="text-start text-black p-0 mx-3 mb-2 fw-light">Result:${user_score}/${max_score}</p>
                    <div class="progress mx-3 mb-2">
                        <div class="progress-bar bg-${barColor} progress-bar-striped progress-bar-animated" role="progressbar"
                        aria-valuenow="${user_score}" aria-valuemin="0" aria-valuemax="" style="width: ${resultPercentage}%">
                        </div>
                    </div>
                </div>
            `)
            }
            $(document).ready(function () {
                $('a').click(function () {
                    var test = $(this).siblings().children()[0].id;
                    console.log(test);
                    localStorage.setItem('resultsID', test);
                })
            })
        })
    })
}

function sendID(clickedQnr) {
    localStorage.setItem('SelectedQnr', clickedQnr);
}

const questionnaireID = localStorage.getItem('SelectedQnr')
console.log("the questionnaire id is: " + questionnaireID);

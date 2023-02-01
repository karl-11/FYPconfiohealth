//paste this line whenever we need api or endpoints
const baseUrl = "http://localhost:3000";

$(document).ready(function () {
    getAllQuestionnaires();
    updateProgressBar();
})

function getAllQuestionnaires() {
    axios.get(`${baseUrl}/getAllQnr`).then(function (response) {
        qnrCount = response.data.length;
        console.log("number of qnrs: " + qnrCount);
        for (i = 0; i < response.data.length; i++) {
            const { id, name, max_score, image_url } = response.data[i]
            var resultID = "result" + id;
            $('#questionnaireContent').append(`
            <div class="card flex-column shadow-bottom bg-cards border rounded-4 p-0 m-0 mb-4"
                style="width: 290px; height:310px;">
                <a href="detailQuestionnaire.html" id=${id} class="text-decoration-none stretched-link" onclick="sendID(this.id)">
                </a>
                <p class="text-start text-black p-0 mx-3 mt-3 mb-0 fs-5">${name}</p>
                <img src="${image_url}" alt="questionnaire image"
                    class="img-fluid align-self-center p-3 mt-0" style="height:200px;">
                <div id="${resultID}" class="card-body p-0 m-0 mb-2">

                </div>
            </div>
            `)
        }
    })
}
function updateProgressBar() {
    const user_id = localStorage.getItem('loggedInUserID')
    console.log("the user id is: " + user_id);
    var requestBody = {
        user_id: user_id
    };
    axios.post(`${baseUrl}/getQnrUserScoreByUser`, requestBody).then(function (response) {
        for (i = 0; i < response.data.length; i++) {
            const { id, name, max_score, image_url, questionnaireID, user_score, date_Taken, user_id } = response.data[i]

            var resultPercentage = (user_score / max_score) * 100
            if (resultPercentage <= 33) {
                var barColor = "danger"
            } else if (resultPercentage <= 66 && resultPercentage > 33) {
                var barColor = "warning"
            } else {
                var barColor = "success"
            }
            //to check if user score has a value
            console.log("user score is: " + user_score);
            var resultID = "result" + questionnaireID;
            //i have to append where the questionnaire ids are the same
            $(`#${resultID}`).append(`        
                    <p class="text-start text-black p-0 mx-3 mb-2 fw-light">Result:${user_score}/${max_score}</p>
                    <div class="progress mx-3 mb-2">
                        <div class="progress-bar bg-${barColor} progress-bar-striped progress-bar-animated" role="progressbar"
                        aria-valuenow="${user_score}" aria-valuemin="0" aria-valuemax="" style="width: ${resultPercentage}%">
                        </div>
                    </div>
                `)
            // if (user_score != null) {

            // }
            //append everything else with 0 values
            // else {
            //     $('#results').append(`        
            //         <p class="text-start text-black p-0 mx-3 mb-2 fw-light">Result:0/${max_score}</p>
            //         <div class="progress mx-3 mb-2">
            //             <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
            //             aria-valuenow="${user_score}" aria-valuemin="0" aria-valuemax="" style="width:%">
            //             </div>
            //         </div>
            //     `)
            // }
        }
    })
}

function sendID(clickedQnr) {
    localStorage.setItem('SelectedQnr', clickedQnr);
}
const questionnaireID = localStorage.getItem('SelectedQnr')
console.log("the questionnaire id is: " + questionnaireID);

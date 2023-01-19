//paste this line whenever we need api or endpoints
const baseUrl = "http://localhost:3000";

$(document).ready(function () {
    const user_id = localStorage.getItem('loggedInUserID')
    console.log("the user id is: " + user_id);
    var requestBody = {
        user_id: user_id
    };
    axios.post(`${baseUrl}/getQnByUser`, requestBody).then(function (response) {

        for (i = 0; i < response.data.length; i++) {
            const { id, name, num_of_questions, user_score, max_score, date_Taken, image_url } = response.data[i]

            var resultPercentage = (user_score / max_score) * 100

            if (resultPercentage <= 33) {
                var barColor = "danger"
            } else if (resultPercentage <= 66 && resultPercentage > 33) {
                var barColor = "warning"
            } else {
                var barColor = "success"
            }

            $('#questionnaireContent').append(`
            <div class="card flex-column shadow-bottom bg-cards border rounded-4 p-0 m-0 col-3 mb-5 me-1">
            <a href="risk_identification.html" id="questionnaire" class="text-decoration-none">
            </a>
            <p class="text-start text-black p-0 mx-3 mt-3 fs-5">${name}</p>
            <img src="${image_url}" alt="questionnaire image"
                class="card-img-top align-self-center p-3">
            <div class="card-body p-0 m-0 mb-2">
                <p class="text-start text-black p-0 mx-3 mb-2 fw-light">Result: ${user_score}/${max_score}</p>
                <div class="progress mx-3 mb-2">
                    <div class="progress-bar bg-${barColor} progress-bar-striped progress-bar-animated" role="progressbar"
                        aria-valuenow="${user_score}" aria-valuemin="0" aria-valuemax="${max_score}" style="width: ${resultPercentage}%"></div>
                </div>
            </div>
        </div>
            `)
        }
    })
        .catch((error) => {
            console.log(error);
        });
})

//paste this line whenever we need api or endpoints
const baseUrl = "http://localhost:3000";

$(document).ready(function () {
    const questionnaireID = localStorage.getItem('SelectedQnr')
    console.log("the questionnaire id is: " + questionnaireID);
    var requestBody = {
        questionnaireID: questionnaireID
    };
    axios.post(`${baseUrl}/getQnsByQnr`, requestBody).then(function (response) {
        for (i = 0; i < response.data.length; i++) {
            const { id, content, max_score } = response.data[i]
            if (id == 1) {
                var activeStatusClass = "carousel-item active"
            } else {
                var activeStatusClass = "carousel-item"
            }
            $('#questionContent').append(`
            <div class="${activeStatusClass}">
            <div class="d-flex flex-nowrap my-5">
                <div class="col-md-2">
                </div>
                <div class="col-md-8 mx-5 py-5 pe-5 align-self-center">
                    <!-- question -->
                    <h4 class="m-0 pb-3"><strong>${content}</strong></h4>
                        <!-- 1-10 ranking buttons -->
                        <div id="buttons">
                        </div>
                </div>
            </div>
            </div>
            `)
        }
        for (i = 0; i < response.data.length; i++) {
            const { id, content, max_score } = response.data[i]
            for (i = 1; i - 1 < max_score; i++) {
                $('#buttons').append(`
                    <button onclick="score()" type="button" class="score_${i} btn btn btn-outline-secondary">${i}</button>
                `)
            }
        }
    })
        .catch((error) => {
            console.log(error);
        });
})


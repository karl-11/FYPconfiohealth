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
            var buttonID = "button" + i;
            if (i == 0) {
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
                        <div class="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
                        <div class="btn-group mr-2" role="group" aria-label="First group">
                        <div id="${buttonID}">
                        </div>
                        </div>
                        </div>
                </div>
            </div>
            </div>
            `)
        }
        for (i = 0; i < response.data.length; i++) {
            const { id, content, max_score } = response.data[i]
            var buttonID = "button" + i;
            for (j = 1; (j - 1) < max_score; j++) {
                $(`#${buttonID}`).append(`
                    <button onclick="score${j}()" type="button" class="btn btn btn-outline-secondary" id="score_${j}">${j}</button>
                `)
            }
            $(document).ready(function () {
                $('button').click(function () {
                    $('button').addClass(' disabled');
                });
            });
            $(document).ready(function () {
                $('.carousel-control-next').click(function () {
                    $('button').removeClass(' disabled');
                });
            });
        }

    })
        .catch((error) => {
            console.log(error);
        });
})
const totalScore = [];
function score1() {
    var button = document.getElementById('score_1');
    var text = button.innerText;
    console.log(text)
    totalScore.push(text);
    console.log(totalScore);
}
function score2() {
    var button = document.getElementById('score_2');
    var text = button.innerText;
    console.log(text)
    totalScore.push(text);
    console.log(totalScore);
}
function score3() {
    var button = document.getElementById('score_3');
    var text = button.innerText;
    console.log(text)
    totalScore.push(text);
    console.log(totalScore);
}
function score4() {
    var button = document.getElementById('score_4');
    var text = button.innerText;
    console.log(text)
    totalScore.push(text);
    console.log(totalScore);
}
function score5() {
    var button = document.getElementById('score_5');
    var text = button.innerText;
    console.log(text)
    totalScore.push(text);
    console.log(totalScore);
}
function score6() {
    var button = document.getElementById('score_6');
    var text = button.innerText;
    console.log(text)
    totalScore.push(text);
    console.log(totalScore);
}
function score7() {
    var button = document.getElementById('score_7');
    var text = button.innerText;
    console.log(text)
    totalScore.push(text);
    console.log(totalScore);
}
function score8() {
    var button = document.getElementById('score_8');
    var text = button.innerText;
    console.log(text)
    totalScore.push(text);
    console.log(totalScore);
}
function score9() {
    var button = document.getElementById('score_9');
    var text = button.innerText;
    console.log(text)
    totalScore.push(text);
    console.log(totalScore);
}
function score10() {
    var button = document.getElementById('score_10');
    var text = button.innerText;
    console.log(text)
    totalScore.push(text);
    console.log(totalScore);
}



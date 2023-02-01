//paste this line whenever we need api or endpoints
const baseUrl = "http://localhost:3000";
const windowUrl = "http://localhost:3001";

$(document).ready(function () {
    const questionnaireID = localStorage.getItem('SelectedQnr')
    console.log("the questionnaire id is: " + questionnaireID);
    var requestBody = {
        questionnaireID: questionnaireID
    };
    axios.post(`${baseUrl}/getQnsByQnr`, requestBody).then(function (response) {

        for (i = 0; i < response.data.length; i++) {
            var questionCount = response.data.length;
            console.log("length is: " + questionCount);
            const { id, content, max_score } = response.data[i]
            var buttonID = "button" + i;
            var currentQn = i + 1;
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
                    <!-- question number -->
                    <div id="questionNumbers">
                        <h5 id="currentQnNumber" class="m-3 position-absolute top-0 end-0"><strong>${currentQn}/${questionCount}</strong></h5>
                    </div>
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

        //function to remove left arrow if on first qn, remove right arrow if on last qn
        $('#nextBtn').click(function () {

            for (i = 0; i < questionCount; i++) {
                var currentQnCheck = i + 1;
                console.log("currentqn is: " + currentQnCheck);
                //this if checks if its the first qn
                if (currentQnCheck == 1) {
                    $('.previous').addClass('visually-hidden');
                }
                //this checks if its the last qn
                else if (currentQnCheck == questionCount) {
                    $('.next').addClass('visually-hidden');
                } else if (currentQnCheck != 1) {
                    $('.previous').removeClass('visually-hidden');

                }
            }
        });
        $('#previousBtn').click(function () {
            // CHECK FOR FIRST QN, FIRST VAR CHECKS WHATS THE CURRENT QN NUMBER, SECOND VAR IS 1/(NUM OF QUESTIONS)
            // var currentQnCheck = document.getElementById("currentQnNumber").innerText;
            // console.log("currentqn is: " + currentQnCheck);
            // var firstQnCheck = "1/" + questionCount;
            // console.log("qnCount is: " + firstQnCheck);

            // if (currentQnCheck == firstQnCheck) {
            //     $('.previous').addClass(' visually-hidden');
            // } else {
            //     document.getElementById("previousBtn").className = "previous";
            // }
        });
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
    $('#submitScore').click(function () {
        const id = localStorage.getItem('SelectedQnr')
        if (totalScore.length == 0) {
            user_score = 0
        } else {
            var user_score = totalScore.reduce(function (a, b) {
                return a + b;
            });
        }
        console.log(user_score);
        var requestBody = {
            id: id,
            user_score: user_score
        };
        axios.post(`${baseUrl}/updateScore`, requestBody).then(function (response) {

        })
        //So it will not crash if the user did not answer any questions, automatically sets the user_score to 0 
        if (totalScore.length == 0) {
            window.location.replace(`${windowUrl}/risk_identification.html`);
        } else {
            window.location.replace(`${windowUrl}/risk_identification.html`);
        }
    })

})
// Array to store the user scores
const totalScore = [];

function score1() {
    var button = document.getElementById('score_1');
    var text = button.innerText;
    console.log(text)
    totalScore.push(parseInt(text));
    console.log(totalScore);
}
function score2() {
    var button = document.getElementById('score_2');
    var text = button.innerText;
    console.log(text)
    totalScore.push(parseInt(text));
    console.log(totalScore);
}
function score3() {
    var button = document.getElementById('score_3');
    var text = button.innerText;
    console.log(text)
    totalScore.push(parseInt(text));
    console.log(totalScore);
}
function score4() {
    var button = document.getElementById('score_4');
    var text = button.innerText;
    console.log(text)
    totalScore.push(parseInt(text));
    console.log(totalScore);
}
function score5() {
    var button = document.getElementById('score_5');
    var text = button.innerText;
    console.log(text)
    totalScore.push(parseInt(text));
    console.log(totalScore);
}
function score6() {
    var button = document.getElementById('score_6');
    var text = button.innerText;
    console.log(text)
    totalScore.push(parseInt(text));
    console.log(totalScore);
}
function score7() {
    var button = document.getElementById('score_7');
    var text = button.innerText;
    console.log(text)
    totalScore.push(parseInt(text));
    console.log(totalScore);
}
function score8() {
    var button = document.getElementById('score_8');
    var text = button.innerText;
    console.log(text)
    totalScore.push(parseInt(text));
    console.log(totalScore);
}
function score9() {
    var button = document.getElementById('score_9');
    var text = button.innerText;
    console.log(text)
    totalScore.push(parseInt(text));
    console.log(totalScore);
}
function score10() {
    var button = document.getElementById('score_10');
    var text = button.innerText;
    console.log(text)
    totalScore.push(parseInt(text));
    console.log(totalScore);
}




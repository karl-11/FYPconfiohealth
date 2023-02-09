//paste this line whenever we need api or endpoints
const baseUrl = "http://localhost:3000";
const windowUrl = "http://localhost:3001";

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
            <div class="${activeStatusClass} carousel-item">
            <div class="d-flex flex-column align-items-center my-5">
              <div class="col-lg-10 col-md-10 col-sm-12 mx-5 py-5 pe-5 align-self-center">
                <!-- question number -->
                <div id="questionNumbers">
                  <h5 id="totalCount" class="m-3 position-absolute top-0 font-size-xsm font-size-md" style="right: 14px;">
                    <strong>${i + 1}</strong>
                  </h5>
                  <h5 id="currentQnNumber" class="m-3 position-absolute top-0 end-0 font-size-xsm font-size-md">
                    <strong>/${questionCount}</strong>
                  </h5>
                </div>
                <!-- question -->
                <h4 class="m-0 pb-3 font-size-xsm font-size-md"><strong>${content}</strong></h4>
                <!-- 1-10 ranking buttons -->
                <div class="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
                  <div class="btn-group mr-2" role="group" aria-label="First group">
                    <div id="${buttonID}" class="d-grid-2 gap-2 d-md-flex justify-content-md-end">
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
        var count = 1
        $('#nextBtn').click(function () {
            // Function to increment count
            document.getElementById('nextBtn').classList.add('visually-hidden')
            count++;
            console.log(count);
        })
        $('.btn').click(function () {
            // Function to increment count
            console.log(count)
            if (count < questionCount) {
                document.getElementById('nextBtn').classList.remove('visually-hidden')
            }
            if (count == questionCount) {
                document.getElementById('nextBtn').classList.add('visually-hidden')
            }
        })
    })
        .catch((error) => {
            console.log(error);
        });

    $('#submitScore').click(function () {
        let resultsID = parseInt(localStorage.getItem('resultsID'));

        let questionnaireID = localStorage.getItem('SelectedQnr');
        let user_id = localStorage.getItem('loggedInUserID');
        console.log(resultsID);
        if (totalScore.length == 0) {
            user_score = 0
        } else {
            var user_score = totalScore.reduce(function (a, b) {
                return a + b;
            });
        }
        console.log(user_score);
        //insert
        var InsertRequestBody = {
            user_score: user_score,
            userid: user_id,
            user_role: loggedInUserType,
            questionnaireID: questionnaireID
        };
        //update
        var requestBody = {
            resultsID: resultsID,
            user_score: user_score,
            userid: user_id,
            user_role: loggedInUserType
        };
        // 2 axios, if results id is null run a pure insert sql , else run the regular code
        if (resultsID == null || isNaN(resultsID)) {
            //pure insert
            axios.post(`${baseUrl}/insertScore`, InsertRequestBody, axiosConfigAuth).then(function (response) {
                if (totalScore.length == 0) {
                    window.location.replace(`${windowUrl}/risk_identification.html`);
                } else {
                    window.location.replace(`${windowUrl}/risk_identification.html`);
                }
            })
            console.log("null and inserted");
        } else {
            //update
            axios.post(`${baseUrl}/updateScore`, requestBody, axiosConfigAuth).then(function (response) {
                if (totalScore.length == 0) {
                    window.location.replace(`${windowUrl}/risk_identification.html`);
                } else {
                    window.location.replace(`${windowUrl}/risk_identification.html`);
                }
                console.log("not null and updated");
            })


        }
        // So it will not crash if the user did not answer any questions, automatically sets the user_score to 0 

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




//paste this line whenever we need api or endpoints
const baseUrl = "http://localhost:3000";

const loggedInUserID = localStorage.getItem("loggedInUserID")

$(document).ready(function () {
    var requestBody = {
        userid: loggedInUserID,
    };

    axios.post(`${baseUrl}/getHealthRisks`, requestBody).then(function (response) {
        for (i = 0; i < response.data.length; i++) {
            const { user_id, user_score, max_score, date_Taken, questionnaireID, name, risks } = response.data[i]
            console.log(response.data);
            var resultPercentage = (user_score / max_score) * 100

            let risksArray = risks.split(",");
            console.log(risksArray);


            let list = document.getElementById("riskList");


            if (resultPercentage <= 33) {
                $('#riskTitle').append(`
                <strong class="text-danger h6">${name}</strong><br>
                `)
                risksArray.forEach((item) => {
                    let li = document.createElement("li");
                    li.innerText = item;
                    list.appendChild(li);
                });
            }
        }

    })
})


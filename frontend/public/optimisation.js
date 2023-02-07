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
            
        }
        // if (resultPercentage <= 33) {
        //     $('#riskList').append(`
        //     <ol type="1">
        //         <li>${risks}</li>
        //     </ol>
        //     `)
        // } else {
        //     $('#riskList').append(`
        //     <p>
        //         You're not in danger!
        //     </p>
        //     `)
        // }
    })
})


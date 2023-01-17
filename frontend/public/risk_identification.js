//paste this line whenever we need api or endpoints
const baseUrl = "http://localhost:3000";

axios.get(`${baseUrl}/riskQuestionnaire`)
    .then((response) => {

        var riskQuestionnaire = ""

        for (i = 0; i < response.data.length; i++) {
            riskQuestionnaire = riskQuestionnaire +
            `<div class="card rounded-2 mb-4 border-0 shadow-bottom">
                <div class="card-header bg-cards">
                        <a class="collapsed btn accordion-button" data-bs-toggle="collapse" href="#${collapsableitemID}">
                            ${data.question}
                        </a>
                    </div>
                <div id="${collapsableitemID}" class="collapse" data-bs-parent="#accordion">
                    <div class="card-body">
                            ${data.answer}
                    </div>
                </div>
            </div>`
        }

        document.getElementById("accordion").innerHTML = riskQuestionnaire

    })
    .catch((error) => {
        console.log(error);
    });
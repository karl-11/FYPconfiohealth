//diable the 5 buttons if the user is not logged in
// redirect them back to the signup page
if (localStorage.getItem("loggedInUserType") === null) {
    document.getElementById("healthProfileButton").href = "Login.html";
    document.getElementById("vitalSignsButton").href = "Login.html";
    document.getElementById("healthReportsButton").href = "Login.html";
    document.getElementById("healthRisksButton").href = "Login.html";
    document.getElementById("medicationOptimisationButton").href = "Login.html";
}

//paste this line whenever we need api or endpoints
const baseUrl = "http://localhost:3000";

axios.get(`${baseUrl}/faqs`)
    .then((response) => {

        var FAQsCardsHTMLString = ""

        for (i = 0; i < response.data.length; i++) {

            console.log("printing faq get response.data" + i);
            console.log(response.data[i]);

            var data = response.data[i];
            var collapsableitemID = "collapse" + i
            var

                FAQsCardsHTMLString = FAQsCardsHTMLString +
                    `<div class="card rounded-2 mb-md-4 mb-2 border-0 shadow-bottom">
                    <div class="card-header bg-cards">
                        <a class="collapsed btn accordion-button font-size-xsm font-size-md" data-bs-toggle="collapse" href="#${collapsableitemID}">
                            ${data.question}
                        </a>
                    </div>
                <div id="${collapsableitemID}" class="collapse font-size-xsm font-size-md" data-bs-parent="#accordion">
                    <div class="card-body">
                            ${data.answer}
                    </div>
                </div>
            </div>`
        }

        document.getElementById("accordion").innerHTML = FAQsCardsHTMLString

    })
    .catch((error) => {
        console.log(error);
    });

function openChat() {
    document.getElementById("chatPage").style.display = "block";
}

function closeChat() {
    document.getElementById("chatPage").style.display = "none";
}
//paste this line whenever we need api or endpoints
const baseUrl = "http://localhost:3000";

const loggedInUserID = localStorage.getItem("loggedInUserID")
// console.log("printing loggedInUserID" + loggedInUserID)

const reqBodyUserID = JSON.stringify({ userid: loggedInUserID });

axiosConfig = {
    headers: {
        'Content-Type': 'application/json'
    }
};

function getHPAllGeneral() {
    axios.post(`${baseUrl}/HPGeneral`, reqBodyUserID, axiosConfig)
        .then((response) => {

            var HPGeneralHTML = ""

            var data = response.data[0];

            var BMI = parseFloat((data.weight / ((data.height / 100) * (data.height / 100)))).toFixed(2)
            var HPGeneralHTML =
                `
                <p id="fullName" class="mb-1">${data.full_name}</p>
                <p id="gender" class="mb-1">${data.gender}</p>
                <p id="age" class="mb-1">${data.age}</p>
                <p id="weight" class="mb-1">${data.weight}</p>
                <p id="height" class="mb-1">${data.height}</p>
                <p id="bmi" class="mb-1">${BMI}</p>
            `

            document.getElementById("HPGeneralInfo").innerHTML = HPGeneralHTML

        })
        .catch((error) => {
            console.log(error);
        });
}

function getAllHPMedical() {

    axios.post(`${baseUrl}/HPMedical`, reqBodyUserID, axiosConfig)
        .then((response) => {

            var HPMedicalHTML = ""

            for (i = 0; i < response.data.length; i++) {

                var data = response.data[i];

                var HPMedicalHTML = HPMedicalHTML +
                    `
                    <li class="mb-1 positionRelative">${data.text} <button class="deleteBtnPosition btnClearStyle" id="${data.id}" onclick="deleteHPMedical(this.id)"><img class="w-75" src="./images/icons8-minus-30.png" alt="deleteBtn"/></button></li>
                `

            }

            document.getElementById("HPMedicalContent").innerHTML = HPMedicalHTML


        })
        .catch((error) => {
            console.log(error);
        });
}

function getAllHPMedication() {
    axios.post(`${baseUrl}/HPMedication`, reqBodyUserID, axiosConfig)
        .then((response) => {

            var HPMedicationHTML = ""

            for (i = 0; i < response.data.length; i++) {

                var data = response.data[i];

                var HPMedicationHTML = HPMedicationHTML +
                    `
                    <li class="mb-1 positionRelative">${data.text} <button class="deleteBtnPosition btnClearStyle" id="${data.id}" onclick="deleteHPMedication(this.id)"><img class="w-75" src="./images/icons8-minus-30.png" alt="deleteBtn"/></button></li>
                `

            }

            document.getElementById("HPMedicationContent").innerHTML = HPMedicationHTML


        })
        .catch((error) => {
            console.log(error);
        });
}


function getAllHPSurgical() {
    axios.post(`${baseUrl}/HPSurgical`, reqBodyUserID, axiosConfig)
        .then((response) => {

            var HPSurgicalHTML = ""

            for (i = 0; i < response.data.length; i++) {

                var data = response.data[i];

                var HPSurgicalHTML = HPSurgicalHTML +
                    `
                    <li class="mb-1 positionRelative">${data.text} <button class="deleteBtnPosition btnClearStyle" id="${data.id}" onclick="deleteHPSurgical(this.id)"><img class="w-75" src="./images/icons8-minus-30.png" alt="deleteBtn"/></button></li>
                `

            }

            document.getElementById("HPSurgicalContent").innerHTML = HPSurgicalHTML


        })
        .catch((error) => {
            console.log(error);
        });
}

function getAllHPDrug() {

    axios.post(`${baseUrl}/HPDrug`, reqBodyUserID, axiosConfig)
        .then((response) => {

            var HPDrugHTML = ""

            for (i = 0; i < response.data.length; i++) {

                var data = response.data[i];

                var HPDrugHTML = HPDrugHTML +
                    `
                    <li class="mb-1 positionRelative">${data.text} <button class="deleteBtnPosition btnClearStyle" id="${data.id}" onclick="deleteHPDrug(this.id)"><img class="w-75" src="./images/icons8-minus-30.png" alt="deleteBtn"/></button></li>
                `

            }

            document.getElementById("HPDrugContent").innerHTML = HPDrugHTML


        })
        .catch((error) => {
            console.log(error);
        });
}

function getAllHPVaccination() {

    axios.post(`${baseUrl}/HPVaccination`, reqBodyUserID, axiosConfig)
        .then((response) => {

            var HPVaccinationHTML = ""

            for (i = 0; i < response.data.length; i++) {

                var data = response.data[i];

                var HPVaccinationHTML = HPVaccinationHTML +
                    `
                    <li class="mb-1 positionRelative">${data.text} <button class="deleteBtnPosition btnClearStyle" id="${data.id}" onclick="deleteHPVaccination(this.id)"><img class="w-75" src="./images/icons8-minus-30.png" alt="deleteBtn"/></button></li>
                `

            }

            document.getElementById("HPVaccinationContent").innerHTML = HPVaccinationHTML


        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteHPMedical(clicked_id) {

    var reqBodyClickedID = JSON.stringify({ id: clicked_id });

    // console.log(reqBodyClickedID);

    axios.post(`${baseUrl}/deleteHPMedical`, reqBodyClickedID, axiosConfig)
        .then((response) => {
            alert("Deleted!")

            //reload the getHPMedical
            getAllHPMedical();
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteHPMedication(clicked_id) {

    var reqBodyClickedID = JSON.stringify({ id: clicked_id });

    // console.log(reqBodyClickedID);

    axios.post(`${baseUrl}/deleteHPMedication`, reqBodyClickedID, axiosConfig)
        .then((response) => {
            console.log(response)
            alert("deleted!")

            //reload the getHPMedical
            getAllHPMedication();
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteHPSurgical(clicked_id) {

    var reqBodyClickedID = JSON.stringify({ id: clicked_id });

    // console.log(reqBodyClickedID);

    axios.post(`${baseUrl}/deleteHPSurgical`, reqBodyClickedID, axiosConfig)
        .then((response) => {
            console.log(response)
            alert("deleted!")

            //reload the getHPMedical
            getAllHPSurgical();
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteHPDrug(clicked_id) {

    var reqBodyClickedID = JSON.stringify({ id: clicked_id });

    // console.log(reqBodyClickedID);

    axios.post(`${baseUrl}/deleteHPDrug`, reqBodyClickedID, axiosConfig)
        .then((response) => {
            console.log(response)
            alert("deleted!")

            //reload the getHPMedical
            getAllHPDrug();
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteHPVaccination(clicked_id) {

    var reqBodyClickedID = JSON.stringify({ id: clicked_id });

    // console.log(reqBodyClickedID);

    axios.post(`${baseUrl}/deleteHPVaccination`, reqBodyClickedID, axiosConfig)
        .then((response) => {
            console.log(response)
            alert("deleted!")

            //reload the getHPMedical
            getAllHPVaccination();
        })
        .catch((error) => {
            console.log(error);
        });
}

function submitHPForm(event) {
    alert("submitted!")

    event.preventDefault();

    //extract the input data text
    var inputText = document.getElementById('textInput').value
    var type = document.getElementById('formType').value

    var reqBody = JSON.stringify({
        userid: loggedInUserID,
        text: inputText
    });

    var endpointURL = 'insert' + type;

    axios.post(`${baseUrl}/${endpointURL}`, reqBody, axiosConfig)
        .then((response) => {
            // console.log(response)
            alert("saved!")

            //reload the specific part of the page
            reloadfunctionName(type);

            cancelBtn(type)
        })
        .catch((error) => {
            console.log(error);
        });
}

function displayTextField(passed_ID) {

    var placeholderId = passed_ID + 'Placeholder'
    var formID = passed_ID + 'Form'
    var submitFunctionName = 'submit' + formID

    console.log("submitFunctionName" + submitFunctionName)

    var formHTML =
        `
    <form id="${formID}">
        <input id="textInput" type="text" required class="form-control-plaintext" placeholder="type here">
        <input type="hidden" id="formType" name="formType" value="${passed_ID}">
        <button type="submit" class="btn btn-primary">Save</button>
        <input type="button" class="btn btn-danger" onClick="cancelBtn()" value="Cancel">
    </form>
    `

    //replace the button with the form 
    document.getElementById(placeholderId).innerHTML = formHTML;

    //add event listener to the form we added just now
    const form = document.getElementById(formID);
    form.addEventListener('submit', submitHPForm);
}

function reloadfunctionName(type) {

    // console.log("type"+type)

    switch (type) {
        case "HPMedical":
            getAllHPMedical();
            break;
        case "HPMedication":
            getAllHPMedication();
            break;
        case "HPSurgical":
            getAllHPSurgical();
            break;
        case "HPDrug":
            getAllHPDrug();
            break;
        case "HPVaccination":
            getAllHPVaccination();
            break;
    }
}

function cancelBtn() {

    console.log("clicked cancel")
    var passed_ID = document.getElementById("formType").value;
    var placeholderId = passed_ID + "Placeholder"

    var btnHTML = `
    <button id="${passed_ID}" class="btnClearStyle"
            onclick="displayTextField(this.id)"><em>add a new line ...</em></button>
    `

    document.getElementById(placeholderId).innerHTML = btnHTML;

}

function getAllInfo() {
    getAllHPDrug();
    getAllHPMedical();
    getAllHPMedication();
    getAllHPSurgical();
    getAllHPVaccination();
    getHPAllGeneral();
}
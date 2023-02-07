//paste this line whenever we need api or endpoints
const baseUrl = "http://localhost:3000";

const loggedInUserID = localStorage.getItem("loggedInUserID")
const loggedInUserType = localStorage.getItem("loggedInUserType")
const token = localStorage.getItem("token")


const myUrl = new URL(window.location.toLocaleString()).searchParams;
var patientid = myUrl.get("patientid");
if (patientid != null && loggedInUserType != "patient") {
    var reqBodyUserID = JSON.stringify({ userid: patientid, user_role: loggedInUserType });
} else {
    // data compilation
    var reqBodyUserID = JSON.stringify({ userid: loggedInUserID, user_role: loggedInUserType });
}

axiosConfig = {
    headers: {
        'Content-Type': 'application/json'
    }
};

axiosConfigAuth = {
    headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + token
    }
}

var docacc = document.getElementById("doctoraccess")
if (patientid != null) {
    console.log(docacc);
    docacc.innerHTML = ""
}
console.log(docacc)
console.log(reqBodyUserID);

function getHPAllGeneral() {
    axios.post(`${baseUrl}/HPGeneral`, reqBodyUserID, axiosConfigAuth)
        .then((response) => {

            // console.log("reponse - " + response);
            // console.log("reponse.data - " + response.data);
            // console.log("reponse.data[0] - " + response.data[0])

            if (response.data[0] === undefined) {

                // console.log("data is empty")

                displayHPGeneralEmptyForm();
            }
            else {

                var HPGeneralHTML = ""

                var data = response.data[0];

                var BMI = parseFloat((data.weight / ((data.height / 100) * (data.height / 100)))).toFixed(2)
                var HPGeneralHTML =
                    `
                        <p id="fullName" class="mb-1">${data.full_name}</p>
                        <p id="gender" class="mb-1">${data.gender}</p>
                        <p id="dob" class="mb-1">${data.dob}</p>
                        <p id="age" class="mb-1">${data.age}</p>
                        <p id="blood" class="mb-1">${data.blood_type}</p>
                        <p id="weight" class="mb-1">${data.weight}</p>
                        <p id="height" class="mb-1">${data.height}</p>
                        <p id="bmi" class="mb-1">${BMI}</p>
                `

                document.getElementById("editHPGeneralFormPlaceholder").innerHTML = HPGeneralHTML

            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function getAllHPMedical() {

    axios.post(`${baseUrl}/HPMedical`, reqBodyUserID, axiosConfigAuth)
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
    axios.post(`${baseUrl}/HPMedication`, reqBodyUserID, axiosConfigAuth)
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
    axios.post(`${baseUrl}/HPSurgical`, reqBodyUserID, axiosConfigAuth)
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

    axios.post(`${baseUrl}/HPDrug`, reqBodyUserID, axiosConfigAuth)
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

    axios.post(`${baseUrl}/HPVaccination`, reqBodyUserID, axiosConfigAuth)
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

    var reqBodyClickedID = JSON.stringify({ userid: loggedInUserID, user_role: loggedInUserType, id: clicked_id });

    // console.log(reqBodyClickedID);

    axios.post(`${baseUrl}/deleteHPMedical`, reqBodyClickedID, axiosConfigAuth)
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

    var reqBodyClickedID = JSON.stringify({ userid: loggedInUserID, user_role: loggedInUserType, id: clicked_id });

    // console.log(reqBodyClickedID);

    axios.post(`${baseUrl}/deleteHPMedication`, reqBodyClickedID, axiosConfigAuth)
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

    var reqBodyClickedID = JSON.stringify({ userid: loggedInUserID, user_role: loggedInUserType, id: clicked_id });

    // console.log(reqBodyClickedID);

    axios.post(`${baseUrl}/deleteHPSurgical`, reqBodyClickedID, axiosConfigAuth)
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

    var reqBodyClickedID = JSON.stringify({ userid: loggedInUserID, user_role: loggedInUserType, id: clicked_id });

    // console.log(reqBodyClickedID);

    axios.post(`${baseUrl}/deleteHPDrug`, reqBodyClickedID, axiosConfigAuth)
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

    var reqBodyClickedID = JSON.stringify({ userid: loggedInUserID, user_role: loggedInUserType, id: clicked_id });

    // console.log(reqBodyClickedID);

    axios.post(`${baseUrl}/deleteHPVaccination`, reqBodyClickedID, axiosConfigAuth)
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

function displayTextField(passed_ID) {

    var placeholderId = passed_ID + 'Placeholder'
    var formID = passed_ID + 'Form'
    var submitFunctionName = 'submit' + formID

    // console.log("submitFunctionName" + submitFunctionName)

    var formHTML =
        `
    <form id="${formID}">
        <input id="textInput" type="text" required class="form-control-plaintext" placeholder="type here">
        <input type="hidden" id="formType" name="formType" value="${passed_ID}">
        <button type="submit" class="btn btn-success">Save</button>
        <input type="button" class="btn btn-danger" onClick="cancelBtn()" value="Cancel">
    </form>
    `

    //replace the button with the form 
    document.getElementById(placeholderId).innerHTML = formHTML;

    //add event listener to the form we added just now
    const form = document.getElementById(formID);
    form.addEventListener('submit', submitHPForm);
}

function submitHPForm(event) {
    // alert("submitted!")

    event.preventDefault();

    //extract the input data text
    var inputText = document.getElementById('textInput').value
    var type = document.getElementById('formType').value

    var reqBody = JSON.stringify({
        userid: loggedInUserID,
        user_role: loggedInUserType,
        text: inputText
    });

    var endpointURL = 'insert' + type;

    axios.post(`${baseUrl}/${endpointURL}`, reqBody, axiosConfigAuth)
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

function displayHPGeneralEditForm() {

    var fullname = document.getElementById("fullName").innerText;
    var gender = document.getElementById("gender").innerText;
    var dob = document.getElementById("dob").innerText;
    var blood = document.getElementById("blood").innerText;
    var age = document.getElementById("age").innerText;
    var weight = document.getElementById("weight").innerText;
    var height = document.getElementById("height").innerText;
    var bmi = document.getElementById("bmi").innerText;

    var HPGeneralHTML =
        `
        <form id="editHPGeneralForm" class="col p-0 pe-5 m-0">
            <p id="fullName" class="mb-1">${fullname}</p>
            <p id="gender" class="mb-1">${gender}</p>
            <p id="dob" class="mb-1">${dob}</p>
            <p id="age" class="mb-1">${age}</p>
            <p id="blood" class="mb-1">${blood}</p>
            <input id="textInputWeight" type="text" class="form-control-plaintext p-0 m-0 mb-1 " value="${weight}">
            <input id="textInputHeight" type="text" class="form-control-plaintext p-0 m-0 mb-1 " value="${height}">
            <p id="bmi" class="mb-1">${bmi}</p>
            <input type="hidden" id="formType" name="formType" value="">
            <button type="submit" class="btn btn-success">Save</button>
            <input type="button" class="btn btn-danger" onClick="HPGeneralcancelBtn()" value="Cancel">
        </form>
            `

    document.getElementById("editHPGeneralFormPlaceholder").innerHTML = HPGeneralHTML;

    const HPGeneralform = document.getElementById("editHPGeneralForm");
    HPGeneralform.addEventListener('submit', submitHPGeneralForm);

    document.getElementById("HPGeneralEditBtn").innerHTML = "";
    document.getElementById("HPGeneralEditBtn").classList.remove("pt-4");

}

function displayHPGeneralEmptyForm() {

    var HPGeneralHTML =
        `
        <form id="editHPGeneralEmptyForm" class="col p-0 pe-5 m-0">
            <input id="textInputName" disabled type="text" class="form-control-plaintext p-0 m-0" value="-">
            <input id="Male" name="textInputGender" type="radio" class=" p-0 m-0" value="M">
            <label for="textInputGenderM">M</label>
            <input id="Female" name="textInputGender" type="radio" class=" p-0 m-0" value="F">
            <label for="htmlF">F</label>
            <input id="textInputDob" type="date" class="p-0 m-0 mb-1">
            <input id="textInputAge" disabled type="text" class="form-control-plaintext p-0 m-0 mb-1" value="-">
            <input id="textInputBlood" type="text" class="form-control-plaintext p-0 m-0 mb-1" value="enter blood type">
            <input id="textInputWeight" type="text" class="form-control-plaintext p-0 m-0 mb-1 " value="enter weight">
            <input id="textInputHeight" type="text" class="form-control-plaintext p-0 m-0 mb-1 " value="enter height">
            <input id="textInputBMI" type="text" disabled class="form-control-plaintext p-0 m-0 mb-1 " value="-">

            <button type="submit" class="btn btn-success">Save</button>
            <input type="button" class="btn btn-danger" onClick="HPGeneralcancelBtn()" value="Cancel">
        </form>
            `

    document.getElementById("editHPGeneralFormPlaceholder").innerHTML = HPGeneralHTML;

    const HPGeneralform = document.getElementById("editHPGeneralEmptyForm");
    HPGeneralform.addEventListener('submit', submitHPGeneralEmptyForm);

    document.getElementById("HPGeneralEditBtn").innerHTML = "";
    document.getElementById("HPGeneralEditBtn").classList.remove("pt-4");

}

function submitHPGeneralEmptyForm(event) {

    event.preventDefault();

    //extract the input data text

    var ele = document.getElementsByName('textInputGender');

    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked)
            var inputTextGender = ele[i].value;
    }

    var inputTextDate = document.getElementById('textInputDob').value
    var inputTextBlood = document.getElementById('textInputBlood').value
    var inputTextWeight = parseFloat(document.getElementById('textInputWeight').value).toFixed(2)
    var inputTextHeight = parseFloat(document.getElementById('textInputHeight').value).toFixed(2)


    // console.log("inputTextGender - " + inputTextGender)
    // console.log("inputTextDate - " + inputTextDate)
    // console.log("inputTextBlood - " + inputTextBlood)
    // console.log("inputTextWeight - " + inputTextWeight)
    // console.log("inputTextHeight - " + inputTextHeight)


    // validate input 

    if (inputTextGender === undefined) {

        // check gender input
        alert("invalid input - Gender - please choose a gender")

    } else {
        if (inputTextBlood.length > 3) {

            // check blood type input
            alert("invalid input - Blood Type - please ensure you type 3 letters or less")

        } else {

            if (inputTextWeight == "" || inputTextWeight == null || inputTextWeight.length < 1 || inputTextHeight == "" || inputTextHeight == null || inputTextHeight.length < 1) {

                alert("invalid input - Blood Type - please input valid values")

            } else {

                // passed all validation checks
                // alert("submitted!")

                var reqBody = JSON.stringify({
                    userid: loggedInUserID, user_role: loggedInUserType,
                    gender: inputTextGender,
                    date_of_birth: inputTextDate,
                    blood_type: inputTextBlood,
                    weight: inputTextWeight,
                    height: inputTextHeight
                });

                axios.post(`${baseUrl}/insertHPGeneral`, reqBody, axiosConfigAuth)
                    .then((response) => {
                        // console.log(response)
                        alert("saved!")

                        //reload the specific part of the page
                        getHPAllGeneral();

                        HPGeneralcancelBtn()
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    }
}

function submitHPGeneralForm(event) {

    event.preventDefault();

    //extract the input data text
    var inputTextWeight = parseFloat(document.getElementById('textInputWeight').value).toFixed(2)
    var inputTextHeight = parseFloat(document.getElementById('textInputHeight').value).toFixed(2)

    // console.log("inputTextWeight - " + document.getElementById('textInputWeight').value)
    // console.log("inputTextWeight - " + document.getElementById('textInputHeight').value)

    // console.log("inputTextWeight rounded - " + inputTextWeight)
    // console.log("inputTextWeight rounded - " + inputTextHeight)


    if (inputTextWeight == "" || inputTextWeight == null || inputTextWeight.length < 1 || inputTextHeight == "" || inputTextHeight == null || inputTextHeight.length < 1) {
        alert("please input valid values")
    }
    else {
        // alert("submitted!")

        var reqBody = JSON.stringify({
            userid: loggedInUserID, user_role: loggedInUserType,
            weight: inputTextWeight,
            height: inputTextHeight
        });

        axios.post(`${baseUrl}/editHPGeneral`, reqBody, axiosConfigAuth)
            .then((response) => {
                // console.log(response)
                alert("saved!")

                //reload the specific part of the page
                getHPAllGeneral();

                HPGeneralcancelBtn()
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

function HPGeneralcancelBtn() {

    console.log("clicked cancel")

    getHPAllGeneral();

    var HPGeneralBtnHTML =
        `
        <button class="btnClearStyle editHPGeneralPosition"
            onclick="displayHPGeneralEditForm()"><em>click here to edit...</em></button>
    `

    document.getElementById("HPGeneralEditBtn").innerHTML = HPGeneralBtnHTML;
    document.getElementById("HPGeneralEditBtn").classList.add("pt-4");

}

function getAllInfo() {
    getAllHPDrug();
    getAllHPMedical();
    getAllHPMedication();
    getAllHPSurgical();
    getAllHPVaccination();
    getHPAllGeneral();
}
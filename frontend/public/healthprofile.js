//paste this line whenever we need api or endpoints
const baseUrl = "http://localhost:3000";

const loggedInUserID = localStorage.getItem("loggedInUserID")
console.log("printing loggedInUserID" + loggedInUserID)

const reqBodyUserID = JSON.stringify({ userid: loggedInUserID });

axiosConfig = {
    headers: {
        'Content-Type': 'application/json'
    }
};

axios.post(`${baseUrl}/HPGeneral`, reqBodyUserID, axiosConfig)
    .then((response) => {

        var HPGeneralHTML = ""

        console.log("printing faq get response.data");
        console.log(response.data[0]);

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

axios.post(`${baseUrl}/HPMedical`, reqBodyUserID, axiosConfig)
    .then((response) => {

        var HPMedicalHTML = ""

        for (i = 0; i < response.data.length; i++) {

            console.log("printing faq get response.data");
            console.log(response.data[i]);

            var data = response.data[i];

            var HPMedicalHTML = HPMedicalHTML +
                `
                    <li id="${data.id}" class="mb-1">${data.text}</li>
                `

        }

        document.getElementById("HPMedical").innerHTML = HPMedicalHTML


    })
    .catch((error) => {
        console.log(error);
    });

axios.post(`${baseUrl}/HPMedication`, reqBodyUserID, axiosConfig)
    .then((response) => {

        var HPMedicationHTML = ""

        for (i = 0; i < response.data.length; i++) {

            console.log("printing faq get response.data");
            console.log(response.data[i]);

            var data = response.data[i];

            var HPMedicationHTML = HPMedicationHTML +
                `
                    <li id="${data.id}" class="mb-1">${data.text}</li>
                `

        }

        document.getElementById("HPMedication").innerHTML = HPMedicationHTML


    })
    .catch((error) => {
        console.log(error);
    });

axios.post(`${baseUrl}/HPSurgical`, reqBodyUserID, axiosConfig)
    .then((response) => {

        var HPSurgicalHTML = ""

        for (i = 0; i < response.data.length; i++) {

            console.log("printing faq get response.data");
            console.log(response.data[i]);

            var data = response.data[i];

            var HPSurgicalHTML = HPSurgicalHTML +
                `
                    <li id="${data.id}" class="mb-1">${data.text}</li>
                `

        }

        document.getElementById("HPSurgical").innerHTML = HPSurgicalHTML


    })
    .catch((error) => {
        console.log(error);
    });

axios.post(`${baseUrl}/HPDrug`, reqBodyUserID, axiosConfig)
    .then((response) => {

        var HPDrugHTML = ""

        for (i = 0; i < response.data.length; i++) {

            console.log("printing faq get response.data");
            console.log(response.data[i]);

            var data = response.data[i];

            var HPDrugHTML = HPDrugHTML +
                `
                    <li id="${data.id}" class="mb-1">${data.text}</li>
                `

        }

        document.getElementById("HPDrug").innerHTML = HPDrugHTML


    })
    .catch((error) => {
        console.log(error);
    });

axios.post(`${baseUrl}/HPVaccination`, reqBodyUserID, axiosConfig)
    .then((response) => {

        var HPVaccinationHTML = ""

        for (i = 0; i < response.data.length; i++) {

            console.log("printing faq get response.data");
            console.log(response.data[i]);

            var data = response.data[i];

            var HPVaccinationHTML = HPVaccinationHTML +
                `
                    <li id="${data.id}" class="mb-1">${data.text}</li>
                `

        }

        document.getElementById("HPVaccination").innerHTML = HPVaccinationHTML


    })
    .catch((error) => {
        console.log(error);
    });
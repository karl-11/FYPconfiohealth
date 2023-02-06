// import FormData from 'https://cdn.jsdelivr.net/npm/form-data@4.0.0/src/index.js';
// import fs from 'https://cdn.jsdelivr.net/npm/fs@0.0.1-security/index.min.js';

// import { FormData } from 'https://cdn.jsdelivr.net/npm/form-data@4.0.0/lib/browser.min.js'

// import fs from 'https://cdn.jsdelivr.net/npm/fs@0.0.1-security/+esm'

// var fs = require ('fs')

//paste this line whenever we need api or endpoints
const baseUrl = "http://localhost:3000";

const loggedInUserID = localStorage.getItem("loggedInUserID")
// console.log("printing loggedInUserID" + loggedInUserID)

const reqBodyUserID = JSON.stringify({ userid: loggedInUserID });

const axiosConfig = {
    headers: {
        'Content-Type': 'application/json'
    }
};

function getAllFolders() {
    axios.post(`${baseUrl}/getAllFoldersForUser`, reqBodyUserID, axiosConfig)
        .then((response) => {

            if (response.data[0] === undefined) {

                console.log("data is empty")

                // displayHPGeneralEmptyForm();
            }
            else {

                var reportFoldersHTML = ""

                for (i = 0; i < response.data.length; i++) {

                    var data = response.data[i];

                    var hrefTag = "folder.html?id=" + data.id + "&folder_name=" + data.folder_name

                    var reportFoldersHTML = reportFoldersHTML +
                        `
                            <a href="${hrefTag}" id="${data.id}" class="feature text-decoration-none col-2 p-0 m-3">
                                <div class="card flex-column shadow-bottom bg-cards border rounded-4 p-0 m-0">
                                    <img src="./images/healthProfile.png" alt="Avatar Logo" class="card-img-top align-self-center p-2">
                                    <div class="card-body p-0 m-0 mb-2">
                                        <p class="text-center text-black p-0 m-0"><strong>${data.folder_name}</strong></p>
                                    </div>
                                </div>
                            </a>                    
                        `

                }

                var addNewFolderPlaceholderHTML =
                    `
                <div id="addNewFolderBtnPlaceholder" class="col-2 p-0 m-3">

                </div>
                `

                reportFoldersHTML = reportFoldersHTML + addNewFolderPlaceholderHTML

                document.getElementById("reports-main-section").innerHTML = reportFoldersHTML

                addNewFolderCard();
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function addNewFolderCard() {

    var addReportFolderHTML =
        `
        <a id="" class="feature text-decoration-none "
            onclick="displayAddNewFolderForm()">
            <div id="addBtnCard" class="btnClearStyle">
                <div class="card flex-column shadow-bottom bg-cards border rounded-4 p-0 m-0">
                    <img src="./images/icons8-plus.png" alt="Avatar Logo"
                        class="card-img-top align-self-center p-2">
                    <div class="card-body p-0 m-0 mb-2">
                        <p class="text-center text-black p-0 m-0"><strong>Add a new folder</strong></p>
                    </div>
                </div>
            </div>
        </a>
        `
    document.getElementById("addNewFolderBtnPlaceholder").innerHTML = addReportFolderHTML

}

function displayAddNewFolderForm() {

    var addNewFolderFormHTML =
        `
            <div class="card flex-column shadow-bottom bg-cards border rounded-4 p-0 m-0">
                <img src="./images/healthProfile.png" alt="Avatar Logo" class="card-img-top align-self-center p-2">
                <div class="card-body p-0 m-0">
                    <form id="addNewFolderForm" class="p-2 m-2">
                        <input id="folder_name" type="text" required class="form-control-plaintext"
                            placeholder="folder name">
                        <button type="submit" class="btn btn-success">Save</button>
                        <input type="button" class="btn btn-danger" onClick="addNewFolderCard()" value="Cancel">
                    </form>
                </div>
            </div>
    `

    document.getElementById("addNewFolderBtnPlaceholder").innerHTML = addNewFolderFormHTML

    //add event listener to the form we added just now
    const form = document.getElementById('addNewFolderForm');
    form.addEventListener('submit', submitNewFolderForm);

}

function submitNewFolderForm(event) {
    // alert("submitted!")

    event.preventDefault();

    //extract the input data text
    var folder_name = document.getElementById('folder_name').value

    var reqBody = JSON.stringify({
        userid: loggedInUserID,
        folderName: folder_name
    });

    axios.post(`${baseUrl}/insertFolder`, reqBody, axiosConfig)
        .then((response) => {
            // console.log(response)
            alert("saved!")

            //reload the whole page
            getAllFolders();

        })
        .catch((error) => {
            console.log(error);
        });
}

function viewFolder() {

    const urlParams = new URLSearchParams(window.location.search);
    const folder_id = urlParams.get('id');
    const folder_name = urlParams.get('folder_name')

    var reqBody = JSON.stringify({
        folder_id: folder_id
    });

    document.getElementById('deleteBtn').setAttribute("id", "folder_id")
    // console.log("viewFOlder" + folder_id +" clicked")

    document.getElementById('folderName').innerText = folder_name

    axios.post(`${baseUrl}/getFilesInsideFolder`, reqBody, axiosConfig)
        .then((response) => {

            if (response.data[0] === undefined) {

                console.log("data is empty")

                var addNewFilePlaceholderHTML =
                    `
                <div id="addNewFileBtnPlaceholder" class="col-2 p-0 m-3">

                </div>
                `

                document.getElementById("folder-main-section").innerHTML = addNewFilePlaceholderHTML

                addNewFileCard();

            }
            else {

                var insideFolderHTML = ""

                for (i = 0; i < response.data.length; i++) {

                    var data = response.data[i];

                    // get the file type
                    var fileType = data.file_type.split('/')[0]

                    var hrefTag = "viewReport.html?id=" + data.id + "&file_name=" + data.display_name

                    // if file type is image, display the image inside the card
                    if (fileType == 'image') {
                        var insideFolderHTML = insideFolderHTML +
                            `
                            <a href="${hrefTag}" id="${data.id}" class="feature text-decoration-none col-2 p-0 m-3">
                                <div class="card flex-column shadow-bottom bg-cards border rounded-4 p-0 m-0">
                                    <img src="./uploads/${data.file_name}" alt="Avatar Logo" style="max-width: 100%; max-height: 100%;
                                    height: auto;" class="card-img-top align-self-center p-2">
                                    <div class="card-body p-0 m-0 mb-2">
                                        <p class="text-center text-black p-0 m-0"><strong>${data.display_name}</strong></p>
                                    </div>
                                </div>
                            </a>               
                        `
                    }
                    // else if file type is pdf, display the default report image inside the card
                    else {
                        var insideFolderHTML = insideFolderHTML +
                            `
                            <a href="${hrefTag}" id="${data.id}" class="feature text-decoration-none col-2 p-0 m-3">
                                <div class="card flex-column shadow-bottom bg-cards border rounded-4 p-0 m-0">
                                    <img src="./images/healthProfile.png" alt="Avatar Logo" style="max-width: 100%; max-height: 100%;
                                    height: auto;" class="card-img-top align-self-center p-2">
                                    <div class="card-body p-0 m-0 mb-2">
                                        <p class="text-center text-black p-0 m-0"><strong>${data.display_name}</strong></p>
                                    </div>
                                </div>
                            </a>               
                        `
                    }

                }

                var addNewFilePlaceholderHTML =
                    `
                <div id="addNewFileBtnPlaceholder" class="col-2 p-0 m-3">

                </div>
                `

                insideFolderHTML = insideFolderHTML + addNewFilePlaceholderHTML

                document.getElementById("folder-main-section").innerHTML = insideFolderHTML

                addNewFileCard();

            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function viewFolder2() {

    const urlParams = new URLSearchParams(window.location.search);
    const folder_id = urlParams.get('id');
    const folder_name = urlParams.get('folder_name')

    var reqBody = JSON.stringify({
        folder_id: folder_id
    });

    // document.getElementById('deleteBtn').setAttribute("id", "folder_id")
    // console.log("viewFOlder" + folder_id +" clicked")

    document.getElementById('folderName').innerText = folder_name

    axios.post(`${baseUrl}/getFilesInsideFolder`, reqBody, axiosConfig)
        .then((response) => {

            if (response.data[0] === undefined) {

                console.log("data is empty")

                // displayHPGeneralEmptyForm();
            }
            else {

                var insideFolderHTML = ""

                for (i = 0; i < response.data.length; i++) {

                    var data = response.data[i];

                    // get the file type
                    var fileType = data.file_type.split('/')[0]

                    var hrefTag = "viewReport.html?id=" + data.id + "&file_name=" + data.display_name

                    // if file type is image, display the image inside the card
                    if (fileType == 'image') {
                        var insideFolderHTML = insideFolderHTML +
                            `
                            <a href="${hrefTag}" id="${data.id}" class="feature text-decoration-none col-2 p-0 m-3">
                                <div class="card flex-column shadow-bottom bg-cards border rounded-4 p-0 m-0">
                                    <img src="./uploads/${data.file_name}" alt="Avatar Logo" style="max-width: 100%; max-height: 100%;
                                    height: auto;" class="card-img-top align-self-center p-2">
                                    <div class="card-body p-0 m-0 mb-2">
                                        <p class="text-center text-black p-0 m-0"><strong>${data.display_name}</strong></p>
                                    </div>
                                </div>
                            </a>               
                        `
                    }
                    // else if file type is pdf, display the default report image inside the card
                    else {
                        var insideFolderHTML = insideFolderHTML +
                            `
                            <a href="${hrefTag}" id="${data.id}" class="feature text-decoration-none col-2 p-0 m-3">
                                <div class="card flex-column shadow-bottom bg-cards border rounded-4 p-0 m-0">
                                    <img src="./images/healthProfile.png" alt="Avatar Logo" style="max-width: 100%; max-height: 100%;
                                    height: auto;" class="card-img-top align-self-center p-2">
                                    <div class="card-body p-0 m-0 mb-2">
                                        <p class="text-center text-black p-0 m-0"><strong>${data.display_name}</strong></p>
                                    </div>
                                </div>
                            </a>               
                        `
                    }

                }

                var addNewFilePlaceholderHTML =
                    `
                <div id="addNewFileBtnPlaceholder" class="col-2 p-0 m-3">

                </div>
                `

                insideFolderHTML = insideFolderHTML + addNewFilePlaceholderHTML

                document.getElementById("folder-main-section").innerHTML = insideFolderHTML

                addNewFileCard();

            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function addNewFileCard() {

    var addReportHTML =
        `
        <a id="" class="feature text-decoration-none "
            onclick="displayAddNewFileForm()">
            <div id="addFileBtnCard" class="btnClearStyle">
                <div class="card flex-column shadow-bottom bg-cards border rounded-4 p-0 m-0">
                    <img src="./images/icons8-plus.png" alt="Avatar Logo"
                        class="card-img-top align-self-center p-2">
                    <div class="card-body p-0 m-0 mb-2">
                        <p class="text-center text-black p-0 m-0"><strong>Upload report</strong></p>
                    </div>
                </div>
            </div>
        </a>
        `
    document.getElementById("addNewFileBtnPlaceholder").innerHTML = addReportHTML

}

function addNewFileCard2() {

    document.getElementById("addNewFileBtnPlaceholder").classList.remove("col-3")

    document.getElementById("addNewFileBtnPlaceholder").classList.add("col-2")

    var addReportHTML =
        `
        <a id="" class="feature text-decoration-none "
            onclick="displayAddNewFileForm()">
            <div id="addFileBtnCard" class="btnClearStyle">
                <div class="card flex-column shadow-bottom bg-cards border rounded-4 p-0 m-0">
                    <img src="./images/icons8-plus.png" alt="Avatar Logo"
                        class="card-img-top align-self-center p-2">
                    <div class="card-body p-0 m-0 mb-2">
                        <p class="text-center text-black p-0 m-0"><strong>Upload report</strong></p>
                    </div>
                </div>
            </div>
        </a>
        `
    document.getElementById("addNewFileBtnPlaceholder").innerHTML = addReportHTML

}

function displayAddNewFileForm() {

    document.getElementById("addNewFileBtnPlaceholder").classList.remove("col-2")

    document.getElementById("addNewFileBtnPlaceholder").classList.add("col-3")


    var addNewFileFormHTML =
        `
            <div class="card flex-column shadow-bottom bg-cards border rounded-4 p-0 m-0">
                <img src="./images/healthProfile.png" alt="Avatar Logo" class="card-img-top align-self-center p-2">
                <div class="card-body p-0 m-0">
                    <form id="addNewFileForm" class="p-2 m-2" enctype="multipart/form-data">
                    
                        <input id="input_file" class="form-control" type="file" required name="input_file">

                        <input id="fileName" type="text" required class="form-control text-center"
                            placeholder="report name">
                        <button type="submit" class="btn btn-success">Save</button>
                        <input type="button" class="btn btn-danger" onClick="addNewFileCard2()" value="Cancel">
                    </form>
                </div>
            </div>
    `

    document.getElementById("addNewFileBtnPlaceholder").innerHTML = addNewFileFormHTML

    //add event listener to the form we added just now
    const form = document.getElementById('addNewFileForm');
    form.addEventListener('submit', submitNewFileForm);

}

function submitNewFileForm(event) {
    alert("submitted!")

    event.preventDefault();

    // new FormData(document.getElementById('addNewFileForm'))

    //extract the input data text
    var file = document.getElementById('input_file').files[0]
    var fileName = document.getElementById('fileName').value

    const urlParams = new URLSearchParams(window.location.search);
    const folderid = urlParams.get('id');

    var bodyFormData = new FormData(document.getElementById('addNewFileForm'));

    bodyFormData.append('fileName', fileName);
    bodyFormData.append('folder_id', folderid);
    bodyFormData.append('user_id', loggedInUserID);

    axios.post(`${baseUrl}/uploadFile`, bodyFormData, { headers: { "Content-Type": "multipart/form-data" } })
        .then((response) => {

            alert("saved!")
            viewFolder2();
        })
        .catch((error) => {
            console.log(error);
        });
}

function viewFile() {

    const urlParams = new URLSearchParams(window.location.search);
    const file_id = urlParams.get('id');
    const file_name = urlParams.get('file_name');

    document.getElementById('fileName').innerText = file_name

    var reqBody = JSON.stringify({
        file_id: file_id
    });

    axios.post(`${baseUrl}/getFile`, reqBody, axiosConfig)
        .then((response) => {

            if (response.data[0] === undefined) {

                console.log("data is empty")

                // displayHPGeneralEmptyForm();
            }
            else {

                var data = response.data[0];

                var fileHTML =
                    `
                                <img style="max-width: 75%;" src="./uploads/${data.file_name}" alt="Avatar Logo">
                            `

                document.getElementById("fileplaceholder").innerHTML = fileHTML

            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteFolder() {

    const urlParams = new URLSearchParams(window.location.search);
    const folder_id = urlParams.get('id');

    var reqBody = JSON.stringify({
        id: folder_id
    });

    axios.post(`${baseUrl}/deleteFolder`, reqBody, axiosConfig)
        .then((response) => {
            alert("Folder Deleted!")

            history.go(-1)

            //viewFolder();
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteReport() {

    const urlParams = new URLSearchParams(window.location.search);
    const file_id = urlParams.get('id');

    var reqBody = JSON.stringify({
        id: file_id
    });

    axios.post(`${baseUrl}/deleteFile`, reqBody, axiosConfig)
        .then((response) => {
            alert("File Deleted!")

            history.go(-1)

            //viewFolder();
        })
        .catch((error) => {
            console.log(error);
        });
}
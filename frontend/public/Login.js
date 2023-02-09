const baseUrl = "http://localhost:3000";

const form = document.getElementById('login-form');

form.addEventListener('submit', (event) => {
    // handle the form data
    // prevent page reload
    event.preventDefault();

    // data extraction
    const email = document.getElementById('email').value;
    const password = document.getElementById('pwd').value;

    // data compilation
    const requestBody = {
        email: email,
        password: password
    };

    console.log("---------------- compiled data -----------");
    console.log(requestBody);

    axios.post(`${baseUrl}/login`, requestBody)
        .then((response) => {
            const token = response.data.token;
            console.log("========= login response ==========")
            console.log(response.data)

            const loggedInUserID = response.data.user_id;
            const loggedInUserType = response.data.user_role;

            localStorage.setItem("token", token);
            localStorage.setItem("loggedInUserID", loggedInUserID);
            localStorage.setItem("loggedInUserType", loggedInUserType);

            if (loggedInUserType == "doctor") {
                window.location.href = "/doctorpage.html";
            } else if (loggedInUserType == "admin"){
                window.location.href = "/adminpage.html";
            } else if (loggedInUserType == "admin") {
                window.location.href = "/doctorSignup.html"
            }
            else {
                window.location.href = "/";
            }

        })
        .catch((error) => {
            alert("invalid login")
            console.log(error);
        });
});

const baseUrl = "http://localhost:3000";

const form = document.getElementById('signup-form');

form.addEventListener('submit', (event) => {
    // handle the form data
    // prevent page reload
    event.preventDefault();

    // data extraction
    const fullname = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('pwd').value;


    // data compilation
    const requestBody = {
        full_name: fullname,
        email: email,
        password: password
    };

    console.log("---------------- compiled data -----------");
    console.log(requestBody);

    axios.post(`${baseUrl}/doctorsignup`, requestBody)
        .then((response) => {
            const token = response.data.token;
            console.log("========= signup response ==========")
            console.log(response.data)
            location.reload();
        })
        .catch((error) => {
            console.log(error);
        });
});
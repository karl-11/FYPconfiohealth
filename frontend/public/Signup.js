const baseUrl = "http://34.224.225.183:3000";

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

    axios.post(`${baseUrl}/signup`, requestBody)
        .then((response) => {
            const token = response.data.token;
            console.log("========= signup response ==========")
            console.log(response.data)
            window.location.href = "/login";
        })
        .catch((error) => {
            console.log(error);
        });
});
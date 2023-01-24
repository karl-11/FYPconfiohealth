//paste this line whenever we need api or endpoints
const baseUrl = "http://localhost:3000";

$(document).ready(function () {
    const QnrID = localStorage.getItem('SelectedQnr')
    console.log("the questionnaire id is: " + QnrID);
    // var requestBody = {
    //     QnrID: user_id
    // };
    axios.post(`${baseUrl}/getQnsByQnr`, requestBody).then(function (response) {

        for (i = 0; i < response.data.length; i++) {
            const { id, name, user_score, max_score, date_Taken, image_url } = response.data[i]

            $('#questionnaireContent').append(`
            <div class="card flex-column shadow-bottom bg-white border rounded-4 p-0 m-0 mb-5 me-1">
            <div id="demo" class="carousel slide rounded-4 shadow">
                <!-- Indicators/dots -->
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="0"
                        class="active bg-beige"></button>
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="1" class="bg-beige"></button>
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="2" class="bg-beige"></button>
                </div>
                <!-- The slideshow/carousel -->
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <div class="d-flex flex-nowrap">
                            <div class="col-md-12 mx-5 py-5 pe-5 align-self-center">
                                <!-- question -->
                                <h4 class="m-0 pb-3"><strong>Useful Title</strong></h2>
                                    <!-- 1-10 ranking buttons -->
                                    <p class="m-0">
                                        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                                        Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet,ante.
                                        Donec eulibero sit amet quam egestas semper.quam, feugiat vitae, ultricies eget,
                                        tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.Aenean
                                    </p>
                            </div>
                        </div>
                    </div>
                    </div>
                        <!-- Left and right controls/icons -->
                        <button class="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon"></span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                            <span class="carousel-control-next-icon"></span>
                        </button>
                    </div>
                    <!-- end of carousel -->
            `)
        }
    })
        .catch((error) => {
            console.log(error);
        });
})

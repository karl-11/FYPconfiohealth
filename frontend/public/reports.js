function getreport() {
    // data extraction
    const userid = localStorage.getItem('loggedInUserID');
  
    // data compilation
    const requestBody = {
      userid: userid,
    };
  
    console.log(requestBody);
  
    axios.post(`${baseUrl}/reportfolder`, requestBody)
      .then((response) => {
        console.log("report folders loaded")
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  
  }
  
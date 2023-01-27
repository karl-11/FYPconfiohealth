//end point to insert new health profile Vaccination record
app.post('/insertHPVaccination', printDebugInfo, function (req, res) {

    //extract data from request body
    var userid = req.body.userid;
    var text = req.body.text;

    hp.insertHPVaccination(userid, text, function (err, result) {
        if (!err) {
            var output = {
                "inserted id": result.insertId
            };
            res.status(201).send(output);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});

app.delete('/deleteHPVaccination', printDebugInfo, function (req, res){

     //extract data from request body
     var id = req.body.id;

     hp.deleteHPVaccination(id, function (err, result) {
        if (!err) {
            var output = {
                "affected rows": result.affectedRows
            };
            res.status(200).send(output);
        } else {
            res.status(500);
            console.log("error");
        }
    });
});
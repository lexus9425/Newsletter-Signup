const express = require("express");
const request = require("request");
const https = require("https");
const { dirname } = require("path");

const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "";

    const options = {
        method: "POST",
        auth: ""
    }

    const request = https.request(url, options, function(response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });

    //request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res) {
    res.redirect("/");
});

app.listen(port, function() {
    console.log("Server started on port 3000");
}); 

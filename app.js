
//jshint esversion:6

const express = require("express");

//no need to install, because native already in node module
const https = require("https");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) =>{
//get from the index.html file
  res.sendFile(__dirname + "/index.html");

  app.post("/", (req, res)=>{
    const query = req.body.cityName;
    const apiKey = "7e7c2f4abf8578495b59fb6ebc9c0179#";
    const unit = "metric";
    const url ="https://api.openweathermap.org/data/2.5/weather?q=" + query +"&units=" + unit +"&appid=" + apiKey;

    https.get(url, (response) =>{
      console.log(response.statusCode);

      response.on("data", (d) =>{

        //convert to javescript object using JSON.parse
        const weatherData = JSON.parse(d);

        //tapping into specific obj list
        const temp = weatherData.main.temp;
        //console.log(temp);

        const weatherDescription = weatherData.weather[0].description;
        //console.log(weatherDescription);

        const weatherIcon = weatherData.weather[0].icon;
        //const imageURL ="...."

        res.write("<h1>The temperature in "+ query + " is "+ temp + " degrees C.<h1>");
        res.write("<p>The weather description in " + query + " is "+ weatherDescription +"<p>");
        //if we use an image:
        //res.write("<img src=" + imageURL +">");

        res.send();

  });




      //opposite of JSON.parse is JSON.stringify
/* const object ={
        name: "Zainab",
        favouriteFood: "noodles"
      };
      console.log(JSON.stringify(object));*/
    });
});

});

app.listen(3000, function(){
  console.log("connected on port 3000!");
});

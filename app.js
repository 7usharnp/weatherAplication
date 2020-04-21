

const express = require("express");
const https = require ("https");
const bodyParser =require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
  res.sendFile("/index.html");

})

app.post("/", function(req,res){


  const query =req.body.CityName;
  const unit = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid=a7ba974250d5500c86453eff4479dd5a";

  https.get(url, function(response){
    console.log(response);
    response.on("data", function(data){
    const weatherData = JSON.parse(data);
    console.log("weatherData");
     const temp = weatherData.main.temp;
     icon = weatherData.weather[0].icon;
     const desc = weatherData.weather[0].description;
     const imgURL = "https://api.openweathermap.org/img/wn/"+icon+"@2x.png";
    res.write("<h1>The temprature in "+ query +" is "+ temp +" degree celcius.</h1>");
    res.write("<h2> The weather is currently "+ desc + ". ");
    res.write("<img src="+imgURL+">");
    res.send();

    })

  })


  })





app.listen(3000, function(){
  console.log("Connected to server .......");
})

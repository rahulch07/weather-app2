const express = require('express');
const axios = require('axios');
const bodyParser = require("body-parser");
const request = require("request");
const { response } = require('express');
const app = express();
const cors = require('cors');




app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(cors());


app.get('/:currentPage', function(req, res) {

    // Get city name passed in the form
    const API_KEY = 'f9d0d2fd90eec3a3eaee842cda1af50d';
    const cityIds = '1279233,1277333,1264527,1273294,1269843,1269519,1267995,1275004,1275339,1259229,1255364,5879400,4347426,4887398,4684888,5419384,5856195,4699066,5363429,5368361,4164138,5128581,5380748,4560349,5308655,4726206,5391811,5391959,5392171,5392400';
    
   //const cities = 'london,mumbai,tokyo';

    // Use that city name to fetch data
    // Use the API_KEY in the '.env' file

   
    const perPage = 10;
  const page = req.params.currentPage || 1;
  console.log(page);

  let start = (page - 1) * perPage;
  let end = start + perPage;

  let url = `https://api.openweathermap.org/data/2.5/group?id=${cityIds.split(",").slice(start, end).join(",")}&appid=${API_KEY}`;

    // Request for data using the URL
    request(url, function(err, response, body) {

        // On return, check the json data fetched
        if (err) {
            res.render('index', { weather: null, error: 'Error, please try again' });
        } else {
            //console.log(body);
            let weather = JSON.parse(body);
            //let paginatedWeather = weather.list.slice(0, 10);
            //console.log(paginatedWeather);

            // you shall output it in the console just to make sure that the data being displayed is what you want
            
                res.json(weather);
                
              }
          }
      );
  });

  app.listen(5000, function () {
    console.log("Weather app listening on port 5000!");
  });
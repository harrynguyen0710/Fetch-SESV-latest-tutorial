const express = require('express');  // import express framework to use relavant objects and methods
const cors = require('cors'); // import cors to use cross orgin resouce sharing
const fetch = require('node-fetch'); // import fetch for fetching
const app = express(); // create express object

// use cors to fetch api
app.use(cors())

/*
input: 
  + a defined url
  + an async method
process: 
  + fetch api and convert the response to be JSON data and return json data if it's successful
  + return http 500 status if fails
output:
  + json data if fetch successfully
  + else return a json with a message
*/
app.get('/proxy', async (req, res) => {
  // define the api url where the endpoint fetching data
  const apiUrl = 'https://www.sesvtutorial.com/page-data/tutorials/page-data.json';

  try {
    // fetch data from the api url
    const response = await fetch(apiUrl);
    // convert response to be Json object
    const data = await response.json();
    // return the json result
    res.json(data);
  } catch (error) {
    // return 500 status error with a message if an error occurs 
    res.status(500).json({ error: 'Error fetching data' });
  }
});

/*
input:
  + port number
  + a method
process:
  + start a web server on port 3000 and print a successful message on the console
output: none
*/
app.listen(3000, () => {
  console.log('Proxy server running on port 3000');
});

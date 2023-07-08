const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const apiResponse = require('./meaningCloudAPI.js')
const bodyParser = require('body-parser')
const cors = require('cors');
projectData = {};
clientData = {};


console.log(`Your API key is ${process.env.API_KEY}`);
const app = express()
app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('dist'));

console.log('dirName:' , __dirname);

app.get('/', function (req, res) {  
    res.sendFile('dist/index.html')
})

app.get('/test', function (req, res) {  
    apiDataProcess().then((projectData) => {
        res.send(projectData);
    });
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

const apiDataProcess = async () => {
    const formdata = new FormData();
    formdata.append("key", process.env.API_KEY);
    formdata.append("txt", projectData.text);
    formdata.append("lang", "en");  // 2-letter code, like en es fr ...

    const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };
    let queryString = "https://api.meaningcloud.com/sentiment-2.1" + '?txt=' + formdata.get("txt") + '&lang=' + "en" + '&key=' + formdata.get("key")    
    const response = await fetch(queryString, requestOptions);
    try {
        const data = await response.json();    
        return data;
    }
    catch (error) {
        console.log('error', error);
    }
}

app.post('/dist/index.html', postData);

function postData(req, res) {     
    newEntry = {
        polarity: req.body.polarity,
        subjectivity: req.body.subjectivity,
        text: req.body.text
    }
  projectData = newEntry;
  res.send(projectData);
}


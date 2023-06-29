const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
//const mockAPIResponse = require('./mockAPI.js')
const apiResponse = require('./meaningCloudAPI.js')
const bodyParser = require('body-parser')
const cors = require('cors');
projectData = {};


console.log(`Your API key is ${process.env.API_KEY}`);
const app = express()
app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('dist'));

console.log('dirName:' + __dirname);

app.get('/', function (req, res) {
    console.log('here');
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})


// app.get('/test', function (req, res) {
//     res.send(mockAPIResponse)
// })






const apiDataProcess = async () => {
    const formdata = new FormData();
    formdata.append("key", process.env.API_KEY);
    formdata.append("txt", "YOUR TEXT happy HERE");
    formdata.append("lang", "en");  // 2-letter code, like en es fr ...

    const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    const response = await fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions);
    try {
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.log('error', error);
    }
}

app.get('/test', function (req, res) {
    console.log("Here 2");
    console.log(projectData);
    apiDataProcess().then((projectData) => {
        res.send(projectData);
    });
});


// .then(function(res) {        
//     document.getElementById('results').innerHTML = res;
//     })

// app.post('/dist/index.html', postData);

// function postData(req, res) {
//       console.log("req Body: " + req.body);
//     newEntry = {
//         temperature: req.body.FormData,
//         date: req.body.date,
//         userResponse: req.body.userResponse,
//         cityName: req.body.cityName
//     }
//     projectData = newEntry;
//     res.send(projectData);
// }


function handleSubmit(event) {
  event.preventDefault()


  // const formdata = new FormData();
  // formdata.append("key", "9a8415c3fcdb1ec648a1842a749f8455");
  // formdata.append("txt", "YOUR TEXT happy HERE");
  // formdata.append("lang", "en");  // 2-letter code, like en es fr ...

  // const requestOptions = {
  //   method: 'POST',
  //   body: formdata,
  //   redirect: 'follow'
  // };

  // const response = fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions)
  //   .then(response => ({
  //     status: response.status, 
  //     body: response.json()  
  //   }))
  //   .then(({ status, body }) => console.log(status, body))
  //   .then(function(res) {        
  //          document.getElementById('results').innerHTML = res;
  //          })
  //   .catch(error => console.log('error', error));

  // check what text was put into the form field
  let formText = document.getElementById('name').value
  Client.checkForName(formText)

  console.log("::: Form Submitted :::")
  updateUI();

  //   getResult(formText).then(function (projectData) {
  //         // Add data      
  //     console.log("projectData:"+ projectData);    
  //     postData('/dist/index.html', { polarity: projectData.score_tag, subjectivity: projectData.subjectivity, text: formText });
  //     updateUI();
  // })

  // fetch('https://api.meaningcloud.com/sentiment-2.1')
  // .then(res => res.json())
  // .then(function(res) {
  //   console.log("res0" + res);
  //     document.getElementById('results').innerHTML = res.message
  // })    

  // console.log("res: " + res);



  const postData = async (url = baseURL, data = {}) => {

    const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });

    try {
      const newData = await response.json();
      return newData
    } catch (error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }



}

const updateUI = async () => {
  const request = await fetch('/test')
  try {   
    const allData = await request.json()
    console.log(allData);
    const sentenceList = allData["sentence_list"];
    for (let index = 0; index < sentenceList.length; index++) {
      const element = sentenceList[index];    
      const userText = element["text"];
      document.getElementById('textId').innerHTML = userText;     
      const polarity = element["score_tag"];
      console.log(polarity);
    

      document.getElementById('polarId').innerHTML = ConvertPolarity(polarity);
    }

    const subjectivity = allData["subjectivity"];
    // console.log("here46");
    // console.log(subjectivity);
   // document.getElementById('results').innerHTML = allData["subjectivity"];
   
    document.getElementById('subjId').innerHTML = allData["subjectivity"];
    
    
  }
  catch (error) {
    console.log("error", error);
  }

}

function ConvertPolarity(pConst) {
  switch (pConst) {
    case "P+":
      return 'strong positive';     
    
    case "P":
      return 'positive';      

    case "NEU":
        return 'neutral';        

    case "N":
      return 'negative';

    case "N+":
        return 'strong negative';  
     
    case "NONE":
          return 'without polarity';
  }

}

// `${baseURL}?key=${process.env.API_KEY}&lang=auto&url=${url}`
// const res = await fetch("https://api.meaningcloud.com/sentiment-2.1"+'?key='+ process.env.API_KEY)
//const res = await fetch("https://api.meaningcloud.com/sentiment-2.1'" + '?formText=' + formText + '&key=' + process.env.API_KEY)
const getResult = async (formText) => {
  console.log("here3");
  const res = await fetch("https://api.meaningcloud.com/sentiment-2.1")

  try {
    const data = await res.json();
    console.log(data)
    return data;
  } catch (error) {

    console.log("error", error);
  }
}

function onBlur() { }

export { handleSubmit, onBlur }

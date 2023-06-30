let baseURL = "https://api.meaningcloud.com/sentiment-2.1";
const apiKey = "9a8415c3fcdb1ec648a1842a749f8455";

function handleSubmit(event) {
  event.preventDefault()

  // check what text was put into the form field
  let formText = document.getElementById('name').value
  Client.checkForName(formText)

  console.log("::: Form Submitted :::")

  getResult(baseURL, formText, apiKey).then(function (projectData) {
    // Add data
    let userText="";
    const sentenceList = projectData["sentence_list"];
    for (let index = 0; index < sentenceList.length; index++) {
      const element = sentenceList[index];    
      userText = element["text"];   
      console.log("projectData1: ", userText);
    }
    console.log("projectData13333: ", userText);
    postData('/dist/index.html', { polarity: ConvertPolarity(projectData["score_tag"]), subjectivity: projectData["subjectivity"], text: userText});
    console.log("projectData2: ", projectData);
    updateUI();
})
}

const getResult = async (baseURL, formText, apiKey) => {
  const res = await fetch(baseURL + '?txt=' + formText + '&lang=' + "en" + '&key=' + apiKey)
  try {
      const data = await res.json();
      console.log("data1:", data)
      return data;
  } catch (error) {
      console.log("error", error);
  }
}

const postData = async (url = baseURL, data = {}) => {
  console.log("url1:", url)
  console.log("data11111:", data)
  const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });
  console.log("response.body111:", response);
console.log("response.body:", response.body);
  try {
      const newData = await response.json();     
      return newData
  } catch (error) {
      console.log("error", error);
      // appropriately handle the error
  }
}

const updateUI = async() => {
  const request = await fetch('/test')
  try {   
    const allData = await request.json()
    console.log("allData" , allData);
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
    document.getElementById('subjId').innerHTML = subjectivity;
  }
  catch (error) {
    console.log("error", error);
  }

}

function ConvertPolarity(pConst) {
  switch (pConst) {
    case "P+":
      return 'Strong Positive';     
    
    case "P":
      return 'Positive';      

    case "NEU":
        return 'Neutral';        

    case "N":
      return 'Negative';

    case "N+":
        return 'Strong Negative';  
     
    case "NONE":
          return 'Without Polarity';
  }

}

export { handleSubmit }

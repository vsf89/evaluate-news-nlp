let baseURL = "/test";

function handleSubmit(event) {
  event.preventDefault()
  let formText = document.getElementById('name').value
  if (formText != null) {
    const result = Client.checkForName(formText)
    if (result == false)
      return;
    console.log("::: Form Submitted :::")
    getData(formText);
  }
}

const getData = async (formText) => {
  getResult(baseURL, formText).then(function (projectData) {    
    postData('/dist/index.html', { polarity: ConvertPolarity(projectData["score_tag"]), subjectivity: projectData["subjectivity"], text: userText });
    updateUI();
  })
}

const getResult = async (baseURL, formText) => {
  const res = await fetch(baseURL + '?txt=' + formText + '&lang=' + "en")
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
}

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
    // appropriately handle the error
    console.log("error", error);    
  }
}

const updateUI = async () => {
  const request = await fetch('/test')
  try {
    const allData = await request.json()   
    const sentenceList = allData["sentence_list"];
    for (let index = 0; index < sentenceList.length; index++) {
      const element = sentenceList[index];
      const userText = element["text"];
      document.getElementById('textId').innerHTML = userText;
      const polarity = element["score_tag"];     
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

function handleSubmit(event) {
    event.preventDefault()


    const formdata = new FormData();
formdata.append("key", "9a8415c3fcdb1ec648a1842a749f8455");
formdata.append("txt", "YOUR TEXT happy HERE");
formdata.append("lang", "en");  // 2-letter code, like en es fr ...

const requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

const response = fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions)
  .then(response => ({
    status: response.status, 
    body: response.json()  
  }))
  .then(({ status, body }) => console.log(status, body))
  .then(function(res) {        
         document.getElementById('results').innerHTML = res;
         })
  .catch(error => console.log('error', error));
   
    // check what text was put into the form field
    // let formText = document.getElementById('name').value
    // Client.checkForName(formText)

    // console.log("::: Form Submitted :::")

    // fetch('https://api.meaningcloud.com/sentiment-2.1')
    // .then(res => res.json())
    // .then(function(res) {
        
    //     document.getElementById('results').innerHTML = res.message
    // })    

    // console.log("res: " + res);
}

function onBlur(){}

export { handleSubmit, onBlur }

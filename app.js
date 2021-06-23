
var requestOptions = {
  method: 'POST',
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "email": "Kay_Quigley18@hotmail.com",
    "firstName": "Dorothy",
    "lastName": "Cremin",
    "password": "YUJaIHhpPdTRZcx"
  }),
  redirect: 'follow'
};

fetch("http://localhost:8000/api/data", requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));



var formdata = new FormData();
formdata.append("email", "Ari_Gutkowski@hotmail.com");
formdata.append("firstName", "Edythe");
formdata.append("lastName", "Mitchell");
formdata.append("password", "2TrwT0nBOYPKAVL");

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

fetch("http://localhost:8000/api/data", requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
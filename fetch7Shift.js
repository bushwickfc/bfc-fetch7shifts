function fetch7Shifts() {
  // set up so that we can send over basic auth to the API
  var apikey = ''
  var headers = {
    "Authorization" : "Basic " + Utilities.base64Encode(apikey + ':')
  };

  var params = {
    "method":"GET",
    "headers": headers
  };
  
  var shift = '6435753';
  
  var url = 'https://api.7shifts.com/v1/shifts' + '/' + shift;
  
  var response = UrlFetchApp.fetch(url, params);
  
  // Make request to API and get response before this point.
  var json = response.getContentText();
  var obj = JSON.parse(json);
  var str = JSON.stringify(json);
  

  for (var key in obj.data.shift) {
    if (obj.data.shift.hasOwnProperty(key)) {
      Logger.log(key + " -> " + obj.data.shift[key]);
    }
  }

  //// OLD CODE ////

  //var reponse = UrlFetchApp.fetch(url, params);
  
  //var query = '"Apps Script" stars:">=100"';
  

  
  //'https://api.github.com/search/repositories'
  //+ '?sort=stars'
  //+ '&q=' + encodeURIComponent(query);
}
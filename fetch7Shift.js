function fetch7Shifts() {
  // Basic auth headers for API
  var apiKey = '',
      headers = {
        "Authorization" : "Basic " + Utilities.base64Encode(apiKey + ':')
      };

  var params = {
    "method":"GET",
    "headers": headers
  };
  
  var baseURL = 'https://api.7shifts.com/v1/shifts/?'
  
  // Limit must be < 500, problems with > 150 // > YYYY-MM-DD // deep=1 returns associated objs like User info
  var limit = '&limit=500', greaterThanDate = 'start[gte]=2018-02-01', includeAssocObjs = '&deep=1'
  var excludeOpenShifts = '&open=0', excludeDeletedShifts = '&deleted=0'
  var queries = greaterThanDate + limit + includeAssocObjs + excludeOpenShifts + excludeDeletedShifts;
  
  var url = baseURL + queries;
  
  // Make request to API and get response
  var response = UrlFetchApp.fetch( url, params );
  
  return response
}

function parseJSON( response ) {
// Parse JSON string to JSON Obj
  var jsonString = response.getContentText();
  var jsonObj = JSON.parse(jsonString);
  //console.log('json obj: ', jsonObj)
  return jsonObj
}
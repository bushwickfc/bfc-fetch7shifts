function fetch7Shifts() {
  // Basic auth headers for API
  var apiKey = '',
      headers = {
        "Authorization" : "Basic " + Utilities.base64Encode( apiKey + ':' )
      };

  var params = {
    "method": "GET",
    "headers": headers
  };
  
  // Make request to API and get response
  var response = UrlFetchApp.fetch( buildURL(), params );
  
  return response
}

function buildURL() {
  var baseURL = 'https://api.7shifts.com/v1/shifts/?',
    month = getMonthFromUser()
  
  // Limit must be < 500, // date format: YYYY-MM-DD // deep=1 returns assoc. objs like User info
  var startDate = 'start[gte]=2018-' + month + '-01',
    endDate = '&start[lte]=2018-' + ( month + 1 ) + '-01',
    limit = '&limit=500', 
    includeAssocObjs = '&deep=1',
    excludeOpenShifts = '&open=0', 
    excludeDeletedShifts = '&deleted=0'

  var queries = startDate + endDate + limit + includeAssocObjs + excludeOpenShifts + excludeDeletedShifts,
    url = baseURL + queries;
  
  return url
}

function parseJSON( response ) {
// Parse JSON string to JSON Obj
  var jsonString = response.getContentText();
  var jsonObj = JSON.parse( jsonString );

  return jsonObj;
}

function getMonthFromUser() {
  var ui = SpreadsheetApp.getUi();
  var response = ui.prompt( 'Please enter the month as a number, e.g: 01, 02, 03, 10,' );

  return response.getResponseText();
}

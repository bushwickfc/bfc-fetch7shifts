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
  
  var limit = '5' // Must not exceed 500, problems with > 150
  
  var date = '2017-08-08' // YYYY-MM-DD
  
  var url = 'https://api.7shifts.com/v1/shifts/?start[gte]=' + date + '&limit=' + limit;
  
  var response = UrlFetchApp.fetch(url, params);
  
  // Make request to API and get response before this point.
  var json = response.getContentText();
  var obj = JSON.parse(json);
  var str = JSON.stringify(json);
  
  var recentShifts = obj.data.map(function(key) {
    return key.shift
  })
  
  var shiftObjArray = recentShifts.map(function(shiftDetails) {
    return new Shift(shiftDetails.user_id, shiftDetails.start, shiftDetails.end, shiftDetails.id, shiftDetails.role_id)
    
    // Currently id is returning the incorrect value.
    // should be '32689822' but is currently '3.3942553E7'
    
    //user_id:  537402   
    //start:  "2017-08-09 17:30:00"
    //end:  "2017-08-09 21:30:00"
    //id:  33897520
    //role_id:  65737
  }) 
}

  console.log(shiftObjArray)

function Shift(userId, start, end, ShiftId, role_id) {  
  this.userId = userId;
  this.start = start;
  this.end = end;
  this.shiftId = this.shiftId
  this.role_id = this.role_id
  this.calculateHours = function() {}
}

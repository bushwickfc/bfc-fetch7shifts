function fetch7Shifts() {
  // Basic auth headers for API
  var apikey = ''
  var headers = {
    "Authorization" : "Basic " + Utilities.base64Encode(apikey + ':')
  };

  var params = {
    "method":"GET",
    "headers": headers
  };
  
  // Limit must be < 500, problems with > 150 // YYYY-MM-DD // deep=1 returns associated objs like User info
  var limit = '&limit=5', date = 'start[gte]=2017-10-01', includeAssocObjs = '&deep=1'
  var excludeOpenShifts = '&open=0', excludeDeletedShifts = '&deleted=0'
  var queries = date + limit + includeAssocObjs + excludeOpenShifts + excludeDeletedShifts;
  
  var url = 'https://api.7shifts.com/v1/shifts/?' + queries;
  
  // Make request to API and get response
  var response = UrlFetchApp.fetch(url, params);
  
 // Parse JSON string to JSON Obj
  var jsonString = response.getContentText();
  var jsonObj = JSON.parse(jsonString);
  
  return jsonObj
}

function buildShifts(jsonObj) {
 // Map individual shifts and their assoc. objects to an array
  var shiftObjsArray = jsonObj.data.map(function(shiftData) {
     return new Shift(shiftData.user.id, 
                      shiftData.user.firstname,
                      shiftData.user.lastname,
                      shiftData.shift.start, 
                      shiftData.shift.end, 
                      shiftData.shift.id, 
                      shiftData.shift.role_id)
  })
  return shiftObjsArray
}

function insertHoursWorked() {  
  var shiftsArray = buildShifts(fetch7Shifts())
  shiftsArray.forEach(function(shift) {
    Logger.log("Member: " + shift.memberFirstName + " " + shift.memberLastName + " worked " + shift.hoursWorked()  + " hours")
  })
  
  // TODO
  // * Insert hours worked to proper cells
}

function Shift(userId, userFirstName, userLastName, start, end, shiftId, roleId) {  
  this.userId = userId;
  this.memberFirstName = userFirstName;
  this.memberLastName = userLastName
  this.start = start;
  this.end = end;
  this.shiftId = shiftId
  this.roleId = roleId
  this.hoursWorked = function() {
    var secondsWorked = this.convertTimeToSecs(this.end) - this.convertTimeToSecs(this.start);
    var numOfSeconds = Number(secondsWorked);

    return Math.floor(numOfSeconds / 3600)
  }
  this.convertTimeToSecs = function(date) {
    var time = date.split(' ')[1]
    var [hours, minutes, seconds] = time.split(/:/);

    var durationInSec = hours * 60 * 60 + minutes * 60 + (+seconds);
    return durationInSec
  }
}

// Call function to insert into proper cells
insertHoursWorked()

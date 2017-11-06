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
  
  // Can this be done a better way? Should we make a User object and assign recent shifts as User.shifts?
  var shiftAndAssocObjs = obj.data.map(function(key) {
    return key
    
    // Shape of jsonObj    
    //   jsonPayload: {
    //       data: [
    //         0: {
    //           department: {…}      
    //           location: {…}      
    //           role: {…}      
    //           shift: {…}      
    //           user: {…}    
    //      }
    //        1: {}
  })
  
  var shiftObjArray = shiftAndAssocObjs.map(function(objDetails) {
    return new Shift(objDetails.user.id, 
                     objDetails.user.firstname,
                     objDetails.user.lastname,
                     objDetails.shift.start, 
                     objDetails.shift.end, 
                     objDetails.shift.id, 
                     objDetails.shift.role_id)
  })
  
}

function Shift(userId, userFirstName, userLastName, start, end, shiftId, roleId) {  
  this.userId = userId;
  this.firstName = userFirstName;
  this.lastName = userLastName
  this.start = start;
  this.end = end;
  this.shiftId = shiftId
  this.roleId = roleId
  this.calculateHours = function() {}
}
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
  
  // Limit must be < 500, problems with > 150 // YYYY-MM-DD // deep=1 returns associated objs like User info
  var limit = '5', date = '2017-08-08', deep = '&deep=1' 
  
  var url = 'https://api.7shifts.com/v1/shifts/?start[gte]=' + date + '&limit=' + limit + deep;
  
  var response = UrlFetchApp.fetch(url, params);
  
  // Make request to API and get response before this point.
  var json = response.getContentText();
  var obj = JSON.parse(json);
  // var str = JSON.stringify(json);
  
  
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
  
  Logger.log(shiftAndAssocObjs)
  var shiftObjArray = shiftAndAssocObjs.map(function(objDetails) {
    return new Shift(objDetails.user.id, 
                     objDetails.user.firstname,
                     objDetails.user.lastname,
                     objDetails.shift.start, 
                     objDetails.shift.end, 
                     objDetails.shift.id, 
                     objDetails.shift.role_id)
  }) 
  console.log(shiftObjArray)
  
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
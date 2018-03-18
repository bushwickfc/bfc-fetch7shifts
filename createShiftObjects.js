function createShiftObjs( jsonObj ) {
 // Map individual shifts and their assoc. objects to an array
  var shiftAndAssocObjs = jsonObj.data.map( function( shiftData ) {
     return new Shift( shiftData.user.id, 
                     shiftData.user.firstname,
                     shiftData.user.lastname,
                     shiftData.shift.start, 
                     shiftData.shift.end, 
                     shiftData.shift.id, 
                     shiftData.shift.role_id )
  })
  //console.log('shift and assoc obj: ', shiftAndAssocObjs)
  return shiftAndAssocObjs
}

function Shift( userId, userFirstName, userLastName, start, end, shiftId, roleId ) {
  this.member = {}
  this.member.userId = userId;
  this.member.firstName = userFirstName;
  this.member.lastName = userLastName
  this.start = start;
  this.end = end;
  this.shiftId = shiftId
  this.roleId = roleId
  this.hoursWorked = function() {
    var secondsWorked = this.convertTimeToSecs( this.end ) - this.convertTimeToSecs( this.start );
    var numOfSeconds = Number( secondsWorked );

    return Math.floor( numOfSeconds / 3600 )
  }
  this.convertTimeToSecs = function( date ) {
    var time = date.split(' ')[1],
      [hours, minutes, seconds] = time.split( /:/ ),
      durationInSec = hours * 60 * 60 + minutes * 60 + ( +seconds );
    
    return durationInSec;
  }
}
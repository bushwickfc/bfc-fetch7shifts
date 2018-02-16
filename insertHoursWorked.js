function insertHoursWorked() {
  var jsonObj = parseJSON( fetch7Shifts() )
  var shiftsArray = buildShiftObjs( jsonObj )
  shiftsArray.forEach( function( shift ) {
    //Logger.log("Member: " + shift.memberFirstName + " " + shift.memberLastName + " worked " + shift.hoursWorked()  + " hours")
    //Logger.log("date is: " + shift.start)
    getMemberRow( shift.memberLastName )
  })
  
  // TODO
  // * Insert hours worked to proper cells
}

function getMemberRow(memberLastName) {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  for (var i = 0; i < data.length; i++) {
    if (data[i][2] == memberLastName) {
      console.log('Row is: ' + ( i + 1 ));
      break;
    }
  }
}

// This is an Google Apps Script for getting column number by column name
// https://gist.github.com/printminion/5520691

// function to find row number based on cell value
// https://stackoverflow.com/questions/24785987/google-apps-script-find-row-number-based-on-a-cell-value
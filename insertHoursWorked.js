var memberRowMap = {}

function insertHours() {
  var shiftObjects = getShiftObjects(),
    colToInsert = get7ShiftsColumn( getColumnFromUser() );
  
  createMemberRowMap();
  
  shiftObjects.forEach( function( shift ) {
    // Logger.log( "Member: " + shift.member.firstName + " " + shift.member.lastName + " worked " + shift.hoursWorked()  + " hours" )
    // Logger.log( "date is: " + shift.start )
    if ( memberRowMap[shift.member.lastName] ) {
      updateCellValue( memberRowMap[shift.member.lastName], colToInsert, shift.hoursWorked() )
    } else {
     // SpreadsheetApp.getUi().alert( shift.member.lastName + ' Not Found!' )
    }
  }) 
}

function createMemberRowMap() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  for ( var i = 0; i < data.length; i++ ) {
    memberRowMap[data[i][2]] = i + 1;
  }
}

function getShiftObjects() {
  var jsonObj = parseJSON( fetch7Shifts() ),
    shiftObjectsArray = createShiftObjs( jsonObj );
  return shiftObjectsArray;
}

function updateCellValue( row, col, value ) {
  var sheet = SpreadsheetApp.getActiveSheet().getRange( row, col );
  var currentValue = parseInt( sheet.getValue() )
  
 sheet.setValue( currentValue + value );
}

function get7ShiftsColumn( columnName ) {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  return data[0].indexOf( columnName ) + 1;
}

function getColumnFromUser() {
  var ui = SpreadsheetApp.getUi();
  var response = ui.prompt( 'Please enter the Column Name to insert hours, e.g: 7Shifts' );
  return response.getResponseText(); 
}
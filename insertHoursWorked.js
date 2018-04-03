var memberRowMap = {};

function initDynamicInsert() {
  createMemberRowMap();
  insertIntoSheet( getShiftObjects( getMonthFromUser() ), 
                  get7ShiftsColumn( getColumnFromUser() ), 
                  null );
}

function initAutomaticInsert() {
  createMemberRowMap();
  var currentMonth = parseInt( Utilities.formatDate( new Date(), 'EST', 'MM' )),
      columnToInsert = get7ShiftsColumn( '7Shifts' + currentMonth );
  insertIntoSheet( getShiftObjects( currentMonth ), 
                   columnToInsert );
}

function insertIntoSheet( data, colToInsert, objProperty ) { 
  data.forEach( function( shift ) {
    var memberName = shift.member.firstName + shift.member.lastName
    if ( memberRowMap[memberName] ) {
      updateCellValue( memberRowMap[memberName], 
                       colToInsert, 
                       shift.member[objProperty] || shift.hoursWorked() );
    }
  }) 
}

function createMemberRowMap( colName ) {
  var sheet = SpreadsheetApp.getActiveSheet(),
    data = sheet.getDataRange().getValues(),
    firstNameCol = getColumnIndex( 'FIRST NAME (OR HOUSEHOLD MEMBERS)' ) - 1,
    lastNameCol = getColumnIndex( 'LAST NAME (OR HOUSEHOLD NAME)' ) - 1;
  
  for ( var i = 0; i < data.length; i++ ) {
    var firstName = data[i][firstNameCol],
      lastName = data[i][lastNameCol];
    memberRowMap[firstName + lastName] = i + 1;
  }
}

function getShiftObjects( month ) {
  var jsonObj = parseJSON( fetch7Shifts( month )),
    shiftObjectsArray = createShiftObjs( jsonObj );
  
  return shiftObjectsArray;
}

function updateCellValue( row, col, value ) {
  var sheet = SpreadsheetApp.getActiveSheet().getRange( row, col ),
    currentValue = parseInt( sheet.getValue() ) || 0;
  
  sheet.setValue( currentValue + value );
}

function replaceCellValue( row, col, value ) {
  var sheet = SpreadsheetApp.getActiveSheet().getRange( row, col );
  
  sheet.setValue( value );
}

function get7ShiftsColumn( columnName ) {
  var sheet = SpreadsheetApp.getActiveSheet(),
    data = sheet.getDataRange().getValues();
  
  return data[0].indexOf( columnName ) + 1;
}

function getColumnFromUser() {
  var ui = SpreadsheetApp.getUi(),
    response = ui.prompt( 'Please enter the Column Name to insert hours, e.g: 7Shifts' );
  
  return response.getResponseText(); 
}
// Get user input to return value to be inserted
//function getObjPropToInsertFromUser() {
  //var ui = SpreadsheetApp.getUi(),
      //response = ui.prompt( "Please enter the Shift Object Property to insert, e,g: Shift: hoursWorked, start, end, shiftId, roleId & Member: userId, firstName, lastName");
  
  //return response.getResponseText(); 
//}
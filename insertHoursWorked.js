var memberRowMap = {}

function initDynamicInsert() {
  createMemberRowMap();
  insertIntoSheet( getShiftObjects( getMonthFromUser() ), 
                  get7ShiftsColumn( getColumnFromUser() ), 
                  null );
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
  var currentValue = parseInt( sheet.getValue() ) || 0;
  
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
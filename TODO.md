1. Make use of stackDriver logging in View -> StackDriver Logging
  * console.log([data][,...])
2. Find the best way to calculate hours and match the user_id from 7shifts into the correct cells
  [x] Create Shift objects from API response
  [ ] Calculate hours
  [ ] Insert hours worked to cells where user_id === user_id
  [ ] Profit
3. Set up a trigger(automation) to run this based on the last date it was run
  * https://developers.google.com/apps-script/guides/sheets#triggers
4. Set up promises/polyfill so we can handle response errors
  * http://ramblings.mcpher.com/Home/excelquirks/gassnips/promisesappsscript

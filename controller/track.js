var os = require("os");
var hostaddress = os.hostname();
var userInfo = os.userInfo();
var userName = os.userInfo().username;
console.log("the host name is ", hostaddress);
console.log("the user information is ", userInfo);
console.log("the user name is ", userName);

var monitor = require('active-window');
let app = null;
let title = null;

callback =  function sync (window){
  try { 
    app2 = window.app;
    title2 = window.title;
    if (app != app2) {
      console.log("App: " + window.app);
      app = app2;
    }
    if (title != title2) {
      console.log("Title: " + window.title);
      title = title2;
    }

  }catch(err) {
      console.log(err);
  } 
}
/*Watch the active window 
  @callback
  @number of requests; infinity = -1 
  @interval between requests
*/
monitor.getActiveWindow(callback, -1 , 1);

//Get the current active window
   //monitor.getActiveWindow(callback);


// var fs = require("fs");
// let file = "./test/test.txt"
// try {
//   fs.watch(file, (event, filename) => {
//     console.log(event == "rename"? "delete": event, filename)
// })
// } catch (error) {
//   if (error.errno == -4058) {
//     console.log(`${file} deleed`);
//   } else {
//     console.log(error)
//   }
// }


// fs = require("fs");
// fs.watch("C:\\Users\\Tsadik\\Desktop", { persistent: true }, function (event, fileName) {
//   console.log("Event: " + event);
//   console.log("name: ", fileName);
// });
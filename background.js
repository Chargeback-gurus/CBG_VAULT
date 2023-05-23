// chrome.action.onClicked.addListener(tab => { 
//   var xhr = new XMLHttpRequest();
//   xhr.open("GET", "http://localhost:8082/vault-ext/credentials", true);
//   xhr.onreadystatechange = callback;
//   xhr.send();
//   }
//   );

chrome.runtime.onConnect.addListener(() => {
  var link = tab.url;
  chrome.cookies.get({url: "http://3.139.138.221/cbg_icbmp_web/#/auth/profile", name: 'accessToken'}, function(cookie) {
token = cookie.value;
console.log(token);
});
 });
  chrome.action.onClicked.addListener(()=> { 
    chrome.cookies.get({url: "http://3.139.138.221/cbg_icbmp_web/#/auth/profile", name: 'accessToken'}, function(cookie) {
  token = cookie.value;
  console.log(token);
 });
});
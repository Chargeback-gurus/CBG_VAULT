// chrome.action.onClicked.addListener(tab => { 
//   var xhr = new XMLHttpRequest();
//   xhr.open("GET", "http://localhost:8082/vault-ext/credentials", true);
//   xhr.onreadystatechange = callback;
//   xhr.send();
//   }
//   );


  chrome.action.onClicked.addListener(function(tab) { 
    // var link = tab.url;
    var x = new XMLHttpRequest();
    x.open('GET', 'http://localhost:8082/vault-ext/credentials');
    x.onload = function() {
        alert(x.responseText);
    };
    x.send();
});
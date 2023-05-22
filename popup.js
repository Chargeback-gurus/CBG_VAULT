
let listArray =[];

function navigationMethod(selectedObj) {
  // console.log('odjopwufhudewfef',selectedObj);
  var inputs=document.getElementsByTagName("input");

 id = e => { return e.name || e.id || e.innerText || e.placeholder.replace(/\s/g, '_'); };

 for(var i=0;i<inputs.length;i++){
   var input=inputs[i];
   console.info(input)
   if(input.type=="password"){
     {input.value=selectedObj.password} 
     // keydownupFunc(input.value)
   }
   if(input.type=="text" || input.type =="email" || input.type =="number"){
     {input.value=selectedObj.userName}
     // keydownupFunc(input.value);
   }
   if(input.type  && input.type == "submit"){
     input.click();
     if(input.formNoValidate === false){
       break;
     }    
     console.log(input)
   };
 }

 var btnElement = document.getElementsByTagName("button");
for(const ele of btnElement){
  var expVal = new RegExp('(?:login)|(?:sign)|(?:Sign)|(?:submit)|(?:loginform)|(?:continue)|(?:next)', 'i');              
  const name = id(ele);
   if(expVal.test(name)){
     console.log(name)
    ele.click();
  }
 }
}

function changeBackgroundColor() {
   var inputs=document.getElementsByTagName("input");

  id = e => { return e.name || e.id || e.innerText || e.placeholder.replace(/\s/g, '_'); };

  for(var i=0;i<inputs.length;i++){
    var input=inputs[i];
    console.info(input)
    if(input.type=="password"){
      {input.value="645e1ecbbd7a0"} 
      // keydownupFunc(input.value)
    }
    if(input.type=="text" || input.type =="email" || input.type =="number"){
      {input.value="antony@codeboardtech.com"}
      // keydownupFunc(input.value);
    }
    if(input.type  && input.type == "submit"){
      input.click();
      if(input.formNoValidate === false){
        break;
      }    
      console.log(input)
    };
  }

  var btnElement = document.getElementsByTagName("button");
for(const ele of btnElement){
   var expVal = new RegExp('(?:login)|(?:sign)|(?:Sign)|(?:submit)|(?:loginform)|(?:continue)|(?:next)', 'i');              
   const name = id(ele);
    if(expVal.test(name)){
      console.log(name)
     ele.click();
   }
  }
}

async function updateUI() {
  var selectedObj ;
  var identity;
  var checkPageButton = document.getElementById('checkPage');
  document.addEventListener("click",(e)=>{
  console.log('master',e.target.id);
  identity = e.target.id;
  selectedObj = listArray.find((ele)=> ele.identifier === identity);
  console.log('selected',selectedObj);
  chrome.tabs.create({url : selectedObj.url,active:false}, function(tab){
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      func : navigationMethod,
      args: [selectedObj],
    }).then(()=>console.log("injected a function"));
  });
  });


  checkPageButton.addEventListener('click', function() {
    var newURL = "https://hrms.codeboardtech.com/";
    chrome.tabs.create({ url: newURL,active:false }, function(tab){
        console.log('Attempting to inject script into tab:',tab);
        chrome.scripting.executeScript({
          target: {tabId: tab.id},
          func : changeBackgroundColor,
      }).then(() => console.log("injected a function"));;
    });

  });
}


if(document.readyState === 'loading') {

  var x = new XMLHttpRequest();
    x.open('GET', 'http://localhost:8082/vault-ext/credentials');
    x.onload = function() {
      var response = JSON.parse(x.responseText);
      response.forEach((res)=>{
        var encryptedBase64Key = res.Key;
        var parsedBase64Key = CryptoJS.enc.Base64.parse(encryptedBase64Key);
        var encryptUsername = res.userName;
        var encryptPassword = res.password;
        var encryptUrl = res.url;
        var decryptedUserName = CryptoJS.AES.decrypt(encryptUsername,parsedBase64Key,{
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
        });
        var decryptedPassword = CryptoJS.AES.decrypt( encryptPassword, parsedBase64Key, {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
          });
          var decryptedURL = CryptoJS.AES.decrypt( encryptUrl, parsedBase64Key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
            });
          var decryptedTextUsername = decryptedUserName.toString( CryptoJS.enc.Utf8);
          var decryptedTextPassword = decryptedPassword.toString( CryptoJS.enc.Utf8);
          var decryptedTextURL = decryptedURL.toString( CryptoJS.enc.Utf8);
          let tempObj ={
            userName:decryptedTextUsername,
            password:decryptedTextPassword,
            url:decryptedTextURL,
            identifier: res.identity,
          }
          listArray.push(tempObj)
      })
      console.log('respones',listArray);

      var ul = document.getElementById("listofItem");
      for (var i = 0; i < listArray.length; i++) {
        var name = listArray[i].url;
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(name));
        ul.appendChild(li);
        li.setAttribute('id',listArray[i].identifier)
        li.classList.add("listitem"+i)
      }
    };
    x.send();


document.addEventListener('DOMContentLoaded', updateUI);

}else{
  updateUI();
}

let listArray =[];

function navigationMethod(selectedObj) {

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

 function updateUI() {
  var selectedObj ;
  var identity;


  // var checkPageButton = document.getElementById('checkPage');
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


  // checkPageButton.addEventListener('click', function() {
  //   var newURL = "https://hrms.codeboardtech.com/";
  //   chrome.tabs.create({ url: newURL,active:false }, function(tab){
  //       console.log('Attempting to inject script into tab:',tab);
  //       chrome.scripting.executeScript({
  //         target: {tabId: tab.id},
  //         func : changeBackgroundColor,
  //     }).then(() => console.log("injected a function"));;
  //   });

  // });
}


if(document.readyState === 'loading') {
  var token;
  cookie_name = "accessToken",
  cookie_set ="SelectedRoleFlag"
  domain ="http://3.139.138.221/cbg_icbmp_web/#/auth/profile";
  get_cookies().then(value=>{
    console.log('antpony',value);
    token = value;
    getPasswordList();
  })
  async function get_cookies(){
    let obj = await chrome.cookies.getAll({
      url: domain,
      // name: cookie_name,
      // name:cookie_set
    });
    console.log('dewdwd',obj);
    let value = obj[2].value;
    console.log('accessToken',value);
    return value;
  }
 async function getPasswordList(){
  let Method = {
    method:'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: "Bearer " + token 
  }
  };
  try {
    const fetchResponse = await fetch(`http://localhost:8082/vault-ext/credentials`, Method);
    const response = await fetchResponse.json();
    console.log('data',response);
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
              var img = document.createElement('img');
              li.appendChild(img)
              img.setAttribute('src','./assets/launch.png')
              li.setAttribute('id',listArray[i].identifier)
              li.classList.add("listitem"+i)
            }
  
  } catch (error) {
    return error;
  }

 }
  // async function youBaseFunc() {
  //   var cookie_val = await get_cookies(cookie_name, domain);
  //   console.log('mark',cookie_val);
  // }
//    chrome.cookies.get({url: "http://3.139.138.221/cbg_icbmp_web/#/auth/profile", name: 'accessToken'}, function(cookie) {
//   token = cookie.value;
//   console.log(token);
//  });

//   var x = new XMLHttpRequest();

//   x.open('GET', 'http://localhost:8082/vault-ext/credentials');
//  x.setRequestHeader('Content-Type','application/json; charset=utf-8');
//  x.setRequestHeader('Authorization', 'Bearer ' + token);

//     x.onload = function() {
//       var response = JSON.parse(x.responseText);
//       response.forEach((res)=>{
//         var encryptedBase64Key = res.Key;
//         var parsedBase64Key = CryptoJS.enc.Base64.parse(encryptedBase64Key);
//         var encryptUsername = res.userName;
//         var encryptPassword = res.password;
//         var encryptUrl = res.url;
//         var decryptedUserName = CryptoJS.AES.decrypt(encryptUsername,parsedBase64Key,{
//           mode: CryptoJS.mode.ECB,
//           padding: CryptoJS.pad.Pkcs7
//         });
//         var decryptedPassword = CryptoJS.AES.decrypt( encryptPassword, parsedBase64Key, {
//           mode: CryptoJS.mode.ECB,
//           padding: CryptoJS.pad.Pkcs7
//           });
//           var decryptedURL = CryptoJS.AES.decrypt( encryptUrl, parsedBase64Key, {
//             mode: CryptoJS.mode.ECB,
//             padding: CryptoJS.pad.Pkcs7
//             });
//           var decryptedTextUsername = decryptedUserName.toString( CryptoJS.enc.Utf8);
//           var decryptedTextPassword = decryptedPassword.toString( CryptoJS.enc.Utf8);
//           var decryptedTextURL = decryptedURL.toString( CryptoJS.enc.Utf8);
//           let tempObj ={
//             userName:decryptedTextUsername,
//             password:decryptedTextPassword,
//             url:decryptedTextURL,
//             identifier: res.identity,
//           }
//           listArray.push(tempObj)
//       })
//       console.log('respones',listArray);

//       var ul = document.getElementById("listofItem");
//       for (var i = 0; i < listArray.length; i++) {
//         var name = listArray[i].url;
//         var li = document.createElement('li');
//         li.appendChild(document.createTextNode(name));
//         ul.appendChild(li);
//         var img = document.createElement('img');
//         // img.appendChild(document.createTextNode('./assets/launch.png'));
//         li.appendChild(img)
//         img.setAttribute('src','./assets/launch.png')
//         li.setAttribute('id',listArray[i].identifier)
//         li.classList.add("listitem"+i)
//       }
//     };
//     x.send();


document.addEventListener('DOMContentLoaded', updateUI);

}else{
  updateUI();
}
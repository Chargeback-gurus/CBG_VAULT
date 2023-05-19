    // document.addEventListener("DOMContentLoaded", function() {
    //   var checkPageButton = document.getElementById('checkPage');
    //   checkPageButton.addEventListener('click', function() {
    //     var newURL = "https://hrms.codeboardtech.com/";
    //     chrome.tabs.create({ url: newURL,active:false }, function(tab){
    //         console.log('Attempting to inject script into tab:',tab);
    //         chrome.scripting.executeScript({
    //           target: {tabId: tab.id},
    //           files: ["./contentscript.js"],
    //       });
    //     });
    
    //   });
    // });
//   }
// }

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
  var checkPageButton = document.getElementById('checkPage');
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
      console.log('respo',response);
     let tempArray =[];
      response.forEach((res)=>{
        let obj = {
          password :CryptoJS.AES.decrypt("U2FsdGVkX1+cN6OlV1ja7JOEjn8dugt1OcBUwro+4CI=","qijviweferwuofhvu")
        }
        tempArray.push(obj);
        // response.password = CryptoJS.AES.decrypt(res.password,res.secretKey);
        // res.password =CryptoJS.AES.decrypt(res.password,res.secretKey)
      });
      console.log('update',tempArray)
    };
    x.send();
document.addEventListener('DOMContentLoaded', updateUI);
}else{
  updateUI();
}
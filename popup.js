
let listArray =[];

function navigationMethod(selectedObj) {

  var inputs=document.getElementsByTagName("input");

 id = e => { return e.name || e.id || e.innerText || e.placeholder.replace(/\s/g, '_'); };

 for(var i=0;i<inputs.length;i++){
   var input=inputs[i];
   console.info(input)
   if(input.type=="password"){
     {input.value=selectedObj.V_pass} 
     // keydownupFunc(input.value)
   }
   if(input.type=="text" || input.type =="email" || input.type =="number"){
     {input.value=selectedObj.V_user}
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
  // var selectedObj ;
  // var identity;
  // document.addEventListener("click",(e)=>{
  // console.log('master',e.target.id);
  // identity = e.target.id;
  // selectedObj = listArray.find((ele)=> ele.identifier === identity);
  // console.log('selected',selectedObj);
  // chrome.tabs.create({url : selectedObj.url,active:false}, function(tab){
  //   chrome.scripting.executeScript({
  //     target: {tabId: tab.id},
  //     func : navigationMethod,
  //     args: [selectedObj],
  //   }).then(()=>console.log("injected a function"));
  // });
  // });
}

if(document.readyState === 'loading') {
  var token;
  domain ="http://localhost:4200/#/dashboard";

  async function get_cookies(){
    let obj = await chrome.cookies.getAll({
      url: domain,
    });
    console.log('dewdwd',obj);
    const vaultURL = obj.find((res)=> res.name === "vault_Url");
    const vaultUsername = obj.find((res)=> res.name === "vault_userName");
    const vaultPassword= obj.find((res)=> res.name === "vault_Password");
    let temObj ={
      V_url: decodeURIComponent(vaultURL.value),
      V_user:decodeURIComponent(vaultUsername.value),
      V_pass:decodeURIComponent(vaultPassword.value)
    }
    listArray.push(temObj)
    console.log('accessToken',listArray);
    return listArray;
  }

  get_cookies().then(value=>{
    console.log('antpony',value);
    chrome.tabs.create({url : value[0].V_url,active:true}, function(tab){
      // let index = -4;
      // if (tab.pinned) {
      //   let lastPinnedTab = Math.max(0, firstUnpinnedTab(tabs) - 1);
      //   index = lastPinnedTab;
      // }
      // chrome.tabs.move([tab.id],{index}) 
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      func : navigationMethod,
      args: [value[0]],
    }).then(()=>console.log("injected a function"));
    getCurrentWindowTabs().then((tabs)=>{
      console.log('tabs',tabs);
   const rmtab = tabs.find((res)=> res.url === "chrome-extension://hbpmhfbfcibignlgacdgcofdkglmlbac/popup.html");
   chrome.tabs.remove(rmtab.id);
    })
  });
  })
  function getCurrentWindowTabs() {
    return chrome.tabs.query({currentWindow: true});
  }
document.addEventListener('DOMContentLoaded', updateUI);

}else{
  updateUI();
}

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



async function updateUI() {
  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function() {
    var newURL = "https://hrms.codeboardtech.com/";
    chrome.tabs.create({ url: newURL,active:false }, function(tab){
        console.log('Attempting to inject script into tab:',tab);
        chrome.scripting.executeScript({
          target: {tabId: tab.id},
          files: ["./contentscript.js"],
      });
    });

  });
}
if(document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', updateUI);
}else{
  updateUI();
}
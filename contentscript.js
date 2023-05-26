var myid = chrome.runtime.id;
console.log(myid);
// Make a simple request:
chrome.runtime.sendMessage(myid, {getTargetData: true},
  function(response) {
    if (targetInRange(response.targetData))
      chrome.runtime.sendMessage(myid, {activateLasers: true});
  }
);
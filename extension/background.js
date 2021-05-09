
console.log('background.js: hello');

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.browserAction.setTitle({tabId: tab.id, title: "You are on tab:" + tab.id});
  console.log('click at braction');

  chrome.windows.create({
  	url: chrome.runtime.getURL('build/index.html'),
  	type: 'popup',

  }, function(){

  });

});

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){

	console.log(msg);
	sendResponse({
		result: new Date().toLocaleString()
	})
})


chrome.runtime.sendMessage({type: 'datetime'}, function(response){

	console.log(response);
});
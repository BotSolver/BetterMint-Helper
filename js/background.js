function sendMessageToContentScript(message) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message);
  });
}

chrome.runtime.onInstalled.addListener(function() {
  sendMessageToContentScript({ action: 'detectAndClick' });
});
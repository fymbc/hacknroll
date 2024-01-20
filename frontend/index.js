document.getElementById('helpdeskBtn').addEventListener('click', function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {'message': 'helpdesk_request'}, function(response) {
      console.log(response.message);
    });
  });
});

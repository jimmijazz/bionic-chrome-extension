function convertToBionic (selection) {

    var text = window.getSelection().toString()
    
    const encodedParams = new URLSearchParams();
    encodedParams.append("content", text);
    encodedParams.append("response_type", "html");
    encodedParams.append("request_type", "html");
    encodedParams.append("fixation", "1");
    encodedParams.append("saccade", "10");

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Host': 'bionic-reading1.p.rapidapi.com',
            'X-RapidAPI-Key': ''
        },
        body: encodedParams
    };

    fetch('https://bionic-reading1.p.rapidapi.com/convert', options)
        .then (response => response.text().then(function(text) {

            var x = window.open();
            x.document.open();
            x.document.write(text.toString());
            x.document.close();
        }))
        .catch(err => console.error(err));
};

chrome.contextMenus.removeAll(function () {
    chrome.contextMenus.create({
        id: "1",
        title: "Convert to Bionic",
        contexts: ["selection"],  // ContextType
    });
})

// chrome.contextMenus.onClicked.addListener(convertToBionic);

chrome.contextMenus.onClicked.addListener(() => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        var tabID = tabs[0].id;
        console.log(tabID)
        chrome.scripting.executeScript({
            target: { tabId: tabID},
            function: convertToBionic
          });
    });


  });

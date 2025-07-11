let headersPerTab = {};

chrome.webRequest.onHeadersReceived.addListener(
  (details) => {
    const securityHeaders = [
      'content-security-policy',
      'x-frame-options',
      'strict-transport-security',
      'x-content-type-options',
      'referrer-policy',
      'permissions-policy'
    ];

    const found = {};

    for (const header of details.responseHeaders) {
      const name = header.name.toLowerCase();
      if (securityHeaders.includes(name)) {
        found[name] = header.value;
      }
    }

    headersPerTab[details.tabId] = found;
  },
  { urls: ["<all_urls>"] },
  ["responseHeaders"]
);

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "getHeaders") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;
      sendResponse(headersPerTab[tabId] || {});
    });
    return true;
  }
});
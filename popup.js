chrome.runtime.sendMessage({ action: "getHeaders" }, (headers) => {
  const allHeaders = [
    'content-security-policy',
    'x-frame-options',
    'strict-transport-security',
    'x-content-type-options',
    'referrer-policy',
    'permissions-policy'
  ];

  const container = document.getElementById("result");
  container.innerHTML = "";

  allHeaders.forEach(header => {
    const value = headers[header];
    const div = document.createElement("div");
    div.className = "header";
    if (value) {
      div.innerHTML = `<span class="present">${header}: ${value}</span>`;
    } else {
      div.innerHTML = `<span class="missing">${header} is missing!</span>`;
    }
    container.appendChild(div);
  });
});
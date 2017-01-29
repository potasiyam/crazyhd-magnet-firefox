function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    tracker: document.querySelector("#tracker").value
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#tracker").value = result.tracker || "";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get("tracker");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
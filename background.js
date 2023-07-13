chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});
chrome.action.onClicked.addListener(async (tab) => {

    // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    // Next state will always be the opposite
    const nextState = prevState === "BR" ? "OFF" : "BR";

    // Set the action badge to the next state
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });
    if (nextState === "BR") {
      // Execute the Js file when the user turns the extension on
      await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["bionic-read-mode.js"],
      }).then(()=>console.log("Bionic Reading Enabled"));
        // Insert the CSS file when the user turns the extension on
        await chrome.scripting.insertCSS({
          files: ["focus-mode.css"],
          target: { tabId: tab.id },
        });
    }
    else{
      await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["rm-bionic-read.js"],
      }).then(()=>console.log("Bionic Reading Disabled"));
      // Remove the CSS file when the user turns the extension off
      await chrome.scripting.removeCSS({
        files: ["focus-mode.css"],
        target: { tabId: tab.id },
      });
    }
});

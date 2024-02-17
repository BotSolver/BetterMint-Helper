function clickElement(element) {
  element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
}

var rematchRequested = false;
var newGameRequested = false;

function detectAndClick() {
  var rematchButton = document.querySelector('button.ui_v5-button-component.ui_v5-button-basic[aria-label="Rematch"]');
  var acceptRematchButton = document.querySelector('button.ui_v5-button-component.ui_v5-button-basic[data-click-spam-id="5"]');
  var newGameButton = document.querySelector('button.ui_v5-button-component.ui_v5-button-basic[data-click-spam-id="4"]');

  console.log('Rematch button:', rematchButton);
  console.log('Accept Rematch button:', acceptRematchButton);
  console.log('New Game button:', newGameButton);

  if (!rematchRequested && rematchButton) {
    console.log('Rematch button found. Clicking...');
    clickElement(rematchButton);
    console.log('Rematch button clicked.');
    rematchRequested = true;
    newGameRequested = false; // Reset newGameRequested flag
  }

  if (!newGameRequested && acceptRematchButton) {
    console.log('Accept Rematch button found. Clicking...');
    clickElement(acceptRematchButton);
    console.log('Accept Rematch button clicked.');
    newGameRequested = true;
    rematchRequested = false; // Reset rematchRequested flag
  }

  if (rematchRequested && newGameButton) {
    console.log('New Game button found. Clicking...');
    clickElement(newGameButton);
    console.log('New Game button clicked.');
    newGameRequested = true;
    rematchRequested = false; // Reset rematchRequested flag
  }
}

document.addEventListener('DOMContentLoaded', function() {
  console.log('Content loaded. Starting script...');

  // Create a MutationObserver to detect changes in the DOM
  var observer = new MutationObserver(function(mutationsList) {
    for (var mutation of mutationsList) {
      if (mutation.type === 'childList') {
        console.log('DOM changed. Checking for buttons...');
        detectAndClick();
      }
    }
  });

  // Start observing changes in the DOM
  observer.observe(document.body, { childList: true, subtree: true });
});

function clickElement(element) {
  element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
}

var rematchButtonPressedTime = 0;
var rematchRequested = false;
var newGameRequested = false;

function detectAndClick() {
  var rematchButton = document.querySelector('button.ui_v5-button-component.ui_v5-button-basic[data-click-spam-id="5"]');
  var acceptRematchButton = document.querySelector('button.ui_v5-button-component.ui_v5-button-basic[data-click-spam-id="11"]');
  var newGameButton = document.querySelector('button.ui_v5-button-component.ui_v5-button-basic[data-click-spam-id="4"]');

  if (!rematchRequested) {
    // If rematch has not been requested yet, check for rematch button
    if (rematchButton) {
      console.log('Rematch button found:', rematchButton);
      clickElement(rematchButton);
      console.log('Rematch button clicked.');
      rematchButtonPressedTime = Date.now();
      rematchRequested = true;
      newGameRequested = false; // Reset newGameRequested flag
    }
  } else {
    // Rematch has been requested, check for new game button after 3 seconds
    if (Date.now() - rematchButtonPressedTime >= 3000 && !newGameRequested) {
      if (newGameButton) {
        console.log('New Game button found:', newGameButton);
        clickElement(newGameButton);
        console.log('New Game button clicked.');
        newGameRequested = true;
        rematchRequested = false; // Reset rematchRequested flag
      }
    }
  }

  var observer = new MutationObserver(function(mutationsList) {
    for (var mutation of mutationsList) {
      if (mutation.type === 'childList') {
        var addedNodes = Array.from(mutation.addedNodes);

        var addedRematchButton = addedNodes.find(function(node) {
          return (
            node.tagName === 'BUTTON' &&
            node.classList.contains('ui_v5-button-component') &&
            node.classList.contains('ui_v5-button-basic') &&
            node.getAttribute('data-click-spam-id') === '5'
          );
        });

        var addedAcceptRematchButton = addedNodes.find(function(node) {
          return (
            node.tagName === 'BUTTON' &&
            node.classList.contains('ui_v5-button-component') &&
            node.classList.contains('ui_v5-button-basic') &&
            node.getAttribute('data-click-spam-id') === '11'
          );
        });

        var addedNewGameButton = addedNodes.find(function(node) {
          return (
            node.tagName === 'BUTTON' &&
            node.classList.contains('ui_v5-button-component') &&
            node.classList.contains('ui_v5-button-basic') &&
            node.getAttribute('data-click-spam-id') === '4'
          );
        });

        if (addedRematchButton && !rematchRequested) {
          console.log('Element found:', addedRematchButton);
          clickElement(addedRematchButton);
          console.log('Button clicked.');
          rematchButtonPressedTime = Date.now();
          rematchRequested = true;
          newGameRequested = false; // Reset newGameRequested flag
          observer.disconnect();
        }

        if (addedAcceptRematchButton) {
          console.log('Element found:', addedAcceptRematchButton);
          clickElement(addedAcceptRematchButton);
          console.log('Button clicked.');
          observer.disconnect();
        }

        if (addedNewGameButton && rematchRequested && !newGameRequested && (Date.now() - rematchButtonPressedTime) >= 3000) {
          console.log('Element found:', addedNewGameButton);
          clickElement(addedNewGameButton);
          console.log('Button clicked.');
          newGameRequested = true;
          rematchRequested = false; // Reset rematchRequested flag
          observer.disconnect();
        }
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
  console.log('Elements not found. Waiting for the buttons to appear.');
}

function attemptClick() {
  detectAndClick();
  setTimeout(attemptClick, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
  console.log('Content script loaded.');
  attemptClick();
});

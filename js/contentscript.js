function clickElement(element) {
  element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
}

function detectAndClick() {
  var rematchButton = document.querySelector('button.ui_v5-button-component span.icon-font-chess.undo');
  var acceptRematchButton = document.querySelector('button.ui_v5-button-component span.icon-font-chess.correct');
  var nextGameButton = document.querySelector('button.ui_v5-button-component[aria-label="Next Game"]');
  var newGameButton = document.querySelector('button.ui_v5-button-component span.icon-font-chess.plus');

  // Click rematch button if available
  if (rematchButton) {
    console.log('Rematch button found:', rematchButton);
    clickElement(rematchButton.closest('button'));
    console.log('Rematch button clicked.');
    return; // Stop further processing
  }

  // Click accept rematch button if available
  if (acceptRematchButton) {
    console.log('Accept Rematch button found:', acceptRematchButton);
    clickElement(acceptRematchButton.closest('button'));
    console.log('Accept Rematch button clicked.');
    return; // Stop further processing
  }

  // Click next game button if available
  if (nextGameButton) {
    console.log('Next Game button found:', nextGameButton);
    clickElement(nextGameButton);
    console.log('Next Game button clicked.');
    // Delay before clicking the New Game button
    setTimeout(function() {
      if (newGameButton) {
        console.log('New Game button found:', newGameButton);
        clickElement(newGameButton.closest('button'));
        console.log('New Game button clicked.');
      }
    }, 2000);
    return; // Stop further processing
  }

  // Click New Game button directly if Next Game button not found
  if (newGameButton) {
    console.log('New Game button found:', newGameButton);
    clickElement(newGameButton.closest('button'));
    console.log('New Game button clicked.');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  console.log('Content script loaded.');
  setInterval(detectAndClick, 750); // Check every 3 seconds
});

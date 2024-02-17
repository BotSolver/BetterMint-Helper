function clickElement(element) {
  element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
}

function detectAndClick() {
  var rematchButton = document.querySelector('button.ui_v5-button-component span.icon-font-chess.undo');
  var acceptRematchButton = document.querySelector('button.ui_v5-button-component span.icon-font-chess.correct');
  var nextGameButton = document.querySelector('button.ui_v5-button-component[aria-label="Next Game"]');
  var newGameButton = document.querySelector('button.ui_v5-button-component span.icon-font-chess.plus');

  if (rematchButton) {
    console.log('Rematch button found:', rematchButton);
    clickElement(rematchButton.closest('button'));
    console.log('Rematch button clicked.');
    return;
  }

  if (acceptRematchButton) {
    console.log('Accept Rematch button found:', acceptRematchButton);
    clickElement(acceptRematchButton.closest('button'));
    console.log('Accept Rematch button clicked.');
    return;
  }

  if (nextGameButton) {
    console.log('Next Game button found:', nextGameButton);
    clickElement(nextGameButton);
    console.log('Next Game button clicked.');
    setTimeout(function() {
      if (newGameButton) {
        console.log('New Game button found:', newGameButton);
        clickElement(newGameButton.closest('button'));
        console.log('New Game button clicked.');
      }
    }, 2000);
    return;
  }

  if (newGameButton) {
    console.log('New Game button found:', newGameButton);
    clickElement(newGameButton.closest('button'));
    console.log('New Game button clicked.');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  console.log('Content script loaded.');
  setInterval(detectAndClick, 750);
});

function clickElement(element) {
  element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
}

function detectAndClick() {
  var targetButton = document.querySelector('button.ui_v5-button-component.ui_v5-button-basic[data-cy="sidebar-game-over-new-game-button"]');

  if (targetButton) {
    console.log('Element found:', targetButton);
    clickElement(targetButton);
    console.log('Button clicked.');

    chrome.runtime.sendMessage(true);
  } else {
    var observer = new MutationObserver(function(mutationsList) {
      for (var mutation of mutationsList) {
        if (mutation.type === 'childList') {
          var addedNodes = Array.from(mutation.addedNodes);
          var addedButton = addedNodes.find(function(node) {
            return (
              node.tagName === 'BUTTON' &&
              node.classList.contains('ui_v5-button-component') &&
              node.classList.contains('ui_v5-button-basic') &&
              node.getAttribute('data-cy') === 'sidebar-game-over-new-game-button'
            );
          });

          if (addedButton) {
            console.log('Element found:', addedButton);
            clickElement(addedButton);
            console.log('Button clicked.');
            observer.disconnect();
            chrome.runtime.sendMessage(true);
            return;
          }
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    console.log('Element not found. Waiting for the button to appear.');

    chrome.runtime.sendMessage(false);
  }
}

function attemptClick() {
  detectAndClick();
  setTimeout(attemptClick, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
  console.log('Content script loaded.');
  attemptClick();
});
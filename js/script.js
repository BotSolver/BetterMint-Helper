var storedMasterToggleState = localStorage.getItem('masterToggleState');
var masterToggle = document.getElementById('masterToggle');
masterToggle.checked = storedMasterToggleState === 'true';
function handleMasterToggle() {
  localStorage.setItem('masterToggleState', masterToggle.checked);
}
masterToggle.addEventListener('change', handleMasterToggle);

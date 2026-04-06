const toggleSuggested = document.getElementById('toggle-suggested');
const togglePromoted = document.getElementById('toggle-promoted');
const toggleLinkedInNews = document.getElementById('toggle-linkedin-news');
const togglePuzzles = document.getElementById('toggle-puzzles');

const defaultSettings = {
  hideSuggested: false,
  hidePromoted: false,
  hideLinkedInNews: false,
  hidePuzzles: false,
};

// ---------------------------------------------------------------------------
// Load persisted settings and reflect them in the UI
// ---------------------------------------------------------------------------

chrome.storage.sync.get(defaultSettings, (settings) => {
  toggleSuggested.checked = settings.hideSuggested;
  togglePromoted.checked = settings.hidePromoted;
  toggleLinkedInNews.checked = settings.hideLinkedInNews;
  togglePuzzles.checked = settings.hidePuzzles;
});

// ---------------------------------------------------------------------------
// Persist changes and notify the background script
// ---------------------------------------------------------------------------

function onToggleChange() {
  const settings = {
    hideSuggested: toggleSuggested.checked,
    hidePromoted: togglePromoted.checked,
    hideLinkedInNews: toggleLinkedInNews.checked,
    hidePuzzles: togglePuzzles.checked,
  };

  chrome.runtime.sendMessage({ type: 'UPDATE_SETTINGS', settings });
}

toggleSuggested.addEventListener('change', onToggleChange);
togglePromoted.addEventListener('change', onToggleChange);
toggleLinkedInNews.addEventListener('change', onToggleChange);
togglePuzzles.addEventListener('change', onToggleChange);

## Project Title
CleanIn - LinkedIn Feed Cleanup Chrome Extension

## Your Role
Lead Developer

## Project Description
CleanIn is a Chrome extension that removes low-value LinkedIn feed clutter so users can focus on organic posts.

It detects and filters Suggested, Promoted, and Promoted by content, plus optional sidebar modules like LinkedIn News and Today's puzzles. Users can manage all filters from a side panel and choose whether filtered items are hidden entirely or shown in a transparent mode.

Extension: Chrome Extension (Manifest V3), JavaScript
UI: Side Panel HTML/CSS/JavaScript
Storage and Messaging: `chrome.storage.sync`, runtime messaging, service worker background script
Platform: LinkedIn web feed (`linkedin.com` and `linkedin.com/feed/*`)

## Short Caption
Chrome extension that cleans up the LinkedIn feed by filtering promoted and suggested content with user-controlled side panel settings.

## Longer Portfolio Notes
- Built a Manifest V3 Chrome extension with content script, background service worker, and side panel controls for real-time LinkedIn feed cleanup.
- Implemented DOM-based detection and filtering for Suggested, Promoted, and Promoted by posts, including dynamic feed updates in LinkedIn's SPA environment.
- Added optional filtering for sidebar modules (LinkedIn News and Today's puzzles) to reduce non-essential distractions.
- Created a user-configurable side panel with persistent settings using `chrome.storage.sync` and immediate in-page updates via extension messaging.
- Added dual display modes so filtered content can be either fully hidden or shown transparently for users who want visual context without distraction.
- Packaged and documented extension release workflow for Chrome Web Store submission, including privacy and permission rationale materials.


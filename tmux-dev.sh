#!/usr/bin/env zsh
# LinkedIn Feed Reducer — dev watcher

set -euo pipefail

EXTENSION_DIR="$(cd "$(dirname "$0")" && pwd)"

# Install fswatch if missing
if ! command -v fswatch &>/dev/null; then
  echo "fswatch not found — installing via Homebrew..."
  brew install fswatch
fi

echo "Watching $EXTENSION_DIR"
echo "Reload will be triggered on any .js / .html / .css / .json change."
echo "Press Ctrl-C to stop."
echo ""

fswatch \
  --recursive \
  --include='.*\.(js|html|css|json)$' \
  --exclude='node_modules' \
  --event Created --event Updated --event Renamed \
  "$EXTENSION_DIR" \
| while read -r changed_file; do
    echo "[$(date +%H:%M:%S)] Changed: ${changed_file#$EXTENSION_DIR/}"

    osascript 2>/dev/null <<'APPLESCRIPT' || true
      tell application "Google Chrome"
        set extURL to "chrome://extensions/"
        set reloaded to false
        repeat with w in windows
          repeat with t in tabs of w
            if URL of t starts with extURL or URL of t starts with "chrome-extension://" then
              tell t to reload
              set reloaded to true
            end if
          end repeat
        end repeat
        if not reloaded then
          open location extURL
        end if
      end tell
APPLESCRIPT

    echo "    Extension reload triggered."
  done

<h2><img src="./dist/icons/icon48.png" alt="CleanIn" width="40" height="40" style="vertical-align: middle; margin-right: 10px;" /> CleanIn</h2>

CleanIn is a simple chrome extension that hides suggested and promoted LinkedIn feed posts you never asked to see. 

![CleanIn demo](screenshots/cleanin-demo.png)

It also hides other elements such as LinkedIn News and Puzzles. 

By default they are totally hidden, and you can switch to transparent mode if you want to debug what was filtered.

## Docs & store releases

- Chrome Web Store form copy and justifications: [docs/chrome-web-store-privacy-answers.md](docs/chrome-web-store-privacy-answers.md) (see also [docs/README.md](docs/README.md)).
- Packaged extension ZIPs for upload: [release/](release/).

## Developer instructions

1. Clone this repo.
2. Optional: [snippets/](snippets/) has small reference HTML files for the feed and sidebar shapes the content script looks for.
3. Open `chrome://extensions` in Chrome.
4. Toggle **Developer mode** on (top right).
5. Click **Load unpacked** and select the [dist/](dist/) folder.
6. Visit [linkedin.com](https://www.linkedin.com/) or [linkedin.com/feed](https://www.linkedin.com/feed/) and open the extension side panel to adjust filters.

## Caveats
- Only matches the English LinkedIn UI. If your LinkedIn is in French, *toutes mes excuses*.
- LinkedIn could rename "Suggested" to "Things You'll Love" tomorrow and break everything. That's the deal you sign when you scrape a SPA.
- Does not, sadly, hide posts that begin with "Unpopular opinion:".

## License
- MIT. Use it, fork it, ship a better version. Just don't promote it on LinkedIn.

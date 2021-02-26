# Track It With Code

This repo is a batteries included online scraping and tracking toolkit. Use it to scrape things online, track the changes, and be notified when something changes.

## Some example use cases

1. Be notified when a new Apple press release comes out.
2. Scrape ebay for when that thing you've been looking for comes up.
3. Keep a simple historical record of the top Reddit posts over time.

# How it works

The repo uses GitHub actions to do the scraping and commits the results of the scrape in the repo. It uses [tatooine](https://github.com/obetomuniz/tatooine) as the scraping engine. Tatooine supports scraping a variety of sources and is very flexible.

# How to use

1. Fork this repo
2. Edit `src/index.ts`
3. Push changes to GitHub
4. Done!

## Local test

1. run `yarn`
2. run `yarn tsc -w`
3. In another terminal, run `node dist/src/index.js`

## Email Notifications

If you want to be notified on email when something changes (when the GitHub action makes a new commit):

1. Go to your forked repo in GitHub
2. Click Settings -> Notifications
3. Add your email

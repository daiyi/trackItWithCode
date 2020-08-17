// @ts-expect-error – this isn't typed... yet
import Tatooine from "tatooine"

// SPA example, see more docs here: https://github.com/obetomuniz/tatooine/blob/master/docs/engines/SPA.md
const hackerNewsScraper = {
  // engine: String => Engine identifier
  engine: "spa",
  // options: Object => Engine options
  options: {
    // request: Object => Request settings
    request: {
      // url: String => URL that should be requested
      url: "https://news.ycombinator.com/",
    },
  },
  // selectors: Object => Maps the selectors that contain data
  selectors: {
    // root: Object => Allows access a HTML Node List that will have the data mapped
    root: {
      // value: String => Query selector of the HTML Node List. (E.g.: 'ul li', '.articles-list article', etc.)
      value: ".itemlist tr.athing",
    },
    date: {
      value: ".field-content",
    },
    // selector: Object => Object key that will store the data extracted as configured
    rank: { value: ".rank" },
    title: { value: ".storylink" },
    link: { value: ".storylink", attribute: "href" }
  },
  metadata: {
    name: "Hacker News",
  },
}


// @ts-expect-error Tatooine isn't typed
Tatooine([hackerNewsScraper]).then(([scrapedHackerNewsData]) => {
  console.log(JSON.stringify(scrapedHackerNewsData, null, 2))
})
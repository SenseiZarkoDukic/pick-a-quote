const fs = require("fs");
const path = require("path");
const http = require("http");
const url = require("url");
const slugify = require("slugify");

const replaceTemplate = require("./modules/replaceTemplate");

///////////////////////////////////////////////
// SERVER

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

const tempRandomQuote = fs.readFileSync(
  `${__dirname}/templates/template-random-quote.html`,
  "utf-8"
);

let quotesData;
try {
  const quotes = fs.readFileSync(`${__dirname}/dev-data/quotes.json`, "utf-8");
  quotesData = JSON.parse(quotes);
} catch (error) {
  console.error("Error parsing quotes.json:", error);
}

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // New endpoint for getting a random quote
  if (pathname === "/random-quote") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    const randomIndex = Math.floor(Math.random() * quotesData.length);
    const randomQuote = quotesData[randomIndex];
    const randomAuthor = randomQuote.author;

    let output = tempRandomQuote.replace("%RANDOM-QUOTE%", randomQuote.quote);
    output = output.replace("%RANDOM-AUTHOR%", randomAuthor);
    res.end(output);
    return;
  }

  // Overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

    const cardsHtml = quotesData
      .map((el) => replaceTemplate(tempCard, el))
      .join("");

    const output = tempOverview.replace("%QUOTE_CARDS%", cardsHtml);
    res.end(output);
  }

  // API
  else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(JSON.stringify(quotesData));
  }

  // Not found
  else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});

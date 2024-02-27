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

let quotesData;
try {
  const quotes = fs.readFileSync(`${__dirname}/dev-data/quotes.json`, "utf-8");
  quotesData = JSON.parse(quotes);
} catch (error) {
  console.error("Error parsing quotes.json:", error);
}

console.log(quotesData);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // Overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = quotesData
      .map((el) => replaceTemplate(tempCard, el))
      .join("");

    const output = tempOverview.replace("%QUOTE_CARDS%", cardsHtml);
    res.end(output);
  }

  // API
  else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(quotes);
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

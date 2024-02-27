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

const quotes = fs.readFileSync(`${__dirname}/dev-data/quotes.json`, "utf-8");
const quotesData = JSON.parse(quotes);
console.log(quotesData);

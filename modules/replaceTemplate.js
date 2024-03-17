const slugify = require("slugify");

module.exports = (temp, quote) => {
  let output = temp;
  for (let key in quote) {
    output = output.replace(
      new RegExp(`%${key.toUpperCase()}%`, "g"),
      quote[key]
    );
  }
  const authorClass = slugify(quote.author, { lower: true, strict: true });

  output = output.replace(/%QUOTE%/g, quote.quote);
  output = output.replace(/%AUTHOR%/g, quote.author);
  output = output.replace(/%RANDOM-QUOTE%/g, quote.quote);
  output = output.replace(/%RANDOM-AUTHOR%/g, quote.author);
  output = output.replace(/%AUTHOR-CLASS%/g, authorClass);
  console.log(authorClass);

  return output;
};

module.exports = (temp, quote) => {
  let output = temp.replace(/%QUOTE%/g, quote.quote);
  output = output.replace(/%AUTHOR%/g, quote.author);
  output = output.replace(/%RANDOM-QUOTE%/g, quote.quote);
  output = output.replace(/%RANDOM-AUTHOR%/g, quote.author);
  return output;
};

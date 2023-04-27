#!/usr/bin/env node

const axios = require("axios");
const { Readability } = require("@mozilla/readability");
const { JSDOM } = require("jsdom");
const fs = require("fs");
const TurndownService = require("turndown");

async function main() {
  const args = process.argv.slice(2);
  const shouldConvertToMarkdown = args.includes("-md");

  if (shouldConvertToMarkdown) {
    args.splice(args.indexOf("-md"), 1);
  }

  const url = args[0];
  const outputFile = args[1];

  if (!url || !outputFile) {
    console.error("Usage: node extractContent.js [-md] <URL> <output_file>");
    process.exit(1);
  }

  await fetchAndExtractContent(url, outputFile, shouldConvertToMarkdown);
}

async function fetchAndExtractContent(url, outputFile, shouldConvertToMarkdown) {
  try {
    const response = await axios.get(url);
    const { data } = response;

    const doc = new JSDOM(data, {
      url: url,
    });

    const reader = new Readability(doc.window.document);
    const article = reader.parse();

    if (!article) {
      console.error("Error parsing the main content");
      return;
    }

    let content = article.content;
    if (shouldConvertToMarkdown) {
      const turndownService = new TurndownService();
      content = turndownService.turndown(content);
    }

    fs.writeFile(outputFile, content, (err) => {
      if (err) {
        console.error("Error writing the main content to the output file:", err);
        return;
      }

      console.log("Main content extracted and saved to:", outputFile);
    });
  } catch (error) {
    console.error("Error fetching the URL:", error);
  }
}

main();

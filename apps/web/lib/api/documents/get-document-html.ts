import * as cheerio from "cheerio";

import { PARLIAMENT_BASE_URL } from "@lib/constants";

export default async function getDocumentHtml(id: string): Promise<string> {
  const response = await fetch(`${PARLIAMENT_BASE_URL}/dokument/${id}`, {
    cache: "force-cache",
  });

  const html = await response.text();

  const $ = cheerio.load(html);

  // Remove the custom style
  $("style").remove();
  // Remove the style attribute from all elements
  $("[style]").removeAttr("style");
  // Transform all image URLs to be HTTPS
  $("img").each((_, element) => {
    const src = $(element).attr("src");
    if (src) {
      $(element).attr("src", src.replace("http://", "https://"));
    }
  });
  // Transform TOC `Bilaga [number]<br>[title]` to `Bilaga [number]: [title]`
  $('[class^="TOC"]').each((_, element) => {
    const text = $(element).text();
    const match = text.match(/Bilaga(?: (\d+))?(.+)/);

    if (match) {
      // Remove the redundant elements
      $(element).children("span").remove();
      $(element).children("br").remove();
      const linkText = $(element).children("a").children("span");
      const prefix = match[1] ? `Bilaga ${match[1]}: ` : "Bilaga: ";
      // Replace the text with the new format
      $(linkText).text(`${prefix}${match[2]}`);
    }
  });

  // Transform all of the class names to be prefixed with `parliament-`
  $("[class]").each((_, element) => {
    const classes = $(element).attr("class")?.split(" ") ?? [];
    $(element).attr("class", classes.map((c) => `parliament-${c}`).join(" "));
  });

  // Change spans with only spaces to contain a single thin space
  $("span").each((_, element) => {
    const text = $(element).text();
    if (text.match(/^\s+$/)) {
      $(element).text("\u2009");
    }
  });

  return $.html();
}

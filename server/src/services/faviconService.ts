import * as cheerio from "cheerio";

const FAVICON_APIS = {
  google: (domain: string) =>
    `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
  duckduckgo: (domain: string) =>
    `https://icons.duckduckgo.com/ip3/${domain}.ico`,
};

interface SiteMetadata {
  name: string;
  favicon: string;
}

function extractDomain(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.hostname;
  } catch {
    throw new Error("Invalid URL provided");
  }
}

function deriveNameFromDomain(domain: string): string {
  const parts = domain.replace(/^www\./, "").split(".");
  const name = parts[0];
  return name.charAt(0).toUpperCase() + name.slice(1);
}

async function scrapeMetadata(url: string): Promise<Partial<SiteMetadata>> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });
    clearTimeout(timeout);

    if (!response.ok) return {};

    const html = await response.text();
    const $ = cheerio.load(html);

    const name =
      $('meta[property="og:site_name"]').attr("content") ||
      $('meta[property="og:title"]').attr("content") ||
      $("title").first().text().split(/[|\-–—]/)[0].trim() ||
      "";

    const favicon =
      $('link[rel="apple-touch-icon"]').attr("href") ||
      $('link[rel="icon"][sizes="192x192"]').attr("href") ||
      $('link[rel="icon"][sizes="128x128"]').attr("href") ||
      $('link[rel="icon"]').attr("href") ||
      $('link[rel="shortcut icon"]').attr("href") ||
      "";

    return {
      name: name || undefined,
      favicon: favicon ? new URL(favicon, url).href : undefined,
    };
  } catch {
    return {};
  }
}

export async function discoverSiteMetadata(url: string): Promise<SiteMetadata> {
  const domain = extractDomain(url);

  const scraped = await scrapeMetadata(url);

  const name = scraped.name || deriveNameFromDomain(domain);
  const favicon = scraped.favicon || FAVICON_APIS.google(domain);

  return { name, favicon };
}
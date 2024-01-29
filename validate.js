export default validateList = (urlList) => {
  if (!urlList) throw new Error("URL list is empty");
  for (const urlRoute of urlList) {
    if (typeof urlRoute !== "string") throw new Error("URL is not a string");
    if (urlRoute.length === 0)
      throw new Error("Empty string is not a valid URL");

    validateUrlProtocol(urlRoute);
    validateUrlLength(urlRoute);
  }
};

const validateUrlProtocol = (url) => {
  const allowedProtocols = ["http:", "https:"];
  const urlObj = new URL(url);
  if (!allowedProtocols.includes(urlObj.protocol)) {
    throw new Error(`Disallowed protocol in URL: ${url}`);
  }
};

const validateUrlLength = (url, maxLength = 2048) => {
  if (url.length > maxLength) {
    throw new Error(
      `URL exceeds maximum length of ${maxLength} characters: ${url}`
    );
  }
};

import { google } from "googleapis";
import sendNotification from "./sendNotification";
import validateList from "./validate";

export default async function notifyGoogle(
  urlList,
  credentials,
  oldUrlList = null
) {
  validateList(urlList);
  if (oldUrlList) validateList(oldUrlList);

  const auth = new google.auth.GoogleAuth({
    credentials: credentials,
    scopes: ["https://www.googleapis.com/auth/indexing"],
  });

  if (!auth) throw new Error("Google auth error");

  const indexingAPI = google.indexing({ version: "v3", auth });

  const currentUrls = new Set(urlList);
  const previousUrls = new Set(oldUrlList || []);

  for (const urlRoute of currentUrls) {
    if (!previousUrls.has(urlRoute)) {
      await sendNotification(indexingAPI, urlRoute);
    }
  }

  if (oldUrlList) {
    for (const urlRoute of previousUrls) {
      if (!currentUrls.has(urlRoute)) {
        await sendNotification(indexingAPI, urlRoute, "URL_DELETED");
      }
    }
  }
}

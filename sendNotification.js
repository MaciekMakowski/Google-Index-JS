const sendNotification = async (
  indexingAPI,
  urlRoute,
  urlType = "URL_UPDATED"
) => {
  try {
    await indexingAPI.urlNotifications.publish({
      requestBody: {
        url: urlRoute,
        type: urlType,
      },
    });
    console.log(`Google update notification: ${urlRoute}`);
  } catch (error) {
    console.error(`Google notification error: ${error}`);
  }
};

export default sendNotification;

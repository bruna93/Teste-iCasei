import { google } from "googleapis";
import http from "http";

export default async function route(
  req: http.IncomingMessage,
  res: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  },
) {
  const youtube = google.youtube({
    auth: process.env.GOOGLE_API_KEY,
    version: "v3",
  });

  const data = await youtube.videos
    .list({
      part: ["snippet"],
      chart: "mostPopular",
    })
    .then((response) => {
      return response.data.items;
    })
    .catch((error) => {
      console.warn(error);

      return null;
    });

  if (data === null) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "500 Internal Server Error" }));
  }

  res.writeHead(200, {
    "access-control-allow-origin": "*",
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify(data));
}

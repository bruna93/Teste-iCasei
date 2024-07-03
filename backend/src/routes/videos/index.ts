import controller from "@/controllers/videos";
import http from "http";
import url from "url";

export default async function route(
  req: http.IncomingMessage,
  res: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  },
) {
  const URL = new url.URL(req.url || "", `https://${req.headers.host}`);
  const query = URL.searchParams.get("q");

  const data = await controller.fetchYoutubeVideos(query);

  if (data === null || data === undefined) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "500 Internal Server Error" }));
  }

  res.writeHead(200, {
    "access-control-allow-origin": "*",
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify(data));
}

import http from "http";
import routeVideos from "@/routes/videos/index";

export default function routes(
  req: http.IncomingMessage,
  res: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  },
) {
  const path = req.url || "/";

  switch (path) {
    case "/videos":
      routeVideos(req, res);
      break;
    default:
      res.end(
        JSON.stringify({
          message: "Welcome",
        }),
      );
      break;
  }
}

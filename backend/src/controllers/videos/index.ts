import { google } from "googleapis";

const fetchYoutubeVideos = async (query: string | null) => {
  const youtube = google.youtube({
    auth: process.env.GOOGLE_API_KEY,
    version: "v3",
  });

  const q =
    typeof query === "string" && query !== "null" ? query : "Gatinhos dançado";

  return await youtube.search
    .list({
      q: q,
      part: ["snippet"],
      maxResults: 8,
    })
    .then((res) => res.data.items)
    .catch((err) => {
      console.warn(err);
      return null;
    });
};

export const controller = {
  fetchYoutubeVideos: fetchYoutubeVideos,
};

export default controller;

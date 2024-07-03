import { VideosGenerator } from "./videosGenerator";

(() => {
  document.addEventListener("DOMContentLoaded", async () => {
    const videos = new VideosGenerator({ query: null, mode: "storage" });
  });
})();

import { VideosGenerator } from "./videosGenerator";

type FormDataValues = {
  q: string;
};

(() => {
  document.addEventListener("DOMContentLoaded", async () => {
    const videos = new VideosGenerator({ query: null, mode: "fetch" });
    const form = document.querySelector("#videos-form") as HTMLFormElement;

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const target = event.target as HTMLFormElement;
      const formData = new FormData(target);
      const { q }: FormDataValues = Object.fromEntries(
        formData.entries(),
      ) as FormDataValues;

      videos.refetch(q);
    });
  });
})();

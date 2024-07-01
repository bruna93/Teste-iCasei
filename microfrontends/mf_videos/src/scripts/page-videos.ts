type GenerateVideosCard = (
  template: Document,
  options: {
    thumbnail: Video["snippet"]["thumbnails"]["standard"]["url"];
    title: Video["snippet"]["title"];
  },
) => HTMLDivElement;

type Video = {
  snippet: {
    thumbnails: {
      standard: {
        url: string;
      };
    };
    title: string;
  };
};

(() => {
  document.addEventListener("DOMContentLoaded", async () => {
    const videos = await fetchYoutubeVideos();
    const template = await fetchHTMLPage("index.html");

    generateVideosList("#videos-list", videos, template);
  });
})();

const fetchYoutubeVideos = async () => {
  const videos = await fetch(`${import.meta.env.VITE_API_BASE_URL}/videos`)
    .then((res) => res.json())
    .then((data: Video[]) => data);

  return videos;
};

const fetchHTMLPage = async (
  input: URL | RequestInfo,
  init?: RequestInit | undefined,
) => {
  const response = await fetch(input, init);
  const HTML = await response.text();
  const DOM = new DOMParser().parseFromString(HTML, "text/html");

  return DOM;
};

const generateVideosCard: GenerateVideosCard = (
  template,
  { thumbnail, title: propTitle },
) => {
  const templateVideoCard = parseTemplate(
    template,
    "#template-video-card",
  ) as HTMLTemplateElement;
  const content = templateVideoCard.content.cloneNode(true) as HTMLDivElement;
  const image: HTMLImageElement | null = content.querySelector(
    ".template-video-card-thumbnail__image",
  );
  const title = content.querySelector(".template-video-card-info__title");

  if (image === null || title === null)
    throw new Error("Unable to select template-video-card elements");

  image.src = thumbnail;
  image.style.filter = "blur(0rem)";
  title.innerHTML = propTitle;

  return content;
};

const generateVideosList = async (
  selectors: keyof HTMLElementTagNameMap | string,
  videos: Video[],
  template: Document,
) => {
  const videosList = document.querySelector(selectors);

  if (videosList === null) throw new Error(`Unable to select ${selectors}`);

  videos.map((video) => {
    const card = generateVideosCard(template, {
      thumbnail: video.snippet.thumbnails.standard.url,
      title: video.snippet.title,
    });

    videosList.appendChild(card);
  });

  return videosList;
};

const parseTemplate = (
  template: Document,
  selectors: keyof HTMLElementTagNameMap | string,
) => {
  const element = template.querySelector(selectors);

  if (element === null) throw new Error("Template === null");
  else return element;
};

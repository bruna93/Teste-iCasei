import { fetchHTMLPage, parseTemplate } from "./utils";

type GenerateVideosCard = (
  options: {
    starred: boolean;
    thumbnail: string;
    title: string;
  },
  video: Video,
) => HTMLDivElement;

export type Thumbnails = {
  url: string;
};

export type Video = {
  id: { videoId: string };
  snippet: {
    thumbnails: {
      default?: Thumbnails;
      high?: Thumbnails;
      medium?: Thumbnails;
      standard?: Thumbnails;
    };
    title: string;
  };
};

export type VideosConstructor = {
  containerID?: keyof HTMLElementTagNameMap | string;
  query: string | null;
  mode: "fetch" | "storage";
  templateTagID?: keyof HTMLElementTagNameMap | string;
  templateURL?: keyof HTMLElementTagNameMap | string;
};

export class VideosGenerator {
  private containerID: VideosConstructor["containerID"];
  private mode: VideosConstructor["mode"] = "fetch";
  private templateHTML: Document = new Document();
  private templateTagID: VideosConstructor["templateTagID"];
  private storageName = "storage-videos";
  private storageVideos: Video[] = JSON.parse(
    window.localStorage.getItem(this.storageName) || "[]",
  );
  public videos: Video[] = [];

  constructor({
    containerID = "#videos-list",
    query,
    mode = "fetch",
    templateTagID = "#template-video-card",
    templateURL = "template.html",
  }: VideosConstructor) {
    (async () => {
      this.containerID = containerID;
      this.mode = mode;
      this.templateHTML = await fetchHTMLPage(templateURL);
      this.templateTagID = templateTagID;
      this.videos = await this.fetchYouTubeVideos(query);

      this.generateVideosList();
    })();
  }

  private fetchLocalStorage = async () => {
    const storage = window.localStorage.getItem(this.storageName);
    const data: Video[] = storage === null ? [] : JSON.parse(storage);

    return data;
  };

  private fetchYouTubeVideos = async (query: VideosConstructor["query"]) => {
    const videos = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/videos?q=${query}`,
    )
      .then((res) => res.json())
      .then((data: Video[]) => data);

    return videos;
  };

  private generateVideosCard: GenerateVideosCard = (
    { starred, thumbnail, title: propTitle },
    video,
  ) => {
    const templateVideoCard = parseTemplate(
      this.templateHTML,
      this.templateTagID || "",
    ) as HTMLTemplateElement;
    const content = templateVideoCard.content.cloneNode(true) as HTMLDivElement;
    const buttonPlay = content.querySelector(
      ".template-video-card-button__play",
    ) as HTMLButtonElement | null;
    const buttonStar = content.querySelector(
      ".template-video-card-button__star",
    ) as HTMLButtonElement | null;
    const image = content.querySelector(
      ".template-video-card-thumbnail__image",
    ) as HTMLImageElement | null;
    const title = content.querySelector(".template-video-card-info__title");

    if (
      image === null ||
      buttonPlay === null ||
      buttonStar === null ||
      title === null
    )
      throw new Error("Unable to select template-video-card elements");

    if (starred === true)
      buttonStar.classList.add("template-video-card-button__star--active");
    else
      buttonStar.classList.remove("template-video-card-button__star--active");

    buttonPlay.addEventListener("click", (event) => {
      event.preventDefault();

      window.parent.postMessage(
        { videoId: video.id.videoId },
        "http://localhost:3003",
      );
    });

    buttonStar.addEventListener("click", (event) => {
      event.preventDefault();

      this.storageVideo(video);
    });

    image.src = thumbnail;
    image.style.filter = "blur(0rem)";
    title.innerHTML = propTitle;

    return content;
  };

  private generateVideosList = async () => {
    const container = document.querySelector(this.containerID || "");
    const map = this.mode === "fetch" ? this.videos : this.storageVideos;
    const storage = await this.fetchLocalStorage();

    if (container === null)
      throw new Error(`Unable to select ${this.containerID}`);

    container.innerHTML = "";

    map.map((video) => {
      const starred = storage.find(
        (prop) => prop.id.videoId === video.id.videoId,
      );
      const thumbnailDefault = video.snippet.thumbnails.default?.url;
      const thumbnailHigh = video.snippet.thumbnails.high?.url;
      const thumbnailMedium = video.snippet.thumbnails.medium?.url;
      const thumbnailStandard = video.snippet.thumbnails.standard?.url;

      const card = this.generateVideosCard(
        {
          starred: starred === undefined ? false : true,
          thumbnail:
            thumbnailStandard ||
            thumbnailHigh ||
            thumbnailMedium ||
            thumbnailDefault ||
            "",
          title: video.snippet.title,
        },
        video,
      );

      container.appendChild(card);
    });

    return container;
  };

  private storageVideo = async (video: Video) => {
    const id = video.id.videoId;
    const data = await this.fetchLocalStorage();
    const exists = data.find((prop) => prop.id.videoId === id);
    const newStorage =
      exists === undefined ?
        data.concat(video)
      : data.filter((prop) => prop.id.videoId !== id);

    window.localStorage.setItem(this.storageName, JSON.stringify(newStorage));

    this.storageVideos = newStorage;
    this.generateVideosList();
  };

  public refetch = async (query: VideosConstructor["query"]) => {
    this.videos = await this.fetchYouTubeVideos(query);
    this.generateVideosList();
  };
}

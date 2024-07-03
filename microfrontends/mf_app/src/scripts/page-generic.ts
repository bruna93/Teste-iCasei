import Micromodal from "micromodal";

type MessageData3001 = {
  route: string;
};

type MessageData3002 = {
  videoId: string;
};

(() => {
  window.addEventListener("DOMContentLoaded", () => {
    Micromodal.init();
  });

  window.addEventListener("message", (event) => {
    if (event.origin === "http://localhost:3001") {
      const data: MessageData3001 = event.data;
      window.location.href = data.route;

      return;
    }

    if (event.origin === "http://localhost:3002") {
      const { videoId }: MessageData3002 = event.data;

      openModal(videoId);
    }
  });
})();

const openModal = async (videoId: MessageData3002["videoId"]) => {
  const modal = document.querySelector("#modal");
  if (modal === null) throw new Error("Unable to select modal");

  const iframe = modal.querySelector("iframe");
  if (iframe === null) throw new Error("Unable to select iframe");

  iframe.src = `http://www.youtube.com/embed/${videoId}`;

  Micromodal.show("modal", {
    openClass: "modal--open",
    onClose: () => (iframe.src = ""),
  });
};

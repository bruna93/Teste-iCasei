(async () => {
  document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector("#nav");
    if (nav === null) throw new Error("Unable to select element");

    const anchors = nav.querySelectorAll("a");

    anchors.forEach((anchor) => {
      anchor.addEventListener("click", (event) => {
        event.preventDefault();

        const target = event.target as HTMLAnchorElement;
        const route = target.getAttribute("data-route");

        window.parent.postMessage({ route: route }, "http://localhost:3003");
      });
    });
  });
})();

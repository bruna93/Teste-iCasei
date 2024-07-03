export const fetchHTMLPage = async (
  input: RequestInfo | URL,
  init?: RequestInit,
) => {
  const response = await fetch(input, init);
  const HTML = await response.text();
  const DOM = new DOMParser().parseFromString(HTML, "text/html");

  return DOM;
};

export const parseTemplate = (
  template: Document,
  selectors: keyof HTMLElementTagNameMap | string,
) => {
  const element = template.querySelector(selectors);

  if (element === null) throw new Error("Unable to find template");
  else return element;
};

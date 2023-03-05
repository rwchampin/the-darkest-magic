export const Canvas2d = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const waitUntilWindowLoaded = () => {
    return new Promise((resolve) => {
      window.addEventListener("load", resolve);
    });
  };
  const init = async () => {
    await waitUntilWindowLoaded();
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.setAttribute("id", "main-canvas-2d");
    canvas.setAttribute("class", "ui-canvas");

    document.body.appendChild(canvas);
  };
  init();
  return ctx;
};

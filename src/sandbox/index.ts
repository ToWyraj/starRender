import Engine from "./engine";
import "../css/index.css";
import Star from "./star";
import Renderer from "@/core/aurora/renderer/renderer";
const STARS_COUNT = 20000;
const stars: Star[] = [];
let hueShift = 0;
await Engine.init();

for (let index = 0; index < STARS_COUNT; index++) {
  stars.push(new Star());
}

Engine.update(() => {
  hueShift += 2;
  Renderer.setScreenSettings({ hueShift: hueShift });
  const mouse = Engine.getMousePos();
  const canvasSize = Engine.getCanvasSize();
  stars.forEach((star) => {
    star.update(mouse, canvasSize);
    star.draw();
  });
});

Engine.start();

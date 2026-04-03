import Aurora from "@/core/aurora/core";
import Renderer from "@/core/aurora/renderer/renderer";
import auroraConfig from "@/core/aurora/renderer/config";
const CONFIG = auroraConfig({
  userFonts: [],
  userTextures: [],
  camera: { builtInCameraInputs: false, speed: 2 },
  feature: {
    bloom: true,
    lighting: true,
  },
  debugger: "none",
  rendering: {
    toneMapping: "aces",
    drawOrigin: "center",
    sortOrder: "y+x+z",
    renderRes: "1920x1080",
    canvasColor: [0, 0, 0, 255],
  },
});
export default class Engine {
  private static gameLoop: () => void = () => {};

  public static async init() {
    await Aurora.init();
    await Renderer.initialize(CONFIG);
    Aurora.canvas.width = window.innerWidth;
    Aurora.canvas.height = window.innerHeight;
    window.addEventListener("resize", () => {
      Aurora.canvas.width = window.innerWidth;
      Aurora.canvas.height = window.innerHeight;
    });
  }
  public static start() {
    this.mainLoop();
  }
  private static mainLoop() {
    Renderer.beginBatch();
    this.gameLoop();
    Renderer.endBatch();
    requestAnimationFrame(() => this.mainLoop());
  }
  public static update(loop: () => void) {
    this.gameLoop = loop;
  }
}

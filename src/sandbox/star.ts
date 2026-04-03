import Aurora from "@/core/aurora/core";
import Draw from "@/core/aurora/draw";
import { randomColor } from "@/utils/utils";

const RADIUS_MULTI = 2; // size multiplier

export default class Star {
  public position: Position3D;
  public radius: number;
  public color: RGBA;
  constructor() {
    const canvas = Aurora.canvas;
    const size = {
      width: canvas.width,
      height: canvas.height,
    };
    this.position = {
      x: Math.random() * size.width,
      y: Math.random() * size.height,
      z: 1,
    };

    this.radius = Math.random() * RADIUS_MULTI + 0.5;
    this.color = [...randomColor(), Math.floor(Math.random() * 256)];
  }
  public draw() {
    Draw.rect({
      position: this.position,
      size: { width: this.radius, height: this.radius },
      tint: [this.color[0], this.color[1], this.color[2], this.color[3]],
      emissive: 3,
    });
  }
}

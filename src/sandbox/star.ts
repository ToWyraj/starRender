import Aurora from "@/core/aurora/core";
import Draw from "@/core/aurora/draw";
import { randomColor } from "@/utils/utils";

const RADIUS_MULTI = 2; // size multiplier
const GRAVITY_RADIUS = 100; // gravity effect size
const GRAVITY_RADIUS_SQR = GRAVITY_RADIUS * GRAVITY_RADIUS; // squared
const PULL = 0.35; // pull force
const SPIN = 0.15; // spin force
const FRICTION = 0.98; // friction
const BASE_ILLU = 0.2; // Illu when idle
const SPEED_ILLU = 0.5; // speed illu multiplier
const MAX_ILLU = 2.5; // max illu
const MIN_GLOW = 2.5; // glow min
const MAX_GLOW = 25; // glow max
export default class Star {
  public position: Position3D;
  private velocity: Position2D;
  private speed: number = 0;
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
    this.velocity = {
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
    };

    this.radius = Math.random() * RADIUS_MULTI + 0.5;
    this.color = [...randomColor(), Math.floor(Math.random() * 256)];
  }

  public update(mouse: Position2D, canvasSize: Size2D) {
    const dx = mouse.x - this.position.x;
    const dy = mouse.y - this.position.y;
    const distSq = dx * dx + dy * dy;

    if (distSq < GRAVITY_RADIUS_SQR && distSq > 0) {
      const distance = Math.sqrt(distSq);
      const force = (GRAVITY_RADIUS - distance) / GRAVITY_RADIUS;

      const distInv = 1 / distance;

      this.velocity.x += dx * distInv * PULL * force;
      this.velocity.y += dy * distInv * PULL * force;

      this.velocity.x += dy * distInv * SPIN * force;
      this.velocity.y -= dx * distInv * SPIN * force;
    }

    this.velocity.x *= FRICTION;
    this.velocity.y *= FRICTION;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.speed = Math.sqrt(
      this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y,
    );

    if (this.position.x < 0) this.position.x = canvasSize.width;
    else if (this.position.x > canvasSize.width) this.position.x = 0;

    if (this.position.y < 0) this.position.y = canvasSize.height;
    else if (this.position.y > canvasSize.height) this.position.y = 0;
  }
  public draw() {
    const intensity = Math.min(BASE_ILLU + this.speed * SPEED_ILLU, MAX_ILLU);
    const r = Math.floor(Math.min(this.color[0] * intensity));
    const g = Math.floor(Math.min(this.color[1] * intensity));
    const b = Math.floor(Math.min(this.color[2] * intensity));
    const a = this.color[3];
    const decay = Math.exp(-intensity * 4);
    const finalEmissive = MIN_GLOW + MAX_GLOW * decay;
    Draw.rect({
      position: this.position,
      size: { width: this.radius, height: this.radius },
      tint: [r, g, b, a],
      emissive: finalEmissive,
    });
  }
}

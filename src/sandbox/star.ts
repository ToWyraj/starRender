import Aurora from "@/core/aurora/core";
import Draw from "@/core/aurora/draw";
import { randomColor } from "@/utils/utils";

const RADIUS_MULTI = 2; // size multiplier
const GRAVITY_RADIUS = 400; // gravity effect size
const GRAVITY_RADIUS_SQR = GRAVITY_RADIUS * GRAVITY_RADIUS; // squared
const PULL = 0.25; // pull force
const SPIN = 0.25; // spin force
const FRICTION = 0.985; // friction
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
  public draw() {
    Draw.rect({
      position: this.position,
      size: { width: this.radius, height: this.radius },
      tint: [this.color[0], this.color[1], this.color[2], this.color[3]],
      emissive: 3,
    });
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
}

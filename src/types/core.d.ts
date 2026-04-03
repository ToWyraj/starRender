import Vec2D from "@/math/vec2D";
import Vec4D from "@/math/vec4D";
declare global {
  type Vec2D = InstanceType<typeof Vec2D>;
  type Position2D = { x: number; y: number };
  type Position3D = { x: number; y: number; z: number };
  type Size2D = { width: number; height: number };
  type Crop = { x: number; y: number; width: number; height: number };
  type Box = { x: number; y: number; width: number; height: number };
  type RGB = [number, number, number];
  type RGBA = [number, number, number, number];
  type DeepOmit<T, K extends string> =
    T extends Array<infer U>
      ? Array<DeepOmit<U, K>>
      : K extends `${infer Head}.${infer Tail}`
        ? {
            [P in keyof T]: P extends Head ? DeepOmit<T[P], Tail> : T[P];
          }
        : Omit<T, K>;
  type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object
      ? T[P] extends Function
        ? T[P]
        : DeepPartial<T[P]>
      : T[P];
  };
}

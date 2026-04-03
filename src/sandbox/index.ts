import Engine from "./engine";
import "../css/index.css";
import Star from "./star";
const STARS_COUNT = 20000;
const stars: Star[] = [];

await Engine.init();

for (let index = 0; index < STARS_COUNT; index++) {
  stars.push(new Star());
}

Engine.update(() => {
  stars.forEach((star) => {
    star.draw();
  });
});

Engine.start();

import Engine from "./engine";
import "../css/index.css";

await Engine.init();

Engine.update(() => {});

Engine.start();

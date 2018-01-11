import { h } from "./view.js";
import { requireCss } from "./require-css/require-css.js";

requireCss(import.meta).add("./App.css");

export const App = () => h("h1", { className: "App-title" }, "Hello, world!");

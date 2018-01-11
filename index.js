import { h, render } from "./view.js";
import { App } from "./App.js";

import { requireCss, injectCss } from "./require-css/require-css.js";

requireCss(import.meta).add("./index.css");

injectCss().then(() => {
  render(h(App), document.getElementById("root"));
});

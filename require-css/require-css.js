const styles = new Set();

export function requireCss(meta) {
  const modulePathParts = meta.url.split("/").slice(0, -1);

  const module = {
    add
  };

  return module;

  function add(path) {
    const relativePathParts = path.split("../").map(x => x.replace("./", ""));
    const resultPathParts = modulePathParts.slice();
    for (let part of relativePathParts) {
      if (part === "") {
        const popped = resultPathParts.pop();
        if (popped === undefined) {
          throw new Error("Wrong path specified: " + path);
        }
      } else {
        resultPathParts.push(part);
      }
    }
    const resultPath = resultPathParts.join("/");
    styles.add(resultPath);
    console.log(...styles);
    return module;
  }
}

export async function injectCss() {
  const promises = [...styles].map(path => fetch(path).then(x => x.text()));
  const styleSheets = await Promise.all(promises);
  const styleSheet = styleSheets.reduce((a, b) => a.concat(b), "");
  const style = document.createElement("style");
  style.appendChild(document.createTextNode(styleSheet));
  document.head.appendChild(style);
}

const styles = new Set();

export function requireCss(meta) {
  const module = {
    add
  };

  return module;

  function add(path) {
    styles.add(resolvePath(meta.url, path));
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

function resolvePath(from, to) {
  const fromPathParts = from.split("/").slice(0, -1);
  const toPathParts = to.split("../").map(x => x.replace("./", ""));
  const resultPathParts = fromPathParts.slice();
  for (let part of toPathParts) {
    if (part === "") {
      const popped = resultPathParts.pop();
      if (popped === undefined) {
        throw new Error("Wrong path specified: " + path);
      }
    } else {
      resultPathParts.push(part);
    }
  }
  return resultPathParts.join("/");
}

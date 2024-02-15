const logToNotebook = (output) => {
  const firstSection = document.querySelector("section");
  const logger = firstSection.querySelector("#logger");
  if (logger) return (logger.innerHTML = output);
  const loggerNode = document.createElement("div");
  loggerNode.id = "logger";
  loggerNode.style.border = "1px solid gray";
  loggerNode.style.padding = "1em";
  loggerNode.style.borderRadius = "2px";
  loggerNode.innerHTML = output;
  firstSection.appendChild(loggerNode);
};

const loadModule = async (modulePath) => {
  let output = `✅ Loaded module ${modulePath} successfully`;
  try {
    return await import(modulePath);
  } catch (e) {
    output = `❌ Unable to import module ${modulePath}`;
    throw new Error(output);
  } finally {
    logToNotebook(output);
  }
};

logToNotebook("Loading module …");

const { default: db } = await loadModule("./instantiate-duckdb.mjs");

const c = await db.connect();
const res = await c.query(
  `SELECT count(*)::INTEGER as v FROM generate_series(0, 100) t(v)`
);
console.log(res);

import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@12.2.0/dist/mermaid.esm.min.mjs";

const script = document.getElementById("mermaid_script");
const preference = window.matchMedia("(prefers-color-scheme: dark)");
const diagrams = [...document.querySelectorAll("pre.mermaid")].map((element) => ({
  element,
  source: element.textContent.trim(),
}));
let generation = 0;

async function renderDiagrams() {
  const current = ++generation;
  const dark = document.body.classList.contains("dark") ||
    (!document.body.classList.contains("light") && preference.matches);
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "strict",
    theme: dark ? script.dataset.darkTheme : script.dataset.lightTheme,
  });
  for (const [index, { element, source }] of diagrams.entries()) {
    try {
      const { svg, bindFunctions } = await mermaid.render(`diagram-${current}-${index}`, source);
      if (current !== generation) return;
      element.innerHTML = svg;
      bindFunctions?.(element);
    } catch (error) {
      if (current !== generation) return;
      element.textContent = source;
      console.error("Unable to render Mermaid diagram", error);
    }
  }
}

renderDiagrams();
preference.addEventListener("change", renderDiagrams);

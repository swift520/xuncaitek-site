const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const indexHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");
const scriptJs = fs.readFileSync(path.join(root, "script.js"), "utf8");
const stylesCss = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const visibleSiteSource = `${indexHtml}\n${scriptJs}`;

function cssBlock(selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = stylesCss.match(new RegExp(`${escaped}\\s*\\{(?<body>[^}]+)\\}`));
  return match?.groups?.body || "";
}

test("brand logo and company wordmark actively return to the top", () => {
  assert.match(indexHtml, /<a class="brand" href="#top"[^>]*data-scroll-top/);
  assert.match(scriptJs, /brandHomeLink[\s\S]+scrollTo\(\{[\s\S]+top:\s*0/);
});

test("site copy uses all-industry wording instead of factory-specific wording", () => {
  assert.doesNotMatch(visibleSiteSource, /工厂|factory|factories/i);
  assert.match(scriptJs, /各行业/);
  assert.match(scriptJs, /all-industry/i);
});

test("advantages headline names scene resources, project management and data engineering", () => {
  assert.match(scriptJs, /集成场景资源、项目管理与数据工程三大能力，确保数据稳定交付。/);
  assert.doesNotMatch(scriptJs, /集成资源、项目管理与数据工程三大能力/);
});

test("co-build heading uses the same green treatment", () => {
  assert.match(cssBlock(".contact-inner h2"), /color:\s*var\(--green\)/);
});

test("image marquees use measured loop distances instead of percentage offsets", () => {
  assert.match(scriptJs, /setSceneLoopDistance/);
  assert.match(scriptJs, /getTrackLoopDistance/);
  assert.match(stylesCss, /--scene-loop-distance/);
  assert.doesNotMatch(stylesCss, /translateX\(-50%\)/);
});

test("footer English company suffix is in Co., Ltd. order", () => {
  assert.match(indexHtml, /Fuzhou Changchen Xuncai Software Technology Co\., Ltd\./);
  assert.doesNotMatch(indexHtml, /Fuzhou Changchen Xuncai Software Technology Ltd\., Co\./);
});

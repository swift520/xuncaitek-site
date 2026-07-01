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

function scriptFunctionBody(name) {
  const match = scriptJs.match(new RegExp(`function ${name}\\([^)]*\\) \\{(?<body>[\\s\\S]*?)\\n\\}`));
  return match?.groups?.body || "";
}

test("brand logo and company wordmark actively return to the top", () => {
  assert.match(indexHtml, /<a class="brand" href="#top"[^>]*data-scroll-top/);
  assert.match(scriptJs, /brandHomeLink[\s\S]+scrollTo\(\{[\s\S]+top:\s*0/);
});

test("site copy keeps factory wording scoped to scene linking", () => {
  assert.match(scriptJs, /step1Text:\s*"工厂、家庭、商超、餐饮、物流等真实任务场景标准化。"/);
  const sourceWithoutSceneLinking = visibleSiteSource.replaceAll(
    "工厂、家庭、商超、餐饮、物流等真实任务场景标准化。",
    "",
  );
  assert.doesNotMatch(sourceWithoutSceneLinking, /工厂|factory|factories/i);
  assert.doesNotMatch(scriptJs, /step1Text:\s*"各行业、家庭、商超、餐饮、物流等真实任务场景标准化。"/);
  assert.match(scriptJs, /各行业/);
  assert.match(scriptJs, /all-industry/i);
});

test("advantages headline names scene resources, project management and data engineering", () => {
  assert.match(scriptJs, /集成场景资源、项目管理与数据工程三大能力，确保数据稳定交付。/);
  assert.doesNotMatch(scriptJs, /集成资源、项目管理与数据工程三大能力/);
});

test("glove copy uses data gloves wording", () => {
  assert.match(scriptJs, /数据手套/);
  assert.match(visibleSiteSource, /data gloves/i);
  assert.doesNotMatch(visibleSiteSource, /触觉手套|tactile gloves/i);
});

test("co-build eyebrow is green and the contact title is white", () => {
  assert.match(cssBlock(".eyebrow"), /color:\s*var\(--green\)/);
  assert.match(cssBlock(".contact-section .eyebrow"), /color:\s*var\(--green\)/);
  assert.match(cssBlock(".contact-inner h2"), /color:\s*var\(--text\)/);
  assert.doesNotMatch(cssBlock(".contact-inner h2"), /color:\s*var\(--green\)/);
});

test("EGO sample feature image uses the requested footwear source", () => {
  assert.match(indexHtml, /<img src="EGO\/鞋2\.png"[^>]*alt="First-person footwear data collection sample"/);
});

test("EGO marquee uses an explicit mixed playback order", () => {
  assert.match(scriptJs, /const egoPrimaryTrackOrder = \[/);
  assert.match(scriptJs, /const egoSecondaryTrackOrder = \[/);
  assert.match(scriptJs, /egoPrimaryTrackOrder\.map/);
  assert.doesNotMatch(scriptJs, /egoSamples\.slice\(11,\s*29\)/);
});

test("EGO hover direction is split by the marquee center", () => {
  const hoverBody = scriptFunctionBody("updateEgoHoverVelocity");

  assert.match(hoverBody, /centerX\s*=\s*rect\.left\s*\+\s*rect\.width\s*\/\s*2/);
  assert.match(hoverBody, /distance\s*=\s*clientX\s*-\s*centerX/);
  assert.doesNotMatch(hoverBody, /pointerAnchorX/);
  assert.match(scriptJs, /pointerenter[\s\S]*updateEgoHoverVelocity\(event\.clientX\)/);
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

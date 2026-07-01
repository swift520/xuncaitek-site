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

function scriptArraySources(name) {
  const match = scriptJs.match(new RegExp(`const ${name} = \\[(?<body>[\\s\\S]*?)\\];`));
  return [...(match?.groups?.body || "").matchAll(/src:\s*"([^"]+)"/g)].map((source) => source[1]);
}

function scriptStringArray(name) {
  const match = scriptJs.match(new RegExp(`const ${name} = \\[(?<body>[\\s\\S]*?)\\];`));
  return [...(match?.groups?.body || "").matchAll(/"([^"]+)"/g)].map((value) => value[1]);
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

test("company solution image uses the requested product source", () => {
  assert.match(indexHtml, /<img src="产品\/微信图片_20260701213322\.jpg"[^>]*alt="XUNCAITEK product concept display"/);
  assert.ok(fs.existsSync(path.join(root, "产品/微信图片_20260701213322.jpg")));
});

test("scene carousel includes the three new scene images in a mixed order", () => {
  const sceneSources = scriptArraySources("sceneSamples");
  const newSceneSources = [
    "assets/scenes/scene-15.webp",
    "assets/scenes/scene-16.webp",
    "assets/scenes/scene-17.webp",
  ];

  newSceneSources.forEach((source) => {
    assert.ok(sceneSources.includes(source), `${source} missing from sceneSamples`);
    assert.ok(fs.existsSync(path.join(root, source)), `${source} file missing`);
  });
  assert.notDeepEqual(sceneSources.slice(-3), newSceneSources);
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

test("delivery standard places the robot animation beside compact content", () => {
  assert.match(
    indexHtml,
    /<div class="delivery-layout">\s*<div class="delivery-robot-stage" id="delivery-robot-stage" aria-label="Robot delivery line animation"><\/div>\s*<div class="delivery-content">[\s\S]*<div class="schema-board compact-schema"/,
  );
  assert.match(cssBlock(".delivery-layout"), /grid-template-columns:\s*minmax\(0,\s*1\.05fr\)\s+minmax\(320px,\s*0\.95fr\)/);
  assert.match(cssBlock(".delivery-robot-stage"), /aspect-ratio:\s*1\s*\/\s*1/);
  assert.match(stylesCss, /\.delivery-robot-stage svg\s*\{/);
});

test("delivery robot animation is generated SVG with IK-driven dual arms", () => {
  assert.match(scriptJs, /const deliveryRobotStage = document\.querySelector\("#delivery-robot-stage"\)/);
  assert.match(scriptJs, /function initDeliveryRobotAnimation\(/);
  assert.match(scriptJs, /function solveDeliveryArmIk\(/);
  assert.match(scriptJs, /Delivery robot grasping a desktop object/);
  assert.match(scriptJs, /requestAnimationFrame\(stepDeliveryRobotAnimation\)/);
});

test("delivery robot animation uses a seed-green joint skeleton while keeping dexterous hands", () => {
  assert.match(scriptJs, /const robotGreen = "#63f0b5"/);
  assert.match(scriptJs, /const robotGreenSoft = "rgba\(99, 240, 181, 0\.3\)"/);
  assert.match(scriptJs, /const skeletonPalette = \{/);
  assert.match(scriptJs, /center:\s*robotGreen/);
  assert.match(scriptJs, /left:\s*robotGreen/);
  assert.match(scriptJs, /right:\s*robotGreen/);
  assert.doesNotMatch(scriptJs, /center:\s*"#ffb45e"/);
  assert.doesNotMatch(scriptJs, /left:\s*"#2f9cff"/);
  assert.match(scriptJs, /function drawSkeletonSegment\(/);
  assert.match(scriptJs, /function drawSkeletonJoint\(/);
  assert.match(scriptJs, /function drawDexterousHand\(/);
  assert.match(scriptJs, /function drawDexterousFinger\(/);
  assert.match(scriptJs, /function drawHandJoint\(/);
  assert.match(scriptJs, /function drawSupportArm\(/);
  assert.match(scriptJs, /class:\s*"delivery-robot-hand-joint"/);
  assert.match(scriptJs, /class:\s*"delivery-robot-skeleton"/);
  assert.match(scriptJs, /class:\s*"delivery-robot-limb-left"/);
  assert.match(scriptJs, /class:\s*"delivery-robot-limb-right"/);
  assert.match(scriptJs, /class:\s*"delivery-robot-hand"/);
  assert.match(scriptJs, /class:\s*"delivery-robot-assist-hand"/);
  assert.match(scriptJs, /const fullBodyJoints = \[/);
  assert.match(scriptJs, /"neck", "shoulder", "elbow", "wrist", "spine", "waist", "hip", "knee", "ankle", "toe"/);
  assert.match(scriptJs, /supportArmOpacity = 0\.68/);
  assert.doesNotMatch(scriptJs, /COLOR JOINT SKELETON MK-004/);
  assert.doesNotMatch(scriptJs, /FINGERTIP CONTACT/);
  assert.doesNotMatch(scriptJs, /text:\s*"FIG 02/);
  assert.doesNotMatch(scriptJs, /const shoulderLeft = \{ x: 248, y: 212 \}/);
  assert.doesNotMatch(scriptJs, /SIDE PROFILE FULL BODY MK-003/);
});

test("dexterous hands render 21 joints and the right arm bends outward naturally", () => {
  const handJoints = scriptStringArray("dexterousHandJointNames");

  assert.equal(handJoints.length, 21);
  ["wrist", "thumbTip", "indexTip", "middleTip", "ringTip", "pinkyTip"].forEach((jointName) => {
    assert.ok(handJoints.includes(jointName), `${jointName} missing from dexterousHandJointNames`);
  });
  assert.match(scriptJs, /const radialDexterousHandPalette = \{/);
  assert.match(scriptJs, /const radialHandReachLength = Math\.round\(armForearmLength \/ goldenRatio\)/);
  assert.match(scriptJs, /const radialHandScale = Number\(\(radialHandReachLength \/ 102\)\.toFixed\(2\)\)/);
  assert.match(scriptJs, /const scaleHand = \(value\) => value \* radialHandScale/);
  assert.match(scriptJs, /bone:\s*robotGreen/);
  assert.match(scriptJs, /joint:\s*robotGreen/);
  assert.doesNotMatch(scriptJs, /bone:\s*"#0f5fb8"/);
  assert.doesNotMatch(scriptJs, /joint:\s*"#10a6d8"/);
  assert.match(scriptJs, /function drawRadialPalmRay\(/);
  assert.match(scriptJs, /class:\s*"delivery-robot-hand-ray"/);
  assert.match(scriptJs, /function getDexterousPalmAnchor\(wrist, elbow\)/);
  assert.match(scriptJs, /const activeArmElbowSign = -1/);
  assert.match(scriptJs, /const supportArmElbowSign = 1/);
  assert.match(scriptJs, /const activeArmRestTarget = \{ x: shiftCompositionX\(346\), y: 300 \}/);
  assert.match(scriptJs, /target:\s*activeArmRestTarget/);
  assert.match(scriptJs, /solveDeliveryArmIk\(armProgram\.shoulder,\s*target,\s*activeArmElbowSign,\s*armUpperLength,\s*armForearmLength\)/);
  assert.match(scriptJs, /solveDeliveryArmIk\(supportArmProgram\.shoulder,\s*target,\s*supportArmElbowSign,\s*armUpperLength,\s*armForearmLength\)/);
  assert.match(scriptJs, /const palmAnchor = getDexterousPalmAnchor\(handTip, elbow\)/);
  assert.match(scriptJs, /objectPosition\(progress,\s*activePose\.tip,\s*activePose\.elbow\)/);
  assert.doesNotMatch(scriptJs, /solveDeliveryArmIk\(armProgram\.shoulder,\s*target,\s*1,\s*108,\s*116\)/);
  assert.doesNotMatch(scriptJs, /solveDeliveryArmIk\(armProgram\.shoulder,\s*target,\s*activeArmElbowSign,\s*108,\s*116\)/);
  assert.doesNotMatch(scriptJs, /handTip\.x \+ radialHandReachLength \* 0\.7/);
  assert.doesNotMatch(scriptJs, /handTip\.y \+ radialHandReachLength \* 0\.35/);
  assert.doesNotMatch(scriptJs, /palmEnd\.x \+ normal\.x \* 13/);
});

test("delivery robot returns the desktop object to its initial pick position", () => {
  assert.match(scriptJs, /const objectPick = \{ x: shiftCompositionX\(386\), y: tableY - object\.height \}/);
  assert.match(scriptJs, /const objectPlace = \{ \.\.\.objectPick \}/);
  assert.match(scriptJs, /return \{ x: objectPlace\.x, y: objectPlace\.y, held: false \}/);
  assert.doesNotMatch(scriptJs, /const objectPlace = \{ x: 420, y: tableY - object\.height \}/);
});

test("delivery robot and object composition is shifted left toward the frame center", () => {
  assert.match(scriptJs, /const compositionShiftX = -56/);
  assert.match(scriptJs, /const shiftCompositionX = \(value\) => value \+ compositionShiftX/);
  assert.match(scriptJs, /const centerX = shiftCompositionX\(224\)/);
  assert.match(scriptJs, /const tableTopLeftX = shiftCompositionX\(360\)/);
  assert.match(scriptJs, /const tableBottomRightX = shiftCompositionX\(574\)/);
  assert.match(scriptJs, /const objectPick = \{ x: shiftCompositionX\(386\), y: tableY - object\.height \}/);
  assert.match(scriptJs, /const activeArmRestTarget = \{ x: shiftCompositionX\(346\), y: 300 \}/);
  assert.match(scriptJs, /target:\s*\{ x: shiftCompositionX\(366\), y: tableY - 62 \}/);
  assert.doesNotMatch(scriptJs, /const centerX = 224;/);
  assert.doesNotMatch(scriptJs, /const objectPick = \{ x: 386, y: tableY - object\.height \}/);
});

test("delivery robot body coordinates use golden ratio proportions", () => {
  assert.match(scriptJs, /const goldenRatio = 1\.618/);
  assert.match(scriptJs, /const centerX = shiftCompositionX\(224\)/);
  assert.match(scriptJs, /const goldenBodyTopY = 118/);
  assert.match(scriptJs, /const goldenBodyFootY = 550/);
  assert.match(scriptJs, /const goldenUpperBodyHeight = Math\.round\(goldenBodyHeight \/ \(goldenRatio \+ 1\)\)/);
  assert.match(scriptJs, /const goldenLowerBodyHeight = goldenBodyHeight - goldenUpperBodyHeight/);
  assert.match(scriptJs, /const goldenHipY = goldenBodyTopY \+ goldenUpperBodyHeight/);
  assert.match(scriptJs, /const goldenBodyRatio = Number\(\(goldenLowerBodyHeight \/ goldenUpperBodyHeight\)\.toFixed\(3\)\)/);
  assert.match(scriptJs, /const headJointRadius = Math\.round\(goldenUpperBodyHeight \/ Math\.pow\(goldenRatio, 7\)\)/);
  assert.match(scriptJs, /const goldenShoulderY = goldenBodyTopY \+ Math\.round\(goldenUpperBodyHeight \/ \(goldenRatio \+ 1\)\)/);
  assert.match(scriptJs, /const goldenShoulderHalfWidth = Math\.round\(goldenUpperBodyHeight \/ \(goldenRatio \* 2\.5\)\)/);
  assert.match(scriptJs, /const goldenTableY = goldenHipY \+ Math\.round\(\(goldenBodyFootY - goldenHipY\) \/ Math\.pow\(goldenRatio, 3\)\)/);
  assert.match(scriptJs, /const legFootY = goldenBodyFootY - Math\.round\(goldenLowerBodyHeight \/ Math\.pow\(goldenRatio, 3\)\)/);
  assert.match(scriptJs, /const legLength = legFootY - \(goldenHipY \+ 6\)/);
  assert.match(scriptJs, /const thighLength = Math\.round\(\(legLength \* goldenRatio\) \/ \(goldenRatio \+ 1\)\)/);
  assert.match(scriptJs, /const footLength = Math\.round\(radialHandReachLength \/ goldenRatio\)/);
  assert.match(scriptJs, /const armReachLength = goldenUpperBodyHeight/);
  assert.match(scriptJs, /const armUpperLength = Math\.round\(\(armReachLength \* goldenRatio\) \/ \(goldenRatio \+ 1\)\)/);
  assert.match(scriptJs, /const armForearmLength = armReachLength - armUpperLength/);
  assert.match(scriptJs, /"data-golden-ratio":\s*goldenBodyRatio/);
  assert.match(scriptJs, /drawSkeletonJoint\(skeleton,\s*body\.head,\s*skeletonPalette\.center,\s*headJointRadius\)/);
  assert.doesNotMatch(scriptJs, /drawSkeletonJoint\(skeleton,\s*body\.head,\s*skeletonPalette\.center,\s*9\)/);
  assert.match(scriptJs, /neck:\s*\{ x: centerX, y: goldenShoulderY - Math\.round\(\(goldenShoulderY - goldenBodyTopY\) \/ \(goldenRatio \+ 1\)\) \}/);
  assert.match(scriptJs, /hip:\s*\{ x: centerX, y: goldenHipY \}/);
  assert.match(scriptJs, /shoulder:\s*\{ x: centerX \+ goldenShoulderHalfWidth, y: goldenShoulderY \}/);
  assert.match(scriptJs, /knee:\s*\{ x: centerX \+ 34, y: goldenHipY \+ 6 \+ thighLength \}/);
  assert.match(scriptJs, /ankle:\s*\{ x: centerX \+ 38, y: legFootY \}/);
  assert.match(scriptJs, /toe:\s*\{ x: centerX \+ 38 \+ footLength, y: legFootY \+ 1 \}/);
  assert.match(scriptJs, /const tableBottomY = tableY \+ 82/);
  assert.match(scriptJs, /d:\s*`M\$\{tableTopLeftX\} \$\{tableY\} L\$\{tableTopRightX\} \$\{tableY\} L\$\{tableBottomRightX\} \$\{tableBottomY\} L\$\{tableBottomLeftX\} \$\{tableBottomY\} Z`/);
});

test("footer English company suffix is in Co., Ltd. order", () => {
  assert.match(indexHtml, /Fuzhou Changchen Xuncai Software Technology Co\., Ltd\./);
  assert.doesNotMatch(indexHtml, /Fuzhou Changchen Xuncai Software Technology Ltd\., Co\./);
});

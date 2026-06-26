const translations = {
  zh: {
    pageTitle: "长辰迅采 | 具身智能数据采集与标注",
    metaDescription: "福州长辰迅采软件技术有限公司专注具身智能无本体数据采集、标注、质检与数据集交付。",
    navSolution: "方案",
    navScenes: "场景",
    navDelivery: "交付",
    navContact: "联系",
    heroEyebrow: "具身智能无本体数据服务商",
    heroTitle: "长辰迅采",
    heroSubtitle:
      "工厂实景数采，赋能具身智能。以第一人称 Ego 视频、穿戴动捕、多模态同步与精细标注，构建可直接进入 VLA 训练流程的数据集。",
    ctaTalk: "预约项目沟通",
    ctaFlow: "查看采集流程",
    metricFactories: "50+",
    metricFactoriesLabel: "已合作/可拓展工厂",
    metricStations: "3000+",
    metricStationsLabel: "可复用采集工位",
    metricHours: "50,000h+",
    metricHoursLabel: "规划月采集产能",
    introLineA: "真实场景",
    introLineB: "穿戴采集",
    introLineC: "多模态同步",
    introLineD: "精细标注",
    introLineE: "标准交付",
    problemEyebrow: "行业瓶颈",
    problemTitle: "机器人真正学会干活，缺的是物理世界数据。",
    problemBody:
      "模型能力快速提升，但真实操作中的动作轨迹、视觉观测、手物关系、任务语义和时间同步数据仍极度稀缺。无本体采集为机器人提供规模化的人类操作先验。",
    problemCard1Title: "低成本扩展",
    problemCard1Text: "无需大量昂贵机器人本体，可在工厂、家庭、商超、物流场景并行部署。",
    problemCard2Title: "真实长尾场景",
    problemCard2Text: "采集真实人类操作与环境交互，补足仿真合成数据的 Sim2Real Gap。",
    problemCard3Title: "可训练资产",
    problemCard3Text: "交付的不只是视频，而是含视觉、动作、语义、质量记录的数据资产。",
    solutionEyebrow: "公司方案",
    solutionTitle: "面向 VLA 训练的数据采集与标注工程平台。",
    solutionBody:
      "长辰迅采围绕真实场景、穿戴采集、多设备时间同步、精细标注、质控审核和数据集封装，服务机器人厂商、具身大模型公司与科研机构。",
    cap1Title: "场景资源链接",
    cap1Text: "覆盖福建、广东、浙江等制造业重点区域。",
    cap2Title: "多模态采集",
    cap2Text: "第一视角、多机位视频、动捕、数据手套、VR/AR 设备。",
    cap3Title: "交付格式适配",
    cap3Text: "支持 RLDS、LeRobot、HDF5、Parquet 与定制 Schema。",
    pipelineEyebrow: "How It Works",
    pipelineTitle: "五步形成可训练数据集。",
    step1Title: "场景搭建",
    step1Text: "工厂、家庭、商超、餐饮、物流等真实任务场景标准化。",
    step2Title: "穿戴采集",
    step2Text: "第一视角眼镜、动捕、数据手套、VR/AR 设备采集人类操作。",
    step3Title: "时间同步",
    step3Text: "多机位、多传感器统一时间戳，生成可训练时序数据。",
    step4Title: "数据标注",
    step4Text: "动作分段、物体属性、任务语义、成功失败与异常片段记录。",
    step5Title: "数据交付",
    step5Text: "按主流 VLA 训练格式或客户 Schema 打包、验收与增量更新。",
    scenesEyebrow: "场景网络",
    scenesTitle: "从标准产线到复杂手工艺作坊，连接真实机器人任务。",
    scenesBody:
      "公司拥有稳定的工厂合作渠道和项目协同能力，可按客户需求快速链接和复制采集场景。",
    scene1Title: "工业制造",
    scene1Text: "电子装配、线束插拔、分拣、包装、焊接、质检、柔性物体操作。",
    scene2Title: "工艺与长尾任务",
    scene2Text: "竹木加工、石艺雕刻、手工涂色、折叠、整理等高价值长尾操作。",
    scene3Title: "商业与服务空间",
    scene3Text: "洗衣厂、商超、餐饮、仓储、酒店、医养等服务机器人过渡场景。",
    galleryEyebrow: "项目样本",
    galleryTitle: "已开展 EGO 数据采集任务展示。",
    task1: "打孔 / Drilling",
    task2: "包装 / Packaging",
    task3: "组装 / Assembly",
    task4: "插纱 / Threading",
    deliveryEyebrow: "交付标准",
    deliveryTitle: "目标是直接进入训练流程，而不是停留在原始视频。",
    schemaVision: "视觉字段",
    schemaAction: "动作字段",
    schemaObject: "物体字段",
    schemaSemantic: "语义字段",
    schemaQuality: "质量字段",
    schemaMeta: "元数据",
    qaTarget: "标注准确率目标",
    qaSpeed: "标注交付时效",
    qaReview: "三审三校",
    qaReviewLabel: "质控流程",
    deliveryBody:
      "数据字段覆盖 RGB 视频、帧 ID、相机参数、手部轨迹、关键点、动作阶段、接触状态、物体类别、自然语言指令、异常片段与质检记录。",
    proofEyebrow: "核心优势",
    proofTitle: "资源、项目管理与数据工程能力合在一起，才是稳定交付。",
    proof1: "场景多样：覆盖标准产线、柔性制造、服务空间与复杂手工艺。",
    proof2: "地域广泛：深耕福建，并延展至广东、浙江等制造业聚集省份。",
    proof3: "经验完整：具备工厂实景 Ego 数据采集全流程服务经验。",
    contactEyebrow: "合作共建",
    contactTitle: "把真实场景转化为机器人可学习的数据基础设施。",
    contactBody:
      "长辰迅采期待与机器人企业、具身大模型团队、科研机构、场景方和地方产业伙伴，共建工业、家庭、商业三类标杆数据集。",
    contactButton: "发起合作咨询",
  },
  en: {
    pageTitle: "XUNCAITEK | Embodied AI Data Collection",
    metaDescription: "XUNCAITEK provides body-free embodied AI data collection, annotation, QA and dataset delivery.",
    navSolution: "Solution",
    navScenes: "Scenes",
    navDelivery: "Delivery",
    navContact: "Contact",
    heroEyebrow: "Body-free embodied AI data partner",
    heroTitle: "XUNCAITEK",
    heroSubtitle:
      "Real-world factory data collection for embodied intelligence. We combine first-person Ego video, wearable motion capture, multimodal synchronization and detailed annotation to deliver datasets ready for VLA training.",
    ctaTalk: "Discuss a Project",
    ctaFlow: "View Workflow",
    metricFactories: "50+",
    metricFactoriesLabel: "Partnered or expandable factories",
    metricStations: "3000+",
    metricStationsLabel: "Reusable collection workstations",
    metricHours: "50,000h+",
    metricHoursLabel: "Planned monthly capacity",
    introLineA: "Real Scenes",
    introLineB: "Wearable Capture",
    introLineC: "Multimodal Sync",
    introLineD: "Fine Annotation",
    introLineE: "Standard Delivery",
    problemEyebrow: "Industry Bottleneck",
    problemTitle: "Robots need physical-world data before they can truly work.",
    problemBody:
      "Model capability is moving fast, but action trajectories, visual observations, hand-object relations, task semantics and synchronized real-world data remain scarce. Body-free collection turns human operation into scalable robot priors.",
    problemCard1Title: "Cost-efficient scaling",
    problemCard1Text:
      "Deploy collection projects across factories, homes, retail and logistics without relying on large fleets of expensive robot bodies.",
    problemCard2Title: "Real long-tail scenes",
    problemCard2Text:
      "Capture human operation and environmental interaction in the real world to reduce the Sim2Real gap left by synthetic data.",
    problemCard3Title: "Trainable assets",
    problemCard3Text:
      "The deliverable is not just video. It is a data asset with vision, action, semantics and quality records.",
    solutionEyebrow: "Company Solution",
    solutionTitle: "A data collection and annotation engineering platform for VLA training.",
    solutionBody:
      "XUNCAITEK serves robotics companies, embodied foundation model teams and research institutions with real scenes, wearable capture, multi-device time sync, detailed annotation, QA review and dataset packaging.",
    cap1Title: "Scene sourcing",
    cap1Text: "Coverage across manufacturing hubs including Fujian, Guangdong and Zhejiang.",
    cap2Title: "Multimodal capture",
    cap2Text: "Ego view, multi-camera video, motion capture, data gloves and VR/AR equipment.",
    cap3Title: "Format adaptation",
    cap3Text: "Support for RLDS, LeRobot, HDF5, Parquet and custom schemas.",
    pipelineEyebrow: "How It Works",
    pipelineTitle: "Five steps from scene to trainable dataset.",
    step1Title: "Scene setup",
    step1Text: "Standardize real task environments across factories, homes, retail, food service and logistics.",
    step2Title: "Wearable capture",
    step2Text: "Collect human operation with Ego glasses, motion capture, data gloves and VR/AR devices.",
    step3Title: "Time sync",
    step3Text: "Align multi-camera and multi-sensor streams with unified timestamps for sequential training data.",
    step4Title: "Annotation",
    step4Text: "Segment actions, label objects, encode task semantics and record success, failure and anomalies.",
    step5Title: "Dataset delivery",
    step5Text: "Package, validate and update datasets in mainstream VLA formats or customer-defined schemas.",
    scenesEyebrow: "Scene Network",
    scenesTitle: "From standard production lines to complex craft workshops.",
    scenesBody:
      "With stable factory channels and project coordination capability, the company can rapidly connect and replicate collection scenes based on customer requirements.",
    scene1Title: "Industrial manufacturing",
    scene1Text:
      "Electronics assembly, wire harness insertion, sorting, packaging, welding, inspection and deformable object operations.",
    scene2Title: "Craft and long-tail tasks",
    scene2Text:
      "Bamboo and wood processing, stone carving, hand painting, folding and organizing tasks with high long-tail value.",
    scene3Title: "Commercial and service spaces",
    scene3Text:
      "Laundry plants, supermarkets, restaurants, warehousing, hotels and healthcare service environments for service robots.",
    galleryEyebrow: "Project Samples",
    galleryTitle: "EGO data collection tasks already in motion.",
    task1: "Drilling",
    task2: "Packaging",
    task3: "Assembly",
    task4: "Threading",
    deliveryEyebrow: "Delivery Standard",
    deliveryTitle: "Built for training workflows, not raw-video handoff.",
    schemaVision: "Vision Fields",
    schemaAction: "Action Fields",
    schemaObject: "Object Fields",
    schemaSemantic: "Semantic Fields",
    schemaQuality: "Quality Fields",
    schemaMeta: "Metadata",
    qaTarget: "Annotation accuracy target",
    qaSpeed: "Annotation turnaround",
    qaReview: "3-layer QA",
    qaReviewLabel: "Review workflow",
    deliveryBody:
      "Fields cover RGB video, frame IDs, camera parameters, hand trajectories, keypoints, action phases, contact states, object classes, natural-language instructions, anomaly clips and QA records.",
    proofEyebrow: "Advantages",
    proofTitle: "Scene resources, project management and data engineering together enable reliable delivery.",
    proof1: "Diverse scenes: standard production lines, flexible manufacturing, service spaces and complex craft workflows.",
    proof2: "Wide regional reach: rooted in Fujian and extended to manufacturing clusters in Guangdong and Zhejiang.",
    proof3: "Complete experience: end-to-end service capability for real-world factory Ego data collection.",
    contactEyebrow: "Co-build",
    contactTitle: "Turn real scenes into data infrastructure robots can learn from.",
    contactBody:
      "XUNCAITEK looks forward to working with robotics companies, embodied model teams, research institutions, scene partners and local industry ecosystems to build benchmark datasets for industrial, home and commercial robots.",
    contactButton: "Start Collaboration",
  },
};

const buttons = document.querySelectorAll(".lang-button");
const translatable = document.querySelectorAll("[data-i18n]");
const metaDescription = document.querySelector('meta[name="description"]');
const languageStorageKey = "xuncaitek-language";

function setLanguage(lang) {
  const dictionary = translations[lang] || translations.en;
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  document.title = dictionary.pageTitle;
  if (metaDescription) {
    metaDescription.setAttribute("content", dictionary.metaDescription);
  }

  translatable.forEach((node) => {
    const key = node.dataset.i18n;
    if (dictionary[key]) {
      node.textContent = dictionary[key];
    }
  });

  buttons.forEach((button) => {
    const isActive = button.dataset.lang === lang;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  localStorage.setItem(languageStorageKey, lang);
}

buttons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

setLanguage(localStorage.getItem(languageStorageKey) || "en");

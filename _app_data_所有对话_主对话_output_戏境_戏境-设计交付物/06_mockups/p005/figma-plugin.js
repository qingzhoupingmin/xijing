// p005 创建故事 — Figma Plugin 自动生成脚本
// 支持步骤1（基础信息）、步骤2（大纲编辑）、步骤3（世界设定）、步骤4（角色设定）

async function main() {
  // ─── 设计令牌（0-1 浮点 RGBA）──────────────────────────────
  const colorTokens = {
    'primary':        { r: 0.486, g: 0.361, b: 0.988, a: 1 },
    'primary/dark':   { r: 0.388, g: 0.267, b: 0.878, a: 1 },
    'secondary':      { r: 0.788, g: 0.596, b: 0.290, a: 1 },
    'neutral/0':      { r: 1,     g: 1,     b: 1,     a: 1 },
    'neutral/1':      { r: 0.976, g: 0.980, b: 0.984, a: 1 },
    'neutral/3':      { r: 0.898, g: 0.906, b: 0.922, a: 1 },
    'neutral/6':      { r: 0.420, g: 0.447, b: 0.502, a: 1 },
    'neutral/7':      { r: 0.216, g: 0.255, b: 0.318, a: 1 },
    'neutral/8':      { r: 0.122, g: 0.161, b: 0.216, a: 1 },
    'primary/surface':{ r: 0.961, g: 0.953, b: 1.0,   a: 1 },
    'error':          { r: 0.937, g: 0.267, b: 0.267, a: 1 },
  };

  // ─── 创建 Figma 颜色变量 ───────────────────────────────────
  const collection = figma.variables.createVariableCollection('戏境DesignTokens');
  const mode = collection.modes[0];
  const modeId = mode.modeId;

  const colorVars = {};
  for (const [name, rgba] of Object.entries(colorTokens)) {
    const v = figma.variables.createVariable(name, collection, 'COLOR');
    v.resolvedType = 'COLOR';
    v.setValueForMode(modeId, rgba);
    colorVars[name] = v;
  }

  // ─── 辅助：获取颜色值 ──────────────────────────────────────
  const c = (name) => colorVars[name];

  // ─── 创建阴影样式 ──────────────────────────────────────────
  const shadowStyle = figma.util.shadows([
    { type: 'drop', color: { r: 0, g: 0, b: 0, a: 0.06 }, offset: { x: 0, y: 1 }, radius: 3, visible: true, blendMode: 'NORMAL' }
  ]);

  const shadowXs = figma.util.shadows([
    { type: 'drop', color: { r: 0, g: 0, b: 0, a: 0.04 }, offset: { x: 0, y: 1 }, radius: 2, visible: true, blendMode: 'NORMAL' }
  ]);

  // ─── 页面尺寸常量 ──────────────────────────────────────────
  const PAGE_W = 1440;
  const TOPBAR_H = 56;
  const SIDEBAR_W = 220;
  const CONTENT_PAD = 24;
  const CARD_PAD = 24;
  const CARD_R = 12;
  const BTN_R = 8;
  const INPUT_H = 36;
  const STEP_SIZE = 28;
  const STEP_GAP = 56;
  const STEP_LABEL_GAP = 8;

  // ════════════════════════════════════════════════════════════
  // 创建页面基础结构（侧栏+主内容区）
  // ════════════════════════════════════════════════════════════
  function createBasePage(stepState = 1) {
    const page = figma.createPage();
    page.name = `p005 创建故事 - 步骤${stepState}`;
    figma.currentPage = page;

    const root = figma.createFrame();
    root.name = 'Page p005';
    root.resize(PAGE_W, 900);
    root.backgrounds = [{ type: 'SOLID', color: c('neutral/1') }];
    root.layoutMode = 'HORIZONTAL';
    root.counterAxisSizingMode = 'FIXED';
    root.primaryAxisSizingMode = 'FIXED';
    root.paddingLeft = 0;
    root.paddingRight = 0;
    root.paddingTop = 0;
    root.paddingBottom = 0;
    page.appendChild(root);

    // ─── 侧栏 ─────────────────────────────────────────────────
    const sidebar = figma.createFrame();
    sidebar.name = 'Sidebar';
    sidebar.resize(SIDEBAR_W, 900);
    sidebar.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
    sidebar.layoutMode = 'VERTICAL';
    sidebar.counterAxisSizingMode = 'FIXED';
    sidebar.primaryAxisSizingMode = 'FIXED';
    sidebar.paddingLeft = 0;
    sidebar.paddingRight = 0;
    sidebar.paddingTop = 0;
    sidebar.paddingBottom = 0;
    sidebar.itemSpacing = 0;
    root.appendChild(sidebar);

    // 品牌区
    const brand = figma.createFrame();
    brand.name = 'Brand';
    brand.resize(SIDEBAR_W, 56);
    brand.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
    brand.layoutMode = 'HORIZONTAL';
    brand.primaryAxisAlignItems = 'CENTER';
    brand.counterAxisAlignItems = 'CENTER';
    brand.paddingLeft = 20;
    sidebar.appendChild(brand);

    const brandText = figma.createText();
    brandText.name = 'BrandText';
    brandText.fontSize = 18;
    brandText.fontName = { family: 'PingFang SC', style: 'Semibold' };
    brandText.fills = [{ type: 'SOLID', color: c('primary') }];
    brandText.characters = '戏境';
    brandText.lineHeight = { unit: 'PIXELS', value: 24 };
    brand.appendChild(brandText);

    // 导航区
    const navFrame = figma.createFrame();
    navFrame.name = 'Nav';
    navFrame.resize(SIDEBAR_W, 380);
    navFrame.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
    navFrame.layoutMode = 'VERTICAL';
    navFrame.counterAxisSizingMode = 'FIXED';
    navFrame.primaryAxisSizingMode = 'FIXED';
    navFrame.paddingLeft = 0;
    navFrame.paddingRight = 0;
    navFrame.paddingTop = 16;
    navFrame.paddingBottom = 0;
    navFrame.itemSpacing = 2;
    sidebar.appendChild(navFrame);

    function makeNavItem(label, selected, hasSub = false, isSub = false) {
      const item = figma.createFrame();
      item.name = `NavItem ${label}`;
      item.resize(SIDEBAR_W - (isSub ? 24 : 0), hasSub ? 36 : 40);
      item.backgrounds = selected ? [{ type: 'SOLID', color: c('primary/surface') }] : [{ type: 'SOLID', color: c('neutral/0') }];
      item.layoutMode = 'VERTICAL';
      item.counterAxisSizingMode = 'FIXED';
      item.primaryAxisSizingMode = 'FIXED';
      item.paddingLeft = isSub ? 36 : 16;
      item.paddingRight = 12;
      item.paddingTop = 8;
      item.paddingBottom = 8;
      item.itemSpacing = 0;

      const textFrame = figma.createFrame();
      textFrame.name = 'TextWrapper';
      textFrame.layoutMode = 'HORIZONTAL';
      textFrame.counterAxisSizingMode = 'FIXED';
      textFrame.primaryAxisSizingMode = 'FIXED';
      textFrame.paddingLeft = 0;
      textFrame.paddingRight = 0;
      textFrame.paddingTop = 0;
      textFrame.paddingBottom = 0;
      textFrame.itemSpacing = 0;

      const txt = figma.createText();
      txt.name = 'Label';
      txt.fontSize = 14;
      txt.fontName = { family: 'PingFang SC', style: hasSub ? 'Regular' : 'Medium' };
      txt.fills = [{ type: 'SOLID', color: hasSub ? c('neutral/6') : (selected ? c('primary') : c('neutral/7')) }];
      txt.characters = label;
      txt.lineHeight = { unit: 'PIXELS', value: 20 };
      textFrame.appendChild(txt);
      item.appendChild(textFrame);

      if (selected) {
        const stripe = figma.createRectangle();
        stripe.name = 'LeftStripe';
        stripe.resize(3, hasSub ? 20 : 24);
        stripe.backgrounds = [{ type: 'SOLID', color: c('primary') }];
        stripe.x = 0;
        stripe.y = (hasSub ? 36 : 40) / 2 - (hasSub ? 20 : 24) / 2;
        item.appendChild(stripe);
      }
      return item;
    }

    navFrame.appendChild(makeNavItem('我的故事', false));
    navFrame.appendChild(makeNavItem('世界观工坊', true));
    navFrame.appendChild(makeNavItem('创建故事', stepState >= 1));
    navFrame.appendChild(makeNavItem('世界设定', false, true, true));
    navFrame.appendChild(makeNavItem('角色设定', false, true, true));

    // ─── 主内容区 ──────────────────────────────────────────────
    const mainArea = figma.createFrame();
    mainArea.name = 'MainArea';
    mainArea.resize(PAGE_W - SIDEBAR_W, 900);
    mainArea.backgrounds = [{ type: 'SOLID', color: c('neutral/1') }];
    mainArea.layoutMode = 'VERTICAL';
    mainArea.counterAxisSizingMode = 'FIXED';
    mainArea.primaryAxisSizingMode = 'FIXED';
    mainArea.paddingLeft = 0;
    mainArea.paddingRight = 0;
    mainArea.paddingTop = 0;
    mainArea.paddingBottom = 0;
    mainArea.itemSpacing = 0;
    root.appendChild(mainArea);

    // 顶栏
    const topbar = figma.createFrame();
    topbar.name = 'Topbar';
    topbar.resize(PAGE_W - SIDEBAR_W, TOPBAR_H);
    topbar.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
    topbar.layoutMode = 'HORIZONTAL';
    topbar.primaryAxisAlignItems = 'CENTER';
    topbar.counterAxisAlignItems = 'CENTER';
    topbar.paddingLeft = CONTENT_PAD;
    topbar.paddingRight = CONTENT_PAD;
    mainArea.appendChild(topbar);

    const breadcrumb = figma.createText();
    breadcrumb.name = 'Breadcrumb';
    breadcrumb.fontSize = 14;
    breadcrumb.fontName = { family: 'PingFang SC', style: 'Regular' };
    breadcrumb.fills = [{ type: 'SOLID', color: c('neutral/6') }];
    breadcrumb.characters = '世界观工坊 > 创建故事';
    breadcrumb.lineHeight = { unit: 'PIXELS', value: 20 };
    topbar.appendChild(breadcrumb);

    // ─── 步骤导航 ──────────────────────────────────────────────
    const stepNav = figma.createFrame();
    stepNav.name = 'StepNav';
    stepNav.resize(PAGE_W - SIDEBAR_W, 64);
    stepNav.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
    stepNav.layoutMode = 'HORIZONTAL';
    stepNav.primaryAxisAlignItems = 'CENTER';
    stepNav.counterAxisAlignItems = 'CENTER';
    stepNav.paddingLeft = CONTENT_PAD;
    stepNav.paddingRight = CONTENT_PAD;
    stepNav.itemSpacing = 0;
    mainArea.appendChild(stepNav);

    const steps = [
      { label: '基础信息', state: stepState === 1 ? 'current' : (stepState > 1 ? 'completed' : 'pending'), icon: '✓' },
      { label: '大纲编辑', state: stepState === 2 ? 'current' : (stepState > 2 ? 'completed' : 'pending'), icon: '✓' },
      { label: '世界设定', state: stepState === 3 ? 'current' : (stepState > 3 ? 'completed' : 'pending'), icon: '✓' },
      { label: '角色设定', state: stepState === 4 ? 'current' : 'pending', icon: '✓' },
    ];

    // 更新图标显示
    steps[0].icon = stepState > 1 ? '✓' : '1';
    steps[1].icon = stepState > 2 ? '✓' : '2';
    steps[2].icon = stepState > 3 ? '✓' : '3';
    steps[3].icon = '4';

    const totalStepsW = steps.length * STEP_SIZE + (steps.length - 1) * STEP_GAP;
    let stepX = (PAGE_W - SIDEBAR_W - totalStepsW) / 2;

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      const sx = stepX + i * (STEP_SIZE + STEP_GAP);

      if (i > 0) {
        const line = figma.createRectangle();
        line.name = `StepLine${i}`;
        line.resize(STEP_GAP - STEP_SIZE, 2);
        line.backgrounds = [{ type: 'SOLID', color: step.state !== 'pending' ? c('primary') : c('neutral/3') }];
        line.x = sx - STEP_GAP;
        line.y = TOPBAR_H / 2 - 1;
        stepNav.appendChild(line);
      }

      const circle = figma.createFrame();
      circle.name = `StepCircle${i + 1}`;
      circle.resize(STEP_SIZE, STEP_SIZE);
      circle.cornerRadius = STEP_SIZE / 2;
      circle.backgrounds = [
        { type: 'SOLID', color: step.state === 'pending' ? c('neutral/0') : c('primary') }
      ];
      circle.strokes = step.state === 'pending'
        ? [{ type: 'SOLID', color: c('neutral/3'), strokeWeight: 1.5 }]
        : [];
      circle.x = sx;
      circle.y = 8;
      circle.layoutMode = 'VERTICAL';
      circle.primaryAxisAlignItems = 'CENTER';
      circle.counterAxisAlignItems = 'CENTER';
      circle.paddingLeft = 0;
      circle.paddingRight = 0;
      circle.paddingTop = 0;
      circle.paddingBottom = 0;

      const iconTxt = figma.createText();
      iconTxt.name = 'Icon';
      iconTxt.fontSize = 13;
      iconTxt.fontName = { family: 'SF Pro', style: 'Medium' };
      iconTxt.fills = [{ type: 'SOLID', color: step.state === 'pending' ? c('neutral/3') : c('neutral/0') }];
      iconTxt.characters = step.icon;
      circle.appendChild(iconTxt);
      stepNav.appendChild(circle);

      const labelTxt = figma.createText();
      labelTxt.name = `StepLabel${i + 1}`;
      labelTxt.fontSize = 13;
      labelTxt.fontName = { family: 'PingFang SC', style: 'Regular' };
      labelTxt.fills = [{ type: 'SOLID', color: step.state === 'current' ? c('primary') : (step.state === 'pending' ? c('neutral/6') : c('primary')) }];
      labelTxt.characters = step.label;
      labelTxt.lineHeight = { unit: 'PIXELS', value: 18 };
      labelTxt.x = sx;
      labelTxt.y = 8 + STEP_SIZE + STEP_LABEL_GAP;
      stepNav.appendChild(labelTxt);
    }

    return { root, mainArea };
  }

  // ─── 通用：创建输入框 ──────────────────────────────────────
  function createInput(label, placeholder, required = false) {
    const field = figma.createFrame();
    field.name = `Field_${label}`;
    field.resize(PAGE_W - SIDEBAR_W - CONTENT_PAD * 2 - CARD_PAD * 2, 60);
    field.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
    field.layoutMode = 'VERTICAL';
    field.counterAxisSizingMode = 'FIXED';
    field.primaryAxisSizingMode = 'FIXED';
    field.paddingLeft = 0;
    field.paddingRight = 0;
    field.paddingTop = 0;
    field.paddingBottom = 0;
    field.itemSpacing = 6;
    return field;
  }

  function createLabelText(label, required) {
    const lbl = figma.createText();
    lbl.name = 'Label';
    lbl.fontSize = 14;
    lbl.fontName = { family: 'PingFang SC', style: 'Regular' };
    lbl.fills = [{ type: 'SOLID', color: c('neutral/6') }];
    lbl.characters = required ? `${label} *` : label;
    lbl.lineHeight = { unit: 'PIXELS', value: 20 };
    return lbl;
  }

  function createInputBox(placeholder, multiline = false, height = INPUT_H) {
    const input = figma.createFrame();
    input.name = 'InputBox';
    input.resize(PAGE_W - SIDEBAR_W - CONTENT_PAD * 2 - CARD_PAD * 2, height);
    input.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
    input.cornerRadius = 8;
    input.strokes = [{ type: 'SOLID', color: c('neutral/3'), strokeWeight: 1 }];
    input.layoutMode = 'VERTICAL';
    input.counterAxisSizingMode = 'FIXED';
    input.primaryAxisSizingMode = 'FIXED';
    input.paddingLeft = 12;
    input.paddingRight = 12;
    input.paddingTop = 8;
    input.paddingBottom = 8;
    input.itemSpacing = 0;

    const ph = figma.createText();
    ph.name = 'Placeholder';
    ph.fontSize = 14;
    ph.fontName = { family: 'PingFang SC', style: 'Regular' };
    ph.fills = [{ type: 'SOLID', color: c('neutral/3') }];
    ph.characters = placeholder;
    ph.lineHeight = { unit: 'PIXELS', value: 20 };
    input.appendChild(ph);

    return input;
  }

  // ─── 通用：创建 Select ──────────────────────────────────────
  function createSelect(label, options, required = false) {
    const field = figma.createFrame();
    field.name = `Select_${label}`;
    field.resize(PAGE_W - SIDEBAR_W - CONTENT_PAD * 2 - CARD_PAD * 2, 60);
    field.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
    field.layoutMode = 'VERTICAL';
    field.counterAxisSizingMode = 'FIXED';
    field.primaryAxisSizingMode = 'FIXED';
    field.paddingLeft = 0;
    field.paddingRight = 0;
    field.paddingTop = 0;
    field.paddingBottom = 0;
    field.itemSpacing = 6;

    const lbl = createLabelText(label, required);
    field.appendChild(lbl);

    const selectBox = figma.createFrame();
    selectBox.name = 'SelectBox';
    selectBox.resize(PAGE_W - SIDEBAR_W - CONTENT_PAD * 2 - CARD_PAD * 2, INPUT_H);
    selectBox.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
    selectBox.cornerRadius = 8;
    selectBox.strokes = [{ type: 'SOLID', color: c('neutral/3'), strokeWeight: 1 }];
    selectBox.layoutMode = 'HORIZONTAL';
    selectBox.primaryAxisAlignItems = 'CENTER';
    selectBox.counterAxisAlignItems = 'CENTER';
    selectBox.paddingLeft = 12;
    selectBox.paddingRight = 12;
    selectBox.itemSpacing = 0;

    const selectText = figma.createText();
    selectText.name = 'SelectText';
    selectText.fontSize = 14;
    selectText.fontName = { family: 'PingFang SC', style: 'Regular' };
    selectText.fills = [{ type: 'SOLID', color: c('neutral/6') }];
    selectText.characters = options[0] || '请选择';
    selectText.lineHeight = { unit: 'PIXELS', value: 20 };
    selectBox.appendChild(selectText);

    const arrow = figma.createText();
    arrow.name = 'Arrow';
    arrow.fontSize = 12;
    arrow.fontName = { family: 'SF Pro', style: 'Regular' };
    arrow.fills = [{ type: 'SOLID', color: c('neutral/6') }];
    arrow.characters = '▾';
    selectBox.appendChild(arrow);

    field.appendChild(selectBox);
    return field;
  }

  // ─── 通用：创建 Textarea ────────────────────────────────────
  function createTextarea(label, placeholder, required = false, rows = 3) {
    const field = figma.createFrame();
    field.name = `Textarea_${label}`;
    field.resize(PAGE_W - SIDEBAR_W - CONTENT_PAD * 2 - CARD_PAD * 2, 40 + rows * 24);
    field.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
    field.layoutMode = 'VERTICAL';
    field.counterAxisSizingMode = 'FIXED';
    field.primaryAxisSizingMode = 'FIXED';
    field.paddingLeft = 0;
    field.paddingRight = 0;
    field.paddingTop = 0;
    field.paddingBottom = 0;
    field.itemSpacing = 6;

    const lbl = createLabelText(label, required);
    field.appendChild(lbl);

    const ta = createInputBox(placeholder, true, 24 + rows * 20);
    field.appendChild(ta);
    return field;
  }

  // ─── 通用：创建按钮 ────────────────────────────────────────
  function createButton(text, type, width = 96) {
    const btn = figma.createFrame();
    btn.name = `Button_${text}`;
    btn.resize(width, 36);
    btn.cornerRadius = BTN_R;
    btn.layoutMode = 'HORIZONTAL';
    btn.primaryAxisAlignItems = 'CENTER';
    btn.counterAxisAlignItems = 'CENTER';
    btn.paddingLeft = 0;
    btn.paddingRight = 0;
    btn.itemSpacing = 0;

    switch (type) {
      case 'primary':
        btn.backgrounds = [{ type: 'SOLID', color: c('primary') }];
        btn.strokes = [];
        break;
      case 'secondary':
        btn.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
        btn.strokes = [{ type: 'SOLID', color: c('neutral/3'), strokeWeight: 1 }];
        break;
      case 'gold':
        btn.resize(width, 28);
        btn.backgrounds = [{ type: 'SOLID', color: c('secondary') }];
        btn.strokes = [];
        break;
      default:
        btn.backgrounds = [{ type: 'SOLID', color: c('primary') }];
    }

    const txt = figma.createText();
    txt.name = 'Label';
    txt.fontSize = 14;
    txt.fontName = { family: 'PingFang SC', style: 'Medium' };
    txt.fills = [{ type: 'SOLID', color: c('neutral/0') }];
    if (type === 'secondary') {
      txt.fills = [{ type: 'SOLID', color: c('neutral/7') }];
    }
    txt.characters = text;
    txt.lineHeight = { unit: 'PIXELS', value: 20 };
    btn.appendChild(txt);

    return btn;
  }

  // ─── 通用：创建表单卡片 ────────────────────────────────────
  function createFormCard(title) {
    const card = figma.createFrame();
    card.name = 'FormCard';
    card.resize(PAGE_W - SIDEBAR_W - CONTENT_PAD * 2, 500);
    card.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
    card.cornerRadius = CARD_R;
    card.effects = shadowStyle;
    card.layoutMode = 'VERTICAL';
    card.counterAxisSizingMode = 'FIXED';
    card.primaryAxisSizingMode = 'FIXED';
    card.paddingLeft = CARD_PAD;
    card.paddingRight = CARD_PAD;
    card.paddingTop = CARD_PAD;
    card.paddingBottom = CARD_PAD;
    card.itemSpacing = 20;

    const titleTxt = figma.createText();
    titleTxt.name = 'CardTitle';
    titleTxt.fontSize = 20;
    titleTxt.fontName = { family: 'PingFang SC', style: 'Semibold' };
    titleTxt.fills = [{ type: 'SOLID', color: c('neutral/8') }];
    titleTxt.characters = title;
    titleTxt.lineHeight = { unit: 'PIXELS', value: 28 };
    card.appendChild(titleTxt);

    return card;
  }

  // ════════════════════════════════════════════════════════════
  // 步骤1：基础信息
  // ════════════════════════════════════════════════════════════
  function createStep1BasicInfo() {
    const { root, mainArea } = createBasePage(1);

    const contentArea = figma.createFrame();
    contentArea.name = 'ContentArea';
    contentArea.resize(PAGE_W - SIDEBAR_W, 740);
    contentArea.backgrounds = [{ type: 'SOLID', color: c('neutral/1') }];
    contentArea.layoutMode = 'VERTICAL';
    contentArea.counterAxisSizingMode = 'FIXED';
    contentArea.primaryAxisSizingMode = 'FIXED';
    contentArea.paddingLeft = CONTENT_PAD;
    contentArea.paddingRight = CONTENT_PAD;
    contentArea.paddingTop = CONTENT_PAD;
    contentArea.paddingBottom = CONTENT_PAD;
    contentArea.itemSpacing = 16;
    mainArea.appendChild(contentArea);

    const formCard = createFormCard('基础信息');
    formCard.resize(PAGE_W - SIDEBAR_W - CONTENT_PAD * 2, 380);
    contentArea.appendChild(formCard);

    // 表单内容容器
    const formFields = figma.createFrame();
    formFields.name = 'FormFields';
    formFields.resize(PAGE_W - SIDEBAR_W - CONTENT_PAD * 2 - CARD_PAD * 2, 300);
    formFields.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
    formFields.layoutMode = 'VERTICAL';
    formFields.counterAxisSizingMode = 'FIXED';
    formFields.primaryAxisSizingMode = 'FIXED';
    formFields.paddingLeft = 0;
    formFields.paddingRight = 0;
    formFields.paddingTop = 0;
    formFields.paddingBottom = 0;
    formFields.itemSpacing = 20;
    formCard.appendChild(formFields);

    // 故事标题（必填）
    const titleField = figma.createFrame();
    titleField.name = 'Field_故事标题';
    titleField.resize(PAGE_W - SIDEBAR_W - CONTENT_PAD * 2 - CARD_PAD * 2, 60);
    titleField.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
    titleField.layoutMode = 'VERTICAL';
    titleField.counterAxisSizingMode = 'FIXED';
    titleField.primaryAxisSizingMode = 'FIXED';
    titleField.paddingLeft = 0;
    titleField.paddingRight = 0;
    titleField.paddingTop = 0;
    titleField.paddingBottom = 0;
    titleField.itemSpacing = 6;

    const titleLabel = figma.createText();
    titleLabel.fontSize = 14;
    titleLabel.fontName = { family: 'PingFang SC', style: 'Regular' };
    titleLabel.fills = [{ type: 'SOLID', color: c('neutral/6') }];
    titleLabel.characters = '故事标题 *';
    titleLabel.lineHeight = { unit: 'PIXELS', value: 20 };
    titleField.appendChild(titleLabel);

    const titleInput = createInputBox('请输入故事标题');
    titleField.appendChild(titleInput);
    formFields.appendChild(titleField);

    // 故事主题
    const themeSelect = createSelect('故事主题', ['悬疑', '奇幻', '科幻', '历史', '都市', '爱情', '武侠', '其他']);
    formFields.appendChild(themeSelect);

    // 故事前提
    const premiseField = createTextarea('故事前提', '用一句话概括你的故事，例如：一个失忆的侦探在一座孤岛上醒来...', false, 3);
    formFields.appendChild(premiseField);

    // 底部操作栏
    const actionBar = figma.createFrame();
    actionBar.name = 'ActionBar';
    actionBar.resize(PAGE_W - SIDEBAR_W - CONTENT_PAD * 2 - CARD_PAD * 2, 48);
    actionBar.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
    actionBar.layoutMode = 'HORIZONTAL';
    actionBar.primaryAxisAlignItems = 'CENTER';
    actionBar.counterAxisAlignItems = 'CENTER';
    actionBar.paddingLeft = 0;
    actionBar.paddingRight = 0;
    actionBar.itemSpacing = 12;
    formCard.appendChild(actionBar);

    const cancelBtn = createButton('取消', 'secondary');
    const nextBtn = createButton('下一步', 'primary');
    actionBar.appendChild(cancelBtn);
    actionBar.appendChild(nextBtn);

    return root;
  }

  // ════════════════════════════════════════════════════════════
  // 步骤2：大纲编辑（原有代码）
  // ════════════════════════════════════════════════════════════
  function createStep2Outline() {
    const { root, mainArea } = createBasePage(2);

    const contentArea = figma.createFrame();
    contentArea.name = 'ContentArea';
    contentArea.resize(PAGE_W - SIDEBAR_W, 740);
    contentArea.backgrounds = [{ type: 'SOLID', color: c('neutral/1') }];
    contentArea.layoutMode = 'VERTICAL';
    contentArea.counterAxisSizingMode = 'FIXED';
    contentArea.primaryAxisSizingMode = 'FIXED';
    contentArea.paddingLeft = CONTENT_PAD;
    contentArea.paddingRight = CONTENT_PAD;
    contentArea.paddingTop = CONTENT_PAD;
    contentArea.paddingBottom = CONTENT_PAD;
    contentArea.itemSpacing = 16;
    mainArea.appendChild(contentArea);

    const formCard = createFormCard('大纲编辑');
    formCard.resize(PAGE_W - SIDEBAR_W - CONTENT_PAD * 2, 620);
    contentArea.appendChild(formCard);

    // 起承转合 2×2 网格
    const plotGrid = figma.createFrame();
    plotGrid.name = 'PlotGrid';
    plotGrid.resize(PAGE_W - SIDEBAR_W - CONTENT_PAD * 2 - CARD_PAD * 2, 200);
    plotGrid.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
    plotGrid.layoutMode = 'HORIZONTAL';
    plotGrid.counterAxisSizingMode = 'FIXED';
    plotGrid.primaryAxisSizingMode = 'FIXED';
    plotGrid.paddingLeft = 0;
    plotGrid.paddingRight = 8;
    plotGrid.paddingTop = 0;
    plotGrid.paddingBottom = 0;
    plotGrid.itemSpacing = 16;
    formCard.appendChild(plotGrid);

    for (let col = 0; col < 2; col++) {
      const colFrame = figma.createFrame();
      colFrame.name = `PlotCol${col + 1}`;
      colFrame.resize(260, 200);
      colFrame.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
      colFrame.layoutMode = 'VERTICAL';
      colFrame.counterAxisSizingMode = 'FIXED';
      colFrame.primaryAxisSizingMode = 'FIXED';
      colFrame.paddingLeft = 0;
      colFrame.paddingRight = 0;
      colFrame.paddingTop = 0;
      colFrame.paddingBottom = 0;
      colFrame.itemSpacing = 12;
      plotGrid.appendChild(colFrame);

      for (let row = 0; row < 2; row++) {
        const labels = ['起', '承', '转', '合'];
        const idx = col * 2 + row;
        const label = labels[idx];

        const cell = figma.createFrame();
        cell.name = `PlotCell_${label}`;
        cell.resize(260, 88);
        cell.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
        cell.cornerRadius = 8;
        cell.layoutMode = 'VERTICAL';
        cell.counterAxisSizingMode = 'FIXED';
        cell.primaryAxisSizingMode = 'FIXED';
        cell.paddingLeft = 0;
        cell.paddingRight = 0;
        cell.paddingTop = 0;
        cell.paddingBottom = 0;
        cell.itemSpacing = 0;
        colFrame.appendChild(cell);

        const topLine = figma.createRectangle();
        topLine.name = 'TopBorder';
        topLine.resize(260, 2);
        topLine.backgrounds = [{ type: 'SOLID', color: c('primary') }];
        topLine.cornerRadius = { topLeft: 8, topRight: 8, bottomLeft: 0, bottomRight: 0 };
        cell.appendChild(topLine);

        const cellInner = figma.createFrame();
        cellInner.name = 'CellInner';
        cellInner.resize(260, 86);
        cellInner.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
        cellInner.cornerRadius = { topLeft: 0, topRight: 0, bottomLeft: 8, bottomRight: 8 };
        cellInner.layoutMode = 'VERTICAL';
        cellInner.counterAxisSizingMode = 'FIXED';
        cellInner.primaryAxisSizingMode = 'FIXED';
        cellInner.paddingLeft = 12;
        cellInner.paddingRight = 12;
        cellInner.paddingTop = 8;
        cellInner.paddingBottom = 8;
        cellInner.itemSpacing = 6;
        cell.appendChild(cellInner);

        const lbl = figma.createText();
        lbl.name = 'Label';
        lbl.fontSize = 14;
        lbl.fontName = { family: 'PingFang SC', style: 'Regular' };
        lbl.fills = [{ type: 'SOLID', color: c('neutral/6') }];
        lbl.characters = label;
        lbl.lineHeight = { unit: 'PIXELS', value: 20 };
        cellInner.appendChild(lbl);

        const ta = figma.createFrame();
        ta.name = 'Textarea';
        ta.resize(236, 44);
        ta.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
        ta.cornerRadius = 8;
        ta.strokes = [{ type: 'SOLID', color: c('neutral/3'), strokeWeight: 1 }];
        ta.layoutMode = 'VERTICAL';
        ta.counterAxisSizingMode = 'FIXED';
        ta.primaryAxisSizingMode = 'FIXED';
        ta.paddingLeft = 10;
        ta.paddingRight = 10;
        ta.paddingTop = 8;
        ta.paddingBottom = 8;
        ta.itemSpacing = 0;

        const placeholder = figma.createText();
        placeholder.name = 'Placeholder';
        placeholder.fontSize = 14;
        placeholder.fontName = { family: 'PingFang SC', style: 'Regular' };
        placeholder.fills = [{ type: 'SOLID', color: c('neutral/3') }];
        placeholder.characters = label === '起' ? '故事开端，介绍背景和主要人物……'
          : label === '承' ? '事件发展，矛盾冲突逐渐升级……'
          : label === '转' ? '高潮转折，关键决定和重大变化……'
          : '结局收尾，主题升华和情感落幕……';
        placeholder.lineHeight = { unit: 'PIXELS', value: 20 };
        ta.appendChild(placeholder);
        cellInner.appendChild(ta);
      }
    }

    // 章节规划
    const chapterSection = figma.createFrame();
    chapterSection.name = 'ChapterSection';
    chapterSection.resize(PAGE_W - SIDEBAR_W - CONTENT_PAD * 2 - CARD_PAD * 2, 140);
    chapterSection.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
    chapterSection.layoutMode = 'VERTICAL';
    chapterSection.counterAxisSizingMode = 'FIXED';
    chapterSection.primaryAxisSizingMode = 'FIXED';
    chapterSection.paddingLeft = 0;
    chapterSection.paddingRight = 0;
    chapterSection.paddingTop = 0;
    chapterSection.paddingBottom = 0;
    chapterSection.itemSpacing = 10;
    formCard.appendChild(chapterSection);

    const chapterTitle = figma.createText();
    chapterTitle.name = 'ChapterTitle';
    chapterTitle.fontSize = 18;
    chapterTitle.fontName = { family: 'PingFang SC', style: 'Medium' };
    chapterTitle.fills = [{ type: 'SOLID', color: c('neutral/8') }];
    chapterTitle.characters = '章节规划';
    chapterTitle.lineHeight = { unit: 'PIXELS', value: 24 };
    chapterSection.appendChild(chapterTitle);

    const chapterItems = ['第一章 黎明', '第二章 暗涌', '第三章 破晓'];
    const chapterList = figma.createFrame();
    chapterList.name = 'ChapterList';
    chapterList.resize(PAGE_W - SIDEBAR_W - CONTENT_PAD * 2 - CARD_PAD * 2, 60);
    chapterList.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
    chapterList.layoutMode = 'HORIZONTAL';
    chapterList.counterAxisSizingMode = 'FIXED';
    chapterList.primaryAxisSizingMode = 'FIXED';
    chapterList.paddingLeft = 0;
    chapterList.paddingRight = 0;
    chapterList.paddingTop = 0;
    chapterList.paddingBottom = 0;
    chapterList.itemSpacing = 10;
    chapterSection.appendChild(chapterList);

    for (const ch of chapterItems) {
      const item = figma.createFrame();
      item.name = `ChapterItem_${ch}`;
      item.resize(200, 40);
      item.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
      item.cornerRadius = 8;
      item.effects = shadowXs;
      item.layoutMode = 'HORIZONTAL';
      item.primaryAxisAlignItems = 'CENTER';
      item.counterAxisAlignItems = 'CENTER';
      item.paddingLeft = 12;
      item.paddingRight = 8;
      item.itemSpacing = 8;

      const gripIcon = figma.createText();
      gripIcon.fontSize = 14;
      gripIcon.fontName = { family: 'SF Symbols', style: 'Regular' };
      gripIcon.fills = [{ type: 'SOLID', color: c('neutral/6') }];
      gripIcon.characters = '☰';
      item.appendChild(gripIcon);

      const chTxt = figma.createText();
      chTxt.fontSize = 14;
      chTxt.fontName = { family: 'PingFang SC', style: 'Regular' };
      chTxt.fills = [{ type: 'SOLID', color: c('neutral/7') }];
      chTxt.characters = ch;
      chTxt.lineHeight = { unit: 'PIXELS', value: 20 };
      item.appendChild(chTxt);

      const trashIcon = figma.createText();
      trashIcon.fontSize = 13;
      trashIcon.fontName = { family: 'SF Symbols', style: 'Regular' };
      trashIcon.fills = [{ type: 'SOLID', color: c('neutral/6') }];
      trashIcon.characters = '🗑';
      item.appendChild(trashIcon);

      chapterList.appendChild(item);
    }

    // 金色添加按钮
    const addBtn = figma.createFrame();
    addBtn.name = 'AddChapterBtn';
    addBtn.resize(120, 28);
    addBtn.backgrounds = [{ type: 'SOLID', color: c('secondary') }];
    addBtn.cornerRadius = 6;
    addBtn.layoutMode = 'HORIZONTAL';
    addBtn.primaryAxisAlignItems = 'CENTER';
    addBtn.counterAxisAlignItems = 'CENTER';
    addBtn.paddingLeft = 0;
    addBtn.paddingRight = 0;
    addBtn.itemSpacing = 0;

    const addIcon = figma.createText();
    addIcon.fontSize = 14;
    addIcon.fontName = { family: 'SF Pro', style: 'Medium' };
    addIcon.fills = [{ type: 'SOLID', color: c('neutral/0') }];
    addIcon.characters = '+';
    addBtn.appendChild(addIcon);

    const addTxt = figma.createText();
    addTxt.fontSize = 13;
    addTxt.fontName = { family: 'PingFang SC', style: 'Medium' };
    addTxt.fills = [{ type: 'SOLID', color: c('neutral/0') }];
    addTxt.characters = '添加章节';
    addTxt.lineHeight = { unit: 'PIXELS', value: 18 };
    addBtn.appendChild(addTxt);
    chapterList.appendChild(addBtn);

    // 结局方向
    const endingSection = figma.createFrame();
    endingSection.name = 'EndingSection';
    endingSection.resize(PAGE_W - SIDEBAR_W - CONTENT_PAD * 2 - CARD_PAD * 2, 100);
    endingSection.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
    endingSection.layoutMode = 'VERTICAL';
    endingSection.counterAxisSizingMode = 'FIXED';
    endingSection.primaryAxisSizingMode = 'FIXED';
    endingSection.paddingLeft = 0;
    endingSection.paddingRight = 0;
    endingSection.paddingTop = 0;
    endingSection.paddingBottom = 0;
    endingSection.itemSpacing = 8;
    formCard.appendChild(endingSection);

    const endingLabel = figma.createText();
    endingLabel.fontSize = 14;
    endingLabel.fontName = { family: 'PingFang SC', style: 'Regular' };
    endingLabel.fills = [{ type: 'SOLID', color: c('neutral/6') }];
    endingLabel.characters = '结局方向';
    endingLabel.lineHeight = { unit: 'PIXELS', value: 20 };
    endingSection.appendChild(endingLabel);

    const endingTa = figma.createFrame();
    endingTa.name = 'EndingTextarea';
    endingTa.resize(PAGE_W - SIDEBAR_W - CONTENT_PAD * 2 - CARD_PAD * 2, 60);
    endingTa.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
    endingTa.cornerRadius = 8;
    endingTa.strokes = [{ type: 'SOLID', color: c('neutral/3'), strokeWeight: 1 }];
    endingTa.layoutMode = 'VERTICAL';
    endingTa.counterAxisSizingMode = 'FIXED';
    endingTa.primaryAxisSizingMode = 'FIXED';
    endingTa.paddingLeft = 12;
    endingTa.paddingRight = 12;
    endingTa.paddingTop = 8;
    endingTa.paddingBottom = 8;
    endingTa.itemSpacing = 0;

    const endingPlaceholder = figma.createText();
    endingPlaceholder.fontSize = 14;
    endingPlaceholder.fontName = { family: 'PingFang SC', style: 'Regular' };
    endingPlaceholder.fills = [{ type: 'SOLID', color: c('neutral/3') }];
    endingPlaceholder.characters = '描述故事的可能结局方向……';
    endingPlaceholder.lineHeight = { unit: 'PIXELS', value: 20 };
    endingTa.appendChild(endingPlaceholder);
    endingSection.appendChild(endingTa);

    // 底部操作栏
    const actionBar = figma.createFrame();
    actionBar.name = 'ActionBar';
    actionBar.resize(PAGE_W - SIDEBAR_W - CONTENT_PAD * 2 - CARD_PAD * 2, 48);
    actionBar.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
    actionBar.layoutMode = 'HORIZONTAL';
    actionBar.primaryAxisAlignItems = 'CENTER';
    actionBar.counterAxisAlignItems = 'CENTER';
    actionBar.paddingLeft = 0;
    actionBar.paddingRight = 0;
    actionBar.itemSpacing = 12;
    formCard.appendChild(actionBar);

    const backBtn = createButton('上一步', 'secondary');
    const nextBtn = createButton('下一步', 'primary');
    actionBar.appendChild(backBtn);
    actionBar.appendChild(nextBtn);

    return root;
  }

  // ════════════════════════════════════════════════════════════
  // 步骤3：世界设定
  // ════════════════════════════════════════════════════════════
  function createStep3WorldSetting() {
    const { root, mainArea } = createBasePage(3);

    const contentArea = figma.createFrame();
    contentArea.name = 'ContentArea';
    contentArea.resize(PAGE_W - SIDEBAR_W, 740);
    contentArea.backgrounds = [{ type: 'SOLID', color: c('neutral/1') }];
    contentArea.layoutMode = 'VERTICAL';
    contentArea.counterAxisSizingMode = 'FIXED';
    contentArea.primaryAxisSizingMode = 'FIXED';
    contentArea.paddingLeft = CONTENT_PAD;
    contentArea.paddingRight = CONTENT_PAD;
    contentArea.paddingTop = CONTENT_PAD;
    contentArea.paddingBottom = CONTENT_PAD;
    contentArea.itemSpacing = 16;
    mainArea.appendChild(contentArea);

    const formCard = createFormCard('世界设定');
    formCard.resize(PAGE_W - SIDEBAR_W - CONTENT_PAD * 2, 620);
    contentArea.appendChild(formCard);

    // 表单内容容器
    const formFields = figma.createFrame();
    formFields.name = 'FormFields';
    formFields.resize(PAGE_W - SIDEBAR_W - CONTENT_PAD * 2 - CARD_PAD * 2, 520);
    formFields.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
    formFields.layoutMode = 'VERTICAL';
    formFields.counterAxisSizingMode = 'FIXED';
    formFields.primaryAxisSizingMode = 'FIXED';
    formFields.paddingLeft = 0;
    formFields.paddingRight = 0;
    formFields.paddingTop = 0;
    formFields.paddingBottom = 0;
    formFields.itemSpacing = 16;
    formCard.appendChild(formFields);

    // 详细度选择标签
    const detailLabel = figma.createText();
    detailLabel.name = 'DetailLabel';
    detailLabel.fontSize = 14;
    detailLabel.fontName = { family: 'PingFang SC', style: 'Regular' };
    detailLabel.fills = [{ type: 'SOLID', color: c('neutral/6') }];
    detailLabel.characters = '详细度选择';
    detailLabel.lineHeight = { unit: 'PIXELS', value: 20 };
    formFields.appendChild(detailLabel);

    // 单选卡片组
    const radioGroup = figma.createFrame();
    radioGroup.name = 'RadioGroup';
    radioGroup.resize(PAGE_W - SIDEBAR_W - CONTENT_PAD * 2 - CARD_PAD * 2, 80);
    radioGroup.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
    radioGroup.layoutMode = 'HORIZONTAL';
    radioGroup.counterAxisSizingMode = 'FIXED';
    radioGroup.primaryAxisSizingMode = 'FIXED';
    radioGroup.paddingLeft = 0;
    radioGroup.paddingRight = 16;
    radioGroup.paddingTop = 0;
    radioGroup.paddingBottom = 0;
    radioGroup.itemSpacing = 16;
    formFields.appendChild(radioGroup);

    // 中等选项（选中）
    const mediumCard = figma.createFrame();
    mediumCard.name = 'RadioOption_中等';
    mediumCard.resize(280, 80);
    mediumCard.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
    mediumCard.cornerRadius = 8;
    mediumCard.strokes = [{ type: 'SOLID', color: c('primary'), strokeWeight: 2 }];
    mediumCard.layoutMode = 'VERTICAL';
    mediumCard.counterAxisSizingMode = 'FIXED';
    mediumCard.primaryAxisSizingMode = 'FIXED';
    mediumCard.paddingLeft = 16;
    mediumCard.paddingRight = 16;
    mediumCard.paddingTop = 12;
    mediumCard.paddingBottom = 12;
    mediumCard.itemSpacing = 8;
    radioGroup.appendChild(mediumCard);

    const mediumHeader = figma.createFrame();
    mediumHeader.name = 'Header';
    mediumHeader.resize(248, 24);
    mediumHeader.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
    mediumHeader.layoutMode = 'HORIZONTAL';
    mediumHeader.counterAxisSizingMode = 'FIXED';
    mediumHeader.primaryAxisSizingMode = 'FIXED';
    mediumHeader.paddingLeft = 0;
    mediumHeader.paddingRight = 0;
    mediumHeader.paddingTop = 0;
    mediumHeader.paddingBottom = 0;
    mediumHeader.itemSpacing = 8;

    const mediumDot = figma.createFrame();
    mediumDot.name = 'SelectedDot';
    mediumDot.resize(16, 16);
    mediumDot.cornerRadius = 8;
    mediumDot.backgrounds = [{ type: 'SOLID', color: c('primary') }];
    mediumHeader.appendChild(mediumDot);

    const mediumTitle = figma.createText();
    mediumTitle.fontSize = 14;
    mediumTitle.fontName = { family: 'PingFang SC', style: 'Medium' };
    mediumTitle.fills = [{ type: 'SOLID', color: c('neutral/8') }];
    mediumTitle.characters = '中等';
    mediumTitle.lineHeight = { unit: 'PIXELS', value: 20 };
    mediumHeader.appendChild(mediumTitle);
    mediumCard.appendChild(mediumHeader);

    const mediumDesc = figma.createText();
    mediumDesc.fontSize = 12;
    mediumDesc.fontName = { family: 'PingFang SC', style: 'Regular' };
    mediumDesc.fills = [{ type: 'SOLID', color: c('neutral/6') }];
    mediumDesc.characters = 'AI将自动补全细节，补全后可编辑';
    mediumDesc.lineHeight = { unit: 'PIXELS', value: 16 };
    mediumCard.appendChild(mediumDesc);

    // 深度选项
    const deepCard = figma.createFrame();
    deepCard.name = 'RadioOption_深度';
    deepCard.resize(280, 80);
    deepCard.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
    deepCard.cornerRadius = 8;
    deepCard.strokes = [{ type: 'SOLID', color: c('neutral/3'), strokeWeight: 1 }];
    deepCard.layoutMode = 'VERTICAL';
    deepCard.counterAxisSizingMode = 'FIXED';
    deepCard.primaryAxisSizingMode = 'FIXED';
    deepCard.paddingLeft = 16;
    deepCard.paddingRight = 16;
    deepCard.paddingTop = 12;
    deepCard.paddingBottom = 12;
    deepCard.itemSpacing = 8;
    radioGroup.appendChild(deepCard);

    const deepHeader = figma.createFrame();
    deepHeader.name = 'Header';
    deepHeader.resize(248, 24);
    deepHeader.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
    deepHeader.layoutMode = 'HORIZONTAL';
    deepHeader.counterAxisSizingMode = 'FIXED';
    deepHeader.primaryAxisSizingMode = 'FIXED';
    deepHeader.paddingLeft = 0;
    deepHeader.paddingRight = 0;
    deepHeader.paddingTop = 0;
    deepHeader.paddingBottom = 0;
    deepHeader.itemSpacing = 8;

    const deepDot = figma.createFrame();
    deepDot.name = 'UnselectedDot';
    deepDot.resize(16, 16);
    deepDot.cornerRadius = 8;
    deepDot.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
    deepDot.strokes = [{ type: 'SOLID', color: c('neutral/3'), strokeWeight: 1 }];
    deepHeader.appendChild(deepDot);

    const deepTitle = figma.createText();
    deepTitle.fontSize = 14;
    deepTitle.fontName = { family: 'PingFang SC', style: 'Medium' };
    deepTitle.fills = [{ type: 'SOLID', color: c('neutral/8') }];
    deepTitle.characters = '深度';
    deepTitle.lineHeight = { unit: 'PIXELS', value: 20 };
    deepHeader.appendChild(deepTitle);
    deepCard.appendChild(deepHeader);

    const deepDesc = figma.createText();
    deepDesc.fontSize = 12;
    deepDesc.fontName = { family: 'PingFang SC', style: 'Regular' };
    deepDesc.fills = [{ type: 'SOLID', color: c('neutral/6') }];
    deepDesc.characters = '自行填写全部细节';
    deepDesc.lineHeight = { unit: 'PIXELS', value: 16 };
    deepCard.appendChild(deepDesc);

    // 世界观简介
    const worldIntro = createTextarea('世界观简介', '描述故事发生的宏观背景', false, 3);
    formFields.appendChild(worldIntro);

    // 体系名称
    const systemField = figma.createFrame();
    systemField.name = 'Field_体系名称';
    systemField.resize(PAGE_W - SIDEBAR_W - CONTENT_PAD * 2 - CARD_PAD * 2, 60);
    systemField.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
    systemField.layoutMode = 'VERTICAL';
    systemField.counterAxisSizingMode = 'FIXED';
    systemField.primaryAxisSizingMode = 'FIXED';
    systemField.paddingLeft = 0;
    systemField.paddingRight = 0;
    systemField.paddingTop = 0;
    systemField.paddingBottom = 0;
    systemField.itemSpacing = 6;

    const systemLabel = figma.createText();
    systemLabel.fontSize = 14;
    systemLabel.fontName = { family: 'PingFang SC', style: 'Regular' };
    systemLabel.fills = [{ type: 'SOLID', color: c('neutral/6') }];
    systemLabel.characters = '体系名称';
    systemLabel.lineHeight = { unit: 'PIXELS', value: 20 };
    systemField.appendChild(systemLabel);

    const systemInput = createInputBox('如：魔法体系/修仙等级/科技路线');
    systemField.appendChild(systemInput);
    formFields.appendChild(systemField);

    // 体系描述
    const systemDesc = createTextarea('体系描述', '描述该体系的具体规则', false, 2);
    formFields.appendChild(systemDesc);

    // 阵营关系
    const factionField = createTextarea('阵营关系', '如：皇室vs叛军、光明教会vs暗影公会', false, 2);
    formFields.appendChild(factionField);

    // 地理概况
    const geoField = createTextarea('地理概况', '如：大陆名、重要城市、危险区域', false, 2);
    formFields.appendChild(geoField);

    // AI补全按钮（右下角）
    const aiBtnContainer = figma.createFrame();
    aiBtnContainer.name = 'AIBtnContainer';
    aiBtnContainer.resize(PAGE_W - SIDEBAR_W - CONTENT_PAD * 2 - CARD_PAD * 2, 36);
    aiBtnContainer.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
    aiBtnContainer.layoutMode = 'HORIZONTAL';
    aiBtnContainer.primaryAxisAlignItems = 'FLEX_END';
    aiBtnContainer.counterAxisAlignItems = 'CENTER';
    aiBtnContainer.paddingLeft = 0;
    aiBtnContainer.paddingRight = 0;
    aiBtnContainer.paddingTop = 0;
    aiBtnContainer.paddingBottom = 0;
    aiBtnContainer.itemSpacing = 0;
    formFields.appendChild(aiBtnContainer);

    const aiBtn = figma.createFrame();
    aiBtn.name = 'Button_AI补全';
    aiBtn.resize(96, 28);
    aiBtn.backgrounds = [{ type: 'SOLID', color: c('secondary') }];
    aiBtn.cornerRadius = 6;
    aiBtn.layoutMode = 'HORIZONTAL';
    aiBtn.primaryAxisAlignItems = 'CENTER';
    aiBtn.counterAxisAlignItems = 'CENTER';
    aiBtn.paddingLeft = 0;
    aiBtn.paddingRight = 0;
    aiBtn.itemSpacing = 4;

    const aiIcon = figma.createText();
    aiIcon.fontSize = 12;
    aiIcon.fontName = { family: 'SF Pro', style: 'Regular' };
    aiIcon.fills = [{ type: 'SOLID', color: c('neutral/0') }];
    aiIcon.characters = '✨';
    aiBtn.appendChild(aiIcon);

    const aiTxt = figma.createText();
    aiTxt.fontSize = 13;
    aiTxt.fontName = { family: 'PingFang SC', style: 'Medium' };
    aiTxt.fills = [{ type: 'SOLID', color: c('neutral/0') }];
    aiTxt.characters = 'AI补全';
    aiTxt.lineHeight = { unit: 'PIXELS', value: 18 };
    aiBtn.appendChild(aiTxt);
    aiBtnContainer.appendChild(aiBtn);

    // 底部操作栏
    const actionBar = figma.createFrame();
    actionBar.name = 'ActionBar';
    actionBar.resize(PAGE_W - SIDEBAR_W - CONTENT_PAD * 2 - CARD_PAD * 2, 48);
    actionBar.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
    actionBar.layoutMode = 'HORIZONTAL';
    actionBar.primaryAxisAlignItems = 'CENTER';
    actionBar.counterAxisAlignItems = 'CENTER';
    actionBar.paddingLeft = 0;
    actionBar.paddingRight = 0;
    actionBar.itemSpacing = 12;
    formCard.appendChild(actionBar);

    const backBtn = createButton('上一步', 'secondary');
    const nextBtn = createButton('下一步', 'primary');
    actionBar.appendChild(backBtn);
    actionBar.appendChild(nextBtn);

    return root;
  }

  // ════════════════════════════════════════════════════════════
  // 步骤4：角色设定
  // ════════════════════════════════════════════════════════════
  function createStep4CharacterSetting() {
    const { root, mainArea } = createBasePage(4);

    const contentArea = figma.createFrame();
    contentArea.name = 'ContentArea';
    contentArea.resize(PAGE_W - SIDEBAR_W, 740);
    contentArea.backgrounds = [{ type: 'SOLID', color: c('neutral/1') }];
    contentArea.layoutMode = 'VERTICAL';
    contentArea.counterAxisSizingMode = 'FIXED';
    contentArea.primaryAxisSizingMode = 'FIXED';
    contentArea.paddingLeft = CONTENT_PAD;
    contentArea.paddingRight = CONTENT_PAD;
    contentArea.paddingTop = CONTENT_PAD;
    contentArea.paddingBottom = CONTENT_PAD;
    contentArea.itemSpacing = 16;
    mainArea.appendChild(contentArea);

    const formCard = createFormCard('角色设定');
    formCard.resize(PAGE_W - SIDEBAR_W - CONTENT_PAD * 2, 620);
    contentArea.appendChild(formCard);

    // ─── 主角区域 ──────────────────────────────────────────────
    const mainCharArea = figma.createFrame();
    mainCharArea.name = 'MainCharacterArea';
    mainCharArea.resize(PAGE_W - SIDEBAR_W - CONTENT_PAD * 2 - CARD_PAD * 2, 240);
    mainCharArea.backgrounds = [{ type: 'SOLID', color: c('primary/surface') }];
    mainCharArea.cornerRadius = { topLeft: 0, topRight: 0, bottomLeft: 0, bottomRight: 0 };
    mainCharArea.layoutMode = 'VERTICAL';
    mainCharArea.counterAxisSizingMode = 'FIXED';
    mainCharArea.primaryAxisSizingMode = 'FIXED';
    mainCharArea.paddingLeft = 0;
    mainCharArea.paddingRight = 0;
    mainCharArea.paddingTop = 0;
    mainCharArea.paddingBottom = 0;
    mainCharArea.itemSpacing = 16;
    formCard.appendChild(mainCharArea);

    // 顶部紫色装饰线
    const accentLine = figma.createRectangle();
    accentLine.name = 'AccentLine';
    accentLine.resize(PAGE_W - SIDEBAR_W - CONTENT_PAD * 2 - CARD_PAD * 2, 2);
    accentLine.backgrounds = [{ type: 'SOLID', color: c('primary') }];
    mainCharArea.appendChild(accentLine);

    // 主角标签行
    const mainCharHeader = figma.createFrame();
    mainCharHeader.name = 'MainCharHeader';
    mainCharHeader.resize(PAGE_W - SIDEBAR_W - CONTENT_PAD * 2 - CARD_PAD * 2, 28);
    mainCharHeader.backgrounds = [{ type: 'SOLID', color: c('primary/surface') }];
    mainCharHeader.layoutMode = 'HORIZONTAL';
    mainCharHeader.counterAxisSizingMode = 'FIXED';
    mainCharHeader.primaryAxisSizingMode = 'FIXED';
    mainCharHeader.paddingLeft = 0;
    mainCharHeader.paddingRight = 0;
    mainCharHeader.paddingTop = 0;
    mainCharHeader.paddingBottom = 0;
    mainCharHeader.itemSpacing = 8;
    mainCharArea.appendChild(mainCharHeader);

    const mainCharTag = figma.createFrame();
    mainCharTag.name = 'Tag_主角';
    mainCharTag.resize(40, 20);
    mainCharTag.backgrounds = [{ type: 'SOLID', color: c('primary') }];
    mainCharTag.cornerRadius = 4;
    mainCharTag.layoutMode = 'HORIZONTAL';
    mainCharTag.primaryAxisAlignItems = 'CENTER';
    mainCharTag.counterAxisAlignItems = 'CENTER';
    mainCharTag.paddingLeft = 0;
    mainCharTag.paddingRight = 0;
    mainCharTag.itemSpacing = 0;

    const mainCharTagTxt = figma.createText();
    mainCharTagTxt.fontSize = 11;
    mainCharTagTxt.fontName = { family: 'PingFang SC', style: 'Medium' };
    mainCharTagTxt.fills = [{ type: 'SOLID', color: c('neutral/0') }];
    mainCharTagTxt.characters = '主角';
    mainCharHeader.appendChild(mainCharTag);

    // 主角表单字段
    const mainCharFields = figma.createFrame();
    mainCharFields.name = 'MainCharFields';
    mainCharFields.resize(PAGE_W - SIDEBAR_W - CONTENT_PAD * 2 - CARD_PAD * 2, 180);
    mainCharFields.backgrounds = [{ type: 'SOLID', color: c('primary/surface') }];
    mainCharFields.layoutMode = 'VERTICAL';
    mainCharFields.counterAxisSizingMode = 'FIXED';
    mainCharFields.primaryAxisSizingMode = 'FIXED';
    mainCharFields.paddingLeft = 0;
    mainCharFields.paddingRight = 0;
    mainCharFields.paddingTop = 0;
    mainCharFields.paddingBottom = 0;
    mainCharFields.itemSpacing = 12;
    mainCharArea.appendChild(mainCharFields);

    // 姓名（必填）
    const nameField = figma.createFrame();
    nameField.name = 'Field_姓名';
    nameField.resize(PAGE_W - SIDEBAR_W - CONTENT_PAD * 2 - CARD_PAD * 2, 60);
    nameField.backgrounds = [{ type: 'SOLID', color: c('primary/surface') }];
    nameField.layoutMode = 'VERTICAL';
    nameField.counterAxisSizingMode = 'FIXED';
    nameField.primaryAxisSizingMode = 'FIXED';
    nameField.paddingLeft = 0;
    nameField.paddingRight = 0;
    nameField.paddingTop = 0;
    nameField.paddingBottom = 0;
    nameField.itemSpacing = 6;

    const nameLabel = figma.createText();
    nameLabel.fontSize = 14;
    nameLabel.fontName = { family: 'PingFang SC', style: 'Regular' };
    nameLabel.fills = [{ type: 'SOLID', color: c('neutral/6') }];
    nameLabel.characters = '姓名 *';
    nameLabel.lineHeight = { unit: 'PIXELS', value: 20 };
    nameField.appendChild(nameLabel);

    const nameInput = createInputBox('请输入主角姓名');
    nameField.appendChild(nameInput);
    mainCharFields.appendChild(nameField);

    // 性格
    const personalityField = figma.createFrame();
    personalityField.name = 'Field_性格';
    personalityField.resize(PAGE_W - SIDEBAR_W - CONTENT_PAD * 2 - CARD_PAD * 2, 36);
    personalityField.backgrounds = [{ type: 'SOLID', color: c('primary/surface') }];
    personalityField.layoutMode = 'VERTICAL';
    personalityField.counterAxisSizingMode = 'FIXED';
    personalityField.primaryAxisSizingMode = 'FIXED';
    personalityField.paddingLeft = 0;
    personalityField.paddingRight = 0;
    personalityField.paddingTop = 0;
    personalityField.paddingBottom = 0;
    personalityField.itemSpacing = 6;

    const personalityLabel = figma.createText();
    personalityLabel.fontSize = 14;
    personalityLabel.fontName = { family: 'PingFang SC', style: 'Regular' };
    personalityLabel.fills = [{ type: 'SOLID', color: c('neutral/6') }];
    personalityLabel.characters = '性格';
    personalityLabel.lineHeight = { unit: 'PIXELS', value: 20 };
    personalityField.appendChild(personalityLabel);

    const personalityInput = createInputBox('描述主角性格特点', false, 36);
    personalityField.appendChild(personalityInput);
    mainCharFields.appendChild(personalityField);

    // 背景
    const backgroundField = createTextarea('背景', '描述主角的背景故事', false, 2);
    mainCharFields.appendChild(backgroundField);

    // 能力
    const abilityField = figma.createFrame();
    abilityField.name = 'Field_能力';
    abilityField.resize(PAGE_W - SIDEBAR_W - CONTENT_PAD * 2 - CARD_PAD * 2, 60);
    abilityField.backgrounds = [{ type: 'SOLID', color: c('primary/surface') }];
    abilityField.layoutMode = 'VERTICAL';
    abilityField.counterAxisSizingMode = 'FIXED';
    abilityField.primaryAxisSizingMode = 'FIXED';
    abilityField.paddingLeft = 0;
    abilityField.paddingRight = 0;
    abilityField.paddingTop = 0;
    abilityField.paddingBottom = 0;
    abilityField.itemSpacing = 6;

    const abilityLabel = figma.createText();
    abilityLabel.fontSize = 14;
    abilityLabel.fontName = { family: 'PingFang SC', style: 'Regular' };
    abilityLabel.fills = [{ type: 'SOLID', color: c('neutral/6') }];
    abilityLabel.characters = '能力';
    abilityLabel.lineHeight = { unit: 'PIXELS', value: 20 };
    abilityField.appendChild(abilityLabel);

    const abilityInput = createInputBox('描述主角的特殊能力');
    abilityField.appendChild(abilityInput);
    mainCharFields.appendChild(abilityField);

    // ─── 分割线 ────────────────────────────────────────────────
    const divider = figma.createRectangle();
    divider.name = 'Divider';
    divider.resize(PAGE_W - SIDEBAR_W - CONTENT_PAD * 2 - CARD_PAD * 2, 1);
    divider.backgrounds = [{ type: 'SOLID', color: c('neutral/3') }];
    formCard.appendChild(divider);

    // ─── 配角区域 ──────────────────────────────────────────────
    const subCharArea = figma.createFrame();
    subCharArea.name = 'SubCharacterArea';
    subCharArea.resize(PAGE_W - SIDEBAR_W - CONTENT_PAD * 2 - CARD_PAD * 2, 240);
    subCharArea.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
    subCharArea.layoutMode = 'VERTICAL';
    subCharArea.counterAxisSizingMode = 'FIXED';
    subCharArea.primaryAxisSizingMode = 'FIXED';
    subCharArea.paddingLeft = 0;
    subCharArea.paddingRight = 0;
    subCharArea.paddingTop = 0;
    subCharArea.paddingBottom = 0;
    subCharArea.itemSpacing = 12;
    formCard.appendChild(subCharArea);

    // 配角标签
    const subCharHeader = figma.createFrame();
    subCharHeader.name = 'SubCharHeader';
    subCharHeader.resize(60, 28);
    subCharHeader.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
    subCharHeader.layoutMode = 'HORIZONTAL';
    subCharHeader.counterAxisSizingMode = 'FIXED';
    subCharHeader.primaryAxisSizingMode = 'FIXED';
    subCharHeader.paddingLeft = 0;
    subCharHeader.paddingRight = 0;
    subCharHeader.paddingTop = 0;
    subCharHeader.paddingBottom = 0;
    subCharHeader.itemSpacing = 0;
    subCharArea.appendChild(subCharHeader);

    const subCharTag = figma.createFrame();
    subCharTag.name = 'Tag_配角';
    subCharTag.resize(40, 20);
    subCharTag.backgrounds = [{ type: 'SOLID', color: c('neutral/6') }];
    subCharTag.cornerRadius = 4;
    subCharTag.layoutMode = 'HORIZONTAL';
    subCharTag.primaryAxisAlignItems = 'CENTER';
    subCharTag.counterAxisAlignItems = 'CENTER';
    subCharTag.paddingLeft = 0;
    subCharTag.paddingRight = 0;
    subCharTag.itemSpacing = 0;

    const subCharTagTxt = figma.createText();
    subCharTagTxt.fontSize = 11;
    subCharTagTxt.fontName = { family: 'PingFang SC', style: 'Medium' };
    subCharTagTxt.fills = [{ type: 'SOLID', color: c('neutral/0') }];
    subCharTagTxt.characters = '配角';
    subCharTag.appendChild(subCharTagTxt);
    subCharHeader.appendChild(subCharTag);

    // 配角卡片
    const subCharCard = figma.createFrame();
    subCharCard.name = 'SubCharCard_赵无极';
    subCharCard.resize(PAGE_W - SIDEBAR_W - CONTENT_PAD * 2 - CARD_PAD * 2, 80);
    subCharCard.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
    subCharCard.cornerRadius = 8;
    subCharCard.effects = shadowXs;
    subCharCard.layoutMode = 'VERTICAL';
    subCharCard.counterAxisSizingMode = 'FIXED';
    subCharCard.primaryAxisSizingMode = 'FIXED';
    subCharCard.paddingLeft = 16;
    subCharCard.paddingRight = 16;
    subCharCard.paddingTop = 12;
    subCharCard.paddingBottom = 12;
    subCharCard.itemSpacing = 10;
    subCharArea.appendChild(subCharCard);

    // 卡片头部（姓名+删除按钮）
    const cardHeader = figma.createFrame();
    cardHeader.name = 'CardHeader';
    cardHeader.resize(PAGE_W - SIDEBAR_W - CONTENT_PAD * 2 - CARD_PAD * 2 - 32, 24);
    cardHeader.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
    cardHeader.layoutMode = 'HORIZONTAL';
    cardHeader.primaryAxisAlignItems = 'CENTER';
    cardHeader.counterAxisAlignItems = 'CENTER';
    cardHeader.paddingLeft = 0;
    cardHeader.paddingRight = 0;
    cardHeader.paddingTop = 0;
    cardHeader.paddingBottom = 0;
    cardHeader.itemSpacing = 0;

    const charName = figma.createText();
    charName.fontSize = 14;
    charName.fontName = { family: 'PingFang SC', style: 'Medium' };
    charName.fills = [{ type: 'SOLID', color: c('neutral/7') }];
    charName.characters = '赵无极';
    charName.lineHeight = { unit: 'PIXELS', value: 20 };
    cardHeader.appendChild(charName);

    const spacer = figma.createFrame();
    spacer.name = 'Spacer';
    spacer.resize(PAGE_W - SIDEBAR_W - CONTENT_PAD * 2 - CARD_PAD * 2 - 32 - 48 - 24, 1);
    spacer.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
    cardHeader.appendChild(spacer);

    const deleteIcon = figma.createText();
    deleteIcon.name = 'DeleteIcon';
    deleteIcon.fontSize = 14;
    deleteIcon.fontName = { family: 'SF Symbols', style: 'Regular' };
    deleteIcon.fills = [{ type: 'SOLID', color: c('neutral/6') }];
    deleteIcon.characters = '🗑';
    cardHeader.appendChild(deleteIcon);
    subCharCard.appendChild(cardHeader);

    // 立场+关系行
    const cardRow = figma.createFrame();
    cardRow.name = 'CardRow';
    cardRow.resize(PAGE_W - SIDEBAR_W - CONTENT_PAD * 2 - CARD_PAD * 2 - 32, 36);
    cardRow.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
    cardRow.layoutMode = 'HORIZONTAL';
    cardRow.counterAxisSizingMode = 'FIXED';
    cardRow.primaryAxisSizingMode = 'FIXED';
    cardRow.paddingLeft = 0;
    cardRow.paddingRight = 16;
    cardRow.paddingTop = 0;
    cardRow.paddingBottom = 0;
    cardRow.itemSpacing = 12;
    subCharCard.appendChild(cardRow);

    // 立场
    const stanceField = figma.createFrame();
    stanceField.name = 'Field_立场';
    stanceField.resize(120, 36);
    stanceField.backgrounds = [{ type: 'SOLID', color: c('neutral/1') }];
    stanceField.cornerRadius = 6;
    stanceField.layoutMode = 'HORIZONTAL';
    stanceField.primaryAxisAlignItems = 'CENTER';
    stanceField.counterAxisAlignItems = 'CENTER';
    stanceField.paddingLeft = 10;
    stanceField.paddingRight = 8;
    stanceField.itemSpacing = 4;

    const stanceLabel = figma.createText();
    stanceLabel.fontSize = 12;
    stanceLabel.fontName = { family: 'PingFang SC', style: 'Regular' };
    stanceLabel.fills = [{ type: 'SOLID', color: c('neutral/6') }];
    stanceLabel.characters = '立场';
    stanceLabel.lineHeight = { unit: 'PIXELS', value: 16 };
    stanceField.appendChild(stanceLabel);

    const stanceSelect = figma.createText();
    stanceSelect.fontSize = 12;
    stanceSelect.fontName = { family: 'PingFang SC', style: 'Regular' };
    stanceSelect.fills = [{ type: 'SOLID', color: c('neutral/7') }];
    stanceSelect.characters = '盟友 ▾';
    stanceSelect.lineHeight = { unit: 'PIXELS', value: 16 };
    stanceField.appendChild(stanceSelect);
    cardRow.appendChild(stanceField);

    // 关系
    const relationField = figma.createFrame();
    relationField.name = 'Field_关系';
    relationField.resize(PAGE_W - SIDEBAR_W - CONTENT_PAD * 2 - CARD_PAD * 2 - 32 - 120 - 12 - 16, 36);
    relationField.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
    relationField.cornerRadius = 6;
    relationField.strokes = [{ type: 'SOLID', color: c('neutral/3'), strokeWeight: 1 }];
    relationField.layoutMode = 'VERTICAL';
    relationField.counterAxisSizingMode = 'FIXED';
    relationField.primaryAxisSizingMode = 'FIXED';
    relationField.paddingLeft = 10;
    relationField.paddingRight = 10;
    relationField.paddingTop = 6;
    relationField.paddingBottom = 6;
    relationField.itemSpacing = 0;

    const relationPh = figma.createText();
    relationPh.fontSize = 12;
    relationPh.fontName = { family: 'PingFang SC', style: 'Regular' };
    relationPh.fills = [{ type: 'SOLID', color: c('neutral/3') }];
    relationPh.characters = '与主角是师徒关系';
    relationPh.lineHeight = { unit: 'PIXELS', value: 16 };
    relationField.appendChild(relationPh);
    cardRow.appendChild(relationField);

    // 添加配角虚线框
    const addSubChar = figma.createFrame();
    addSubChar.name = 'AddSubChar';
    addSubChar.resize(PAGE_W - SIDEBAR_W - CONTENT_PAD * 2 - CARD_PAD * 2, 50);
    addSubChar.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
    addSubChar.cornerRadius = 8;
    addSubChar.strokes = [{ type: 'DASHED', color: c('neutral/3'), strokeWeight: 1 }];
    addSubChar.layoutMode = 'VERTICAL';
    addSubChar.primaryAxisAlignItems = 'CENTER';
    addSubChar.counterAxisAlignItems = 'CENTER';
    addSubChar.paddingLeft = 0;
    addSubChar.paddingRight = 0;
    addSubChar.paddingTop = 0;
    addSubChar.paddingBottom = 0;
    addSubChar.itemSpacing = 0;
    subCharArea.appendChild(addSubChar);

    const addText = figma.createText();
    addText.fontSize = 14;
    addText.fontName = { family: 'PingFang SC', style: 'Regular' };
    addText.fills = [{ type: 'SOLID', color: c('neutral/6') }];
    addText.characters = '+ 点击添加配角';
    addText.lineHeight = { unit: 'PIXELS', value: 20 };
    addSubChar.appendChild(addText);

    // 底部操作栏
    const actionBar = figma.createFrame();
    actionBar.name = 'ActionBar';
    actionBar.resize(PAGE_W - SIDEBAR_W - CONTENT_PAD * 2 - CARD_PAD * 2, 48);
    actionBar.backgrounds = [{ type: 'SOLID', color: c('neutral/0') }];
    actionBar.layoutMode = 'HORIZONTAL';
    actionBar.primaryAxisAlignItems = 'CENTER';
    actionBar.counterAxisAlignItems = 'CENTER';
    actionBar.paddingLeft = 0;
    actionBar.paddingRight = 0;
    actionBar.itemSpacing = 12;
    formCard.appendChild(actionBar);

    const backBtn = createButton('上一步', 'secondary');
    const finishBtn = createButton('完成创建', 'primary', 120);
    actionBar.appendChild(backBtn);
    actionBar.appendChild(finishBtn);

    return root;
  }

  // ════════════════════════════════════════════════════════════
  // 主入口：生成所有4个步骤页面
  // ════════════════════════════════════════════════════════════
  
  // 创建步骤1
  const page1 = createStep1BasicInfo();
  figma.currentPage = page1.parent.children[0];
  
  // 创建步骤2
  const page2 = createStep2Outline();
  figma.currentPage = page2.parent.children[0];
  
  // 创建步骤3
  const page3 = createStep3WorldSetting();
  figma.currentPage = page3.parent.children[0];
  
  // 创建步骤4
  const page4 = createStep4CharacterSetting();
  figma.currentPage = page4.parent.children[0];

  // 选中步骤1
  figma.currentPage = page1.parent;

  figma.closePlugin();
}

main().catch(err => {
  console.error(err);
  figma.closePlugin();
});

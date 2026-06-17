// 戏境 - 故事列表页面 Figma Plugin 脚本
// 在 Figma 中运行此脚本即可生成完整可编辑设计

// ============================================================
// 1. createVariables() — 创建设计变量
// ============================================================
function createVariables() {
  // Color Variables - Light Mode
  const colorModes = { "0:0": { color: { r: 1, g: 1, b: 1 }, type: "RGB" } };
  
  const colorCollection = figma.variables.createVariableCollection("design-tokens");
  colorCollection.modes = [{ name: "Light" }];
  const modeId = colorCollection.modes[0].modeId;
  
  const colorMap = {
    "primary": { r: 0.486, g: 0.361, b: 0.988, a: 1 },
    "primary/dark": { r: 0.388, g: 0.267, b: 0.878, a: 1 },
    "primary/surface": { r: 0.961, g: 0.953, b: 1, a: 1 },
    "secondary": { r: 0.788, g: 0.596, b: 0.290, a: 1 },
    "secondary/dark": { r: 0.659, g: 0.494, b: 0.220, a: 1 },
    "secondary/surface": { r: 1, g: 0.984, b: 0.922, a: 1 },
    "neutral/0": { r: 1, g: 1, b: 1, a: 1 },
    "neutral/1": { r: 0.976, g: 0.980, b: 0.984, a: 1 },
    "neutral/2": { r: 0.953, g: 0.957, b: 0.961, a: 1 },
    "neutral/3": { r: 0.898, g: 0.906, b: 0.922, a: 1 },
    "neutral/5": { r: 0.612, g: 0.639, b: 0.686, a: 1 },
    "neutral/6": { r: 0.420, g: 0.447, b: 0.502, a: 1 },
    "neutral/7": { r: 0.216, g: 0.255, b: 0.318, a: 1 },
    "neutral/8": { r: 0.122, g: 0.161, b: 0.216, a: 1 },
    "surface/page": { r: 0.976, g: 0.980, b: 0.984, a: 1 },
    "surface/card": { r: 1, g: 1, b: 1, a: 1 },
    "surface/sidebar": { r: 1, g: 1, b: 1, a: 1 },
  };
  
  const colorVars = {};
  for (const [name, color] of Object.entries(colorMap)) {
    const variable = figma.variables.createVariable(name, colorCollection, "COLOR");
    variable.resolvedType = "COLOR";
    variable.valuesByMode = { [modeId]: color };
    colorVars[name] = variable;
  }
  
  // Spacing Variables
  const spacingCollection = figma.variables.createVariableCollection("spacing");
  const spacingModeId = spacingCollection.modes[0].modeId;
  
  const spacingVars = {};
  const spacingValues = {
    "xs": 4, "sm": 8, "md": 12, "base": 16, "lg": 24, "xl": 32, "2xl": 48
  };
  for (const [name, value] of Object.entries(spacingValues)) {
    const variable = figma.variables.createVariable(name, spacingCollection, "FLOAT");
    variable.resolvedType = "FLOAT";
    variable.valuesByMode = { [spacingModeId]: value };
    spacingVars[name] = variable;
  }
  
  // BorderRadius Variables
  const radiusCollection = figma.variables.createVariableCollection("borderRadius");
  const radiusModeId = radiusCollection.modes[0].modeId;
  
  const radiusVars = {};
  const radiusValues = { "sm": 4, "md": 8, "lg": 12, "xl": 16 };
  for (const [name, value] of Object.entries(radiusValues)) {
    const variable = figma.variables.createVariable(name, radiusCollection, "FLOAT");
    variable.resolvedType = "FLOAT";
    variable.valuesByMode = { [radiusModeId]: value };
    radiusVars[name] = variable;
  }
  
  // FontSize Variables
  const fontCollection = figma.variables.createVariableCollection("fontSize");
  const fontModeId = fontCollection.modes[0].modeId;
  
  const fontVars = {};
  const fontValues = {
    "caption": 12, "body-sm": 14, "body": 16, "h4": 18, "h3": 20, "h2": 24, "h1": 32
  };
  for (const [name, value] of Object.entries(fontValues)) {
    const variable = figma.variables.createVariable(name, fontCollection, "FLOAT");
    variable.resolvedType = "FLOAT";
    variable.valuesByMode = { [fontModeId]: value };
    fontVars[name] = variable;
  }
  
  return {
    colors: colorVars,
    spacing: spacingVars,
    borderRadius: radiusVars,
    fontSize: fontVars
  };
}

// ============================================================
// 2. createComponents(vars) — 创建核心组件
// ============================================================
function createComponents(vars) {
  const components = {};
  
  // --- Button Component ---
  const buttonFrame = figma.createFrame();
  buttonFrame.name = "Button";
  buttonFrame.layoutMode = "HORIZONTAL";
  buttonFrame.counterAxisSizingMode = "AUTO";
  buttonFrame.primaryAxisSizingMode = "AUTO";
  buttonFrame.paddingLeft = 16;
  buttonFrame.paddingRight = 16;
  buttonFrame.paddingTop = 10;
  buttonFrame.paddingBottom = 10;
  buttonFrame.itemSpacing = 8;
  buttonFrame.counterAxisAlignItems = "CENTER";
  buttonFrame.cornerRadius = getVariableValue(vars.borderRadius.md);
  
  const buttonText = figma.createText();
  buttonText.fontSize = getVariableValue(vars.fontSize["body-sm"]);
  buttonText.fontName = { family: "Inter", style: "Medium" };
  buttonText.characters = "按钮";
  buttonFrame.appendChild(buttonText);
  
  components.Button = buttonFrame;
  components.ButtonText = buttonText;
  
  // --- StoryCard Component ---
  const cardFrame = figma.createFrame();
  cardFrame.name = "StoryCard";
  cardFrame.layoutMode = "VERTICAL";
  cardFrame.paddingLeft = 24;
  cardFrame.paddingRight = 24;
  cardFrame.paddingTop = 24;
  cardFrame.paddingBottom = 24;
  cardFrame.itemSpacing = 12;
  cardFrame.counterAxisAlignItems = "FILL";
  cardFrame.cornerRadius = getVariableValue(vars.borderRadius.lg);
  cardFrame.fills = [{ type: "SOLID", color: vars.colors["neutral/0"].valuesByMode[Object.keys(vars.colors["neutral/0"].valuesByMode)[0]] }];
  cardFrame.effects = [{ type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.06 }, offset: { x: 0, y: 1 }, blur: 3, spread: 0 }];
  
  // Top accent gradient line
  const accentLine = figma.createRectangle();
  accentLine.name = "AccentLine";
  accentLine.width = { type: "FILL", containerWidth: cardFrame.width };
  accentLine.height = 2;
  accentLine.layoutAlign = "STRETCH";
  accentLine.cornerRadius = { type: "LAYER", radius: 0 };
  accentLine.fills = [{ type: "GRADIENT_LINEAR", gradientStops: [
    { color: { r: 0.486, g: 0.361, b: 0.988, a: 1 }, position: 0 },
    { color: { r: 0.788, g: 0.596, b: 0.290, a: 1 }, position: 1 }
  ], gradientTransform: [[1, 0, 0], [0, 1, 0]] }];
  
  const cardContent = figma.createFrame();
  cardContent.name = "CardContent";
  cardContent.layoutMode = "VERTICAL";
  cardContent.itemSpacing = 8;
  cardContent.counterAxisAlignItems = "FILL";
  
  cardFrame.appendChild(accentLine);
  cardFrame.appendChild(cardContent);
  
  components.StoryCard = cardFrame;
  
  // --- StatusTag Component ---
  const statusTag = figma.createFrame();
  statusTag.name = "StatusTag";
  statusTag.layoutMode = "HORIZONTAL";
  statusTag.counterAxisSizingMode = "AUTO";
  statusTag.paddingLeft = 8;
  statusTag.paddingRight = 8;
  statusTag.paddingTop = 4;
  statusTag.paddingBottom = 4;
  statusTag.cornerRadius = 4;
  statusTag.itemSpacing = 4;
  
  const statusText = figma.createText();
  statusText.fontSize = getVariableValue(vars.fontSize.caption);
  statusText.fontName = { family: "Inter", style: "Medium" };
  statusText.characters = "进行中";
  statusTag.appendChild(statusText);
  
  components.StatusTag = statusTag;
  components.StatusText = statusText;
  
  // --- SidebarItem Component ---
  const sidebarItem = figma.createFrame();
  sidebarItem.name = "SidebarItem";
  sidebarItem.layoutMode = "HORIZONTAL";
  sidebarItem.counterAxisSizingMode = "AUTO";
  sidebarItem.primaryAxisSizingMode = "FIXED";
  sidebarItem.width = { type: "FIXED", value: 220 };
  sidebarItem.height = 40;
  sidebarItem.itemSpacing = 12;
  sidebarItem.paddingLeft = 16;
  sidebarItem.paddingRight = 16;
  sidebarItem.counterAxisAlignItems = "CENTER";
  
  const menuIcon = figma.createText();
  menuIcon.name = "MenuIcon";
  menuIcon.fontSize = 16;
  menuIcon.characters = "📖";
  sidebarItem.appendChild(menuIcon);
  
  const menuText = figma.createText();
  menuText.name = "MenuText";
  menuText.fontSize = getVariableValue(vars.fontSize["body-sm"]);
  menuText.fontName = { family: "Inter", style: "Regular" };
  menuText.characters = "我的故事";
  sidebarItem.appendChild(menuText);
  
  components.SidebarItem = sidebarItem;
  components.MenuIcon = menuIcon;
  components.MenuText = menuText;
  
  return components;
}

// ============================================================
// 3. createPage(vars, comps) — 创建页面布局
// ============================================================
function createPage(vars, comps) {
  // Main Page Frame
  const pageFrame = figma.createFrame();
  pageFrame.name = "故事列表 - 1440px";
  pageFrame.layoutMode = "HORIZONTAL";
  pageFrame.width = 1440;
  pageFrame.height = 900;
  pageFrame.counterAxisAlignItems = "MIN";
  pageFrame.itemSpacing = 0;
  pageFrame.clipsContent = false;
  
  // --- Sidebar ---
  const sidebar = figma.createFrame();
  sidebar.name = "Sidebar";
  sidebar.layoutMode = "VERTICAL";
  sidebar.width = 220;
  sidebar.height = 900;
  sidebar.fills = [{ type: "SOLID", color: vars.colors["surface/sidebar"].valuesByMode[Object.keys(vars.colors["surface/sidebar"].valuesByMode)[0]] }];
  sidebar.paddingLeft = 0;
  sidebar.paddingRight = 0;
  sidebar.paddingTop = 0;
  sidebar.paddingBottom = 0;
  sidebar.itemSpacing = 0;
  sidebar.cornerRadius = 0;
  sidebar.strokes = [{ type: "SOLID", color: vars.colors["neutral/3"].valuesByMode[Object.keys(vars.colors["neutral/3"].valuesByMode)[0]] }];
  sidebar.strokeWeight = 1;
  
  // Logo Area
  const logoFrame = figma.createFrame();
  logoFrame.name = "LogoArea";
  logoFrame.layoutMode = "VERTICAL";
  logoFrame.width = 220;
  logoFrame.height = 80;
  logoFrame.paddingLeft = 20;
  logoFrame.paddingRight = 20;
  logoFrame.paddingTop = 20;
  logoFrame.paddingBottom = 20;
  logoFrame.itemSpacing = 0;
  
  const logoText = figma.createText();
  logoText.name = "Logo";
  logoText.fontSize = 24;
  logoText.fontName = { family: "Inter", style: "Bold" };
  logoText.characters = "戏境";
  logoText.fills = [{ type: "SOLID", color: vars.colors.primary.valuesByMode[Object.keys(vars.colors.primary.valuesByMode)[0]] }];
  logoFrame.appendChild(logoText);
  
  // Menu Items Container
  const menuContainer = figma.createFrame();
  menuContainer.name = "MenuContainer";
  menuContainer.layoutMode = "VERTICAL";
  menuContainer.paddingLeft = 0;
  menuContainer.paddingRight = 0;
  menuContainer.paddingTop = 16;
  menuContainer.paddingBottom = 16;
  menuContainer.itemSpacing = 4;
  menuContainer.counterAxisAlignItems = "FILL";
  
  // Menu Item - Selected State (我的故事)
  const menuItem1 = createSidebarItem(vars, "📖", "我的故事", true);
  const menuItem2 = createSidebarItem(vars, "✨", "世界观工坊", false);
  const menuItem3 = createSidebarItem(vars, "⚙️", "API配置", false);
  const menuItem4 = createSidebarItem(vars, "👤", "个人中心", false);
  
  menuContainer.appendChild(menuItem1);
  menuContainer.appendChild(menuItem2);
  menuContainer.appendChild(menuItem3);
  menuContainer.appendChild(menuItem4);
  
  // Bottom User Area
  const userArea = figma.createFrame();
  userArea.name = "UserArea";
  userArea.layoutMode = "HORIZONTAL";
  userArea.width = 220;
  userArea.height = 64;
  userArea.paddingLeft = 16;
  userArea.paddingRight = 16;
  userArea.paddingTop = 12;
  userArea.paddingBottom = 12;
  userArea.itemSpacing = 12;
  userArea.counterAxisAlignItems = "CENTER";
  
  const userAvatar = figma.createEllipse();
  userAvatar.name = "UserAvatar";
  userAvatar.width = 40;
  userAvatar.height = 40;
  userAvatar.fills = [{ type: "SOLID", color: vars.colors["primary"].valuesByMode[Object.keys(vars.colors["primary"].valuesByMode)[0]] }];
  
  const userName = figma.createText();
  userName.name = "UserName";
  userName.fontSize = getVariableValue(vars.fontSize["body-sm"]);
  userName.fontName = { family: "Inter", style: "Medium" };
  userName.characters = "林夜";
  
  userArea.appendChild(userAvatar);
  userArea.appendChild(userName);
  
  sidebar.appendChild(logoFrame);
  sidebar.appendChild(menuContainer);
  sidebar.appendChild(userArea);
  
  // --- Main Content Area ---
  const mainArea = figma.createFrame();
  mainArea.name = "MainArea";
  mainArea.layoutMode = "VERTICAL";
  mainArea.width = 1220;
  mainArea.height = 900;
  mainArea.fills = [{ type: "SOLID", color: vars.colors["surface/page"].valuesByMode[Object.keys(vars.colors["surface/page"].valuesByMode)[0]] }];
  mainArea.itemSpacing = 0;
  mainArea.paddingLeft = 0;
  mainArea.paddingRight = 0;
  mainArea.paddingTop = 0;
  mainArea.paddingBottom = 0;
  
  // TopBar
  const topBar = figma.createFrame();
  topBar.name = "TopBar";
  topBar.layoutMode = "HORIZONTAL";
  topBar.width = 1220;
  topBar.height = 56;
  topBar.fills = [{ type: "SOLID", color: vars.colors["neutral/0"].valuesByMode[Object.keys(vars.colors["neutral/0"].valuesByMode)[0]] }];
  topBar.paddingLeft = 24;
  topBar.paddingRight = 24;
  topBar.paddingTop = 0;
  topBar.paddingBottom = 0;
  topBar.itemSpacing = 8;
  topBar.counterAxisAlignItems = "CENTER";
  topBar.strokes = [{ type: "SOLID", color: vars.colors["neutral/3"].valuesByMode[Object.keys(vars.colors["neutral/3"].valuesByMode)[0]] }];
  topBar.strokeWeight = 1;
  
  const breadcrumb = figma.createText();
  breadcrumb.name = "Breadcrumb";
  breadcrumb.fontSize = getVariableValue(vars.fontSize["body-sm"]);
  breadcrumb.fontName = { family: "Inter", style: "Regular" };
  breadcrumb.characters = "我的故事";
  breadcrumb.fills = [{ type: "SOLID", color: vars.colors["neutral/7"].valuesByMode[Object.keys(vars.colors["neutral/7"].valuesByMode)[0]] }];
  topBar.appendChild(breadcrumb);
  
  // Content Area
  const contentArea = figma.createFrame();
  contentArea.name = "ContentArea";
  contentArea.layoutMode = "VERTICAL";
  contentArea.width = 1220;
  contentArea.height = 844;
  contentArea.paddingLeft = 24;
  contentArea.paddingRight = 24;
  contentArea.paddingTop = 24;
  contentArea.paddingBottom = 24;
  contentArea.itemSpacing = 24;
  
  // Title Row
  const titleRow = figma.createFrame();
  titleRow.name = "TitleRow";
  titleRow.layoutMode = "HORIZONTAL";
  titleRow.width = 1172;
  titleRow.height = 48;
  titleRow.itemSpacing = 16;
  titleRow.counterAxisAlignItems = "CENTER";
  
  const pageTitle = figma.createText();
  pageTitle.name = "PageTitle";
  pageTitle.fontSize = getVariableValue(vars.fontSize.h1);
  pageTitle.fontName = { family: "Inter", style: "Semibold" };
  pageTitle.characters = "我的故事";
  pageTitle.fills = [{ type: "SOLID", color: vars.colors["neutral/8"].valuesByMode[Object.keys(vars.colors["neutral/8"].valuesByMode)[0]] }];
  
  const newStoryBtn = createButton(vars, "新建故事", "primary");
  titleRow.appendChild(pageTitle);
  titleRow.appendChild(newStoryBtn);
  
  // Section: 进行中 (2)
  const inProgressSection = createSection(vars, "进行中 (2)");
  const inProgressCards = figma.createFrame();
  inProgressCards.name = "InProgressCards";
  inProgressCards.layoutMode = "HORIZONTAL";
  inProgressCards.itemSpacing = 16;
  inProgressCards.counterAxisAlignItems = "MIN";
  
  const card1 = createStoryCard(vars, "暗影编年", "进行中", "第3章/共8章", "DeepSeek", "3小时前", "继续", "删除");
  const card2 = createStoryCard(vars, "星海迷途", "进行中", "第7章/共10章", "文心4.5", "昨天", "继续", null);
  inProgressCards.appendChild(card1);
  inProgressCards.appendChild(card2);
  inProgressSection.appendChild(inProgressCards);
  
  // Section: 已完成 (1)
  const completedSection = createSection(vars, "已完成 (1)");
  const completedCards = figma.createFrame();
  completedCards.name = "CompletedCards";
  completedCards.layoutMode = "HORIZONTAL";
  completedCards.itemSpacing = 16;
  completedCards.counterAxisAlignItems = "MIN";
  
  const card3 = createStoryCard(vars, "旧日回响", "已完成", "共12章", "", "", "导出", "删除");
  completedCards.appendChild(card3);
  completedSection.appendChild(completedCards);
  
  contentArea.appendChild(titleRow);
  contentArea.appendChild(inProgressSection);
  contentArea.appendChild(completedSection);
  
  mainArea.appendChild(topBar);
  mainArea.appendChild(contentArea);
  
  pageFrame.appendChild(sidebar);
  pageFrame.appendChild(mainArea);
  
  figma.currentPage.appendChild(pageFrame);
  
  return pageFrame;
}

// ============================================================
// Helper Functions
// ============================================================
function getVariableValue(variable) {
  const modeKey = Object.keys(variable.valuesByMode)[0];
  return variable.valuesByMode[modeKey];
}

function createSidebarItem(vars, icon, text, isSelected) {
  const item = figma.createFrame();
  item.name = `MenuItem_${text}`;
  item.layoutMode = "HORIZONTAL";
  item.width = 220;
  item.height = 40;
  item.itemSpacing = 12;
  item.paddingLeft = 16;
  item.paddingRight = 16;
  item.counterAxisAlignItems = "CENTER";
  
  if (isSelected) {
    item.fills = [{ type: "SOLID", color: vars.colors["primary/surface"].valuesByMode[Object.keys(vars.colors["primary/surface"].valuesByMode)[0]] }];
    item.strokes = [{ type: "SOLID", color: vars.colors["primary"].valuesByMode[Object.keys(vars.colors["primary"].valuesByMode)[0]] }];
    item.strokeWeight = 3;
    item.strokeAlign = "OUTER";
    // Override to left side only
    item.dashPattern = [0, 0];
  } else {
    item.fills = [{ type: "SOLID", color: vars.colors["neutral/0"].valuesByMode[Object.keys(vars.colors["neutral/0"].valuesByMode)[0]] }];
  }
  
  const menuIcon = figma.createText();
  menuIcon.fontSize = 16;
  menuIcon.characters = icon;
  
  const menuText = figma.createText();
  menuText.fontSize = getVariableValue(vars.fontSize["body-sm"]);
  menuText.fontName = { family: "Inter", style: isSelected ? "Medium" : "Regular" };
  menuText.characters = text;
  menuText.fills = [{ type: "SOLID", color: isSelected ? 
    vars.colors["primary"].valuesByMode[Object.keys(vars.colors["primary"].valuesByMode)[0]] :
    vars.colors["neutral/6"].valuesByMode[Object.keys(vars.colors["neutral/6"].valuesByMode)[0]]
  }];
  
  item.appendChild(menuIcon);
  item.appendChild(menuText);
  
  return item;
}

function createButton(vars, text, type) {
  const btn = figma.createFrame();
  btn.name = `Button_${text}`;
  btn.layoutMode = "HORIZONTAL";
  btn.counterAxisSizingMode = "AUTO";
  btn.paddingLeft = 16;
  btn.paddingRight = 16;
  btn.paddingTop = 10;
  btn.paddingBottom = 10;
  btn.itemSpacing = 8;
  btn.counterAxisAlignItems = "CENTER";
  btn.cornerRadius = getVariableValue(vars.borderRadius.md);
  
  let bgColor, textColor;
  switch (type) {
    case "primary":
      bgColor = vars.colors["primary"].valuesByMode[Object.keys(vars.colors["primary"].valuesByMode)[0]];
      textColor = vars.colors["neutral/0"].valuesByMode[Object.keys(vars.colors["neutral/0"].valuesByMode)[0]];
      break;
    case "secondary":
      bgColor = vars.colors["secondary"].valuesByMode[Object.keys(vars.colors["secondary"].valuesByMode)[0]];
      textColor = vars.colors["neutral/0"].valuesByMode[Object.keys(vars.colors["neutral/0"].valuesByMode)[0]];
      break;
    case "outline":
      bgColor = vars.colors["neutral/0"].valuesByMode[Object.keys(vars.colors["neutral/0"].valuesByMode)[0]];
      textColor = vars.colors["neutral/6"].valuesByMode[Object.keys(vars.colors["neutral/6"].valuesByMode)[0]];
      btn.strokes = [{ type: "SOLID", color: vars.colors["neutral/3"].valuesByMode[Object.keys(vars.colors["neutral/3"].valuesByMode)[0]] }];
      btn.strokeWeight = 1;
      break;
    case "text":
      bgColor = { type: "SOLID", color: { r: 0, g: 0, b: 0, a: 0 } };
      bgColor = { r: 0, g: 0, b: 0, a: 0 };
      textColor = vars.colors["neutral/5"].valuesByMode[Object.keys(vars.colors["neutral/5"].valuesByMode)[0]];
      break;
    default:
      bgColor = vars.colors["primary"].valuesByMode[Object.keys(vars.colors["primary"].valuesByMode)[0]];
      textColor = vars.colors["neutral/0"].valuesByMode[Object.keys(vars.colors["neutral/0"].valuesByMode)[0]];
  }
  
  btn.fills = [{ type: "SOLID", color: bgColor }];
  
  const btnText = figma.createText();
  btnText.name = "ButtonText";
  btnText.fontSize = getVariableValue(vars.fontSize["body-sm"]);
  btnText.fontName = { family: "Inter", style: "Medium" };
  btnText.characters = text;
  btnText.fills = [{ type: "SOLID", color: textColor }];
  
  btn.appendChild(btnText);
  
  return btn;
}

function createSection(vars, title) {
  const section = figma.createFrame();
  section.name = `Section_${title}`;
  section.layoutMode = "VERTICAL";
  section.width = 1172;
  section.itemSpacing = 16;
  section.counterAxisAlignItems = "FILL";
  
  const sectionTitle = figma.createText();
  sectionTitle.name = "SectionTitle";
  sectionTitle.fontSize = getVariableValue(vars.fontSize.body);
  sectionTitle.fontName = { family: "Inter", style: "Medium" };
  sectionTitle.characters = title;
  sectionTitle.fills = [{ type: "SOLID", color: vars.colors["neutral/7"].valuesByMode[Object.keys(vars.colors["neutral/7"].valuesByMode)[0]] }];
  
  section.appendChild(sectionTitle);
  
  return section;
}

function createStoryCard(vars, title, status, chapter, model, time, primaryBtn, secondaryBtn) {
  const card = figma.createFrame();
  card.name = `StoryCard_${title}`;
  card.layoutMode = "VERTICAL";
  card.width = 372;
  card.itemSpacing = 12;
  card.counterAxisAlignItems = "FILL";
  card.cornerRadius = getVariableValue(vars.borderRadius.lg);
  card.fills = [{ type: "SOLID", color: vars.colors["neutral/0"].valuesByMode[Object.keys(vars.colors["neutral/0"].valuesByMode)[0]] }];
  card.effects = [{ type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.06 }, offset: { x: 0, y: 1 }, blur: 3, spread: 0 }];
  card.paddingLeft = 24;
  card.paddingRight = 24;
  card.paddingTop = 24;
  card.paddingBottom = 24;
  
  // Top accent line
  const accentLine = figma.createRectangle();
  accentLine.name = "AccentLine";
  accentLine.width = 324;
  accentLine.height = 2;
  accentLine.cornerRadius = 1;
  accentLine.layoutAlign = "STRETCH";
  accentLine.fills = [{ type: "GRADIENT_LINEAR", gradientStops: [
    { color: { r: 0.486, g: 0.361, b: 0.988, a: 1 }, position: 0 },
    { color: { r: 0.788, g: 0.596, b: 0.290, a: 1 }, position: 1 }
  ], gradientTransform: [[1, 0, 0], [0, 1, 0]] }];
  
  // Content row
  const contentRow = figma.createFrame();
  contentRow.name = "ContentRow";
  contentRow.layoutMode = "VERTICAL";
  contentRow.itemSpacing = 8;
  contentRow.counterAxisAlignItems = "FILL";
  
  // Top row: Status tag + Chapter info
  const topRow = figma.createFrame();
  topRow.name = "TopRow";
  topRow.layoutMode = "HORIZONTAL";
  topRow.itemSpacing = 8;
  topRow.counterAxisAlignItems = "CENTER";
  
  // Status tag
  const tag = figma.createFrame();
  tag.name = "StatusTag";
  tag.layoutMode = "HORIZONTAL";
  tag.counterAxisSizingMode = "AUTO";
  tag.paddingLeft = 8;
  tag.paddingRight = 8;
  tag.paddingTop = 4;
  tag.paddingBottom = 4;
  tag.cornerRadius = 4;
  
  if (status === "进行中") {
    tag.fills = [{ type: "SOLID", color: vars.colors["primary/surface"].valuesByMode[Object.keys(vars.colors["primary/surface"].valuesByMode)[0]] }];
  } else {
    tag.fills = [{ type: "SOLID", color: vars.colors["secondary/surface"].valuesByMode[Object.keys(vars.colors["secondary/surface"].valuesByMode)[0]] }];
  }
  
  const tagText = figma.createText();
  tagText.fontSize = getVariableValue(vars.fontSize.caption);
  tagText.fontName = { family: "Inter", style: "Medium" };
  tagText.characters = status;
  if (status === "进行中") {
    tagText.fills = [{ type: "SOLID", color: vars.colors["primary"].valuesByMode[Object.keys(vars.colors["primary"].valuesByMode)[0]] }];
  } else {
    tagText.fills = [{ type: "SOLID", color: vars.colors["secondary/dark"].valuesByMode[Object.keys(vars.colors["secondary/dark"].valuesByMode)[0]] }];
  }
  tag.appendChild(tagText);
  
  topRow.appendChild(tag);
  
  // Story title
  const storyTitle = figma.createText();
  storyTitle.name = "StoryTitle";
  storyTitle.fontSize = getVariableValue(vars.fontSize.h3);
  storyTitle.fontName = { family: "Inter", style: "Semibold" };
  storyTitle.characters = title;
  storyTitle.fills = [{ type: "SOLID", color: vars.colors["neutral/8"].valuesByMode[Object.keys(vars.colors["neutral/8"].valuesByMode)[0]] }];
  
  // Meta info
  const metaRow = figma.createFrame();
  metaRow.name = "MetaRow";
  metaRow.layoutMode = "HORIZONTAL";
  metaRow.itemSpacing = 8;
  metaRow.counterAxisAlignItems = "CENTER";
  
  const chapterText = figma.createText();
  chapterText.fontSize = getVariableValue(vars.fontSize["body-sm"]);
  chapterText.fontName = { family: "Inter", style: "Regular" };
  chapterText.characters = chapter;
  chapterText.fills = [{ type: "SOLID", color: vars.colors["neutral/6"].valuesByMode[Object.keys(vars.colors["neutral/6"].valuesByMode)[0]] }];
  metaRow.appendChild(chapterText);
  
  if (model) {
    const modelText = figma.createText();
    modelText.fontSize = getVariableValue(vars.fontSize.caption);
    modelText.fontName = { family: "Inter", style: "Regular" };
    modelText.characters = model;
    modelText.fills = [{ type: "SOLID", color: vars.colors["neutral/5"].valuesByMode[Object.keys(vars.colors["neutral/5"].valuesByMode)[0]] }];
    metaRow.appendChild(modelText);
  }
  
  if (time) {
    const timeText = figma.createText();
    timeText.fontSize = getVariableValue(vars.fontSize.caption);
    timeText.fontName = { family: "Inter", style: "Regular" };
    timeText.characters = time;
    timeText.fills = [{ type: "SOLID", color: vars.colors["neutral/5"].valuesByMode[Object.keys(vars.colors["neutral/5"].valuesByMode)[0]] }];
    metaRow.appendChild(timeText);
  }
  
  // Button row
  const btnRow = figma.createFrame();
  btnRow.name = "ButtonRow";
  btnRow.layoutMode = "HORIZONTAL";
  btnRow.itemSpacing = 12;
  btnRow.counterAxisAlignItems = "CENTER";
  
  const primary = primaryBtn === "继续" ? createButton(vars, primaryBtn, "secondary") : createButton(vars, primaryBtn, "primary");
  btnRow.appendChild(primary);
  
  if (secondaryBtn) {
    const secondary = createButton(vars, secondaryBtn, "text");
    btnRow.appendChild(secondary);
  }
  
  contentRow.appendChild(topRow);
  contentRow.appendChild(storyTitle);
  contentRow.appendChild(metaRow);
  contentRow.appendChild(btnRow);
  
  card.appendChild(accentLine);
  card.appendChild(contentRow);
  
  return card;
}

// ============================================================
// 4. main() — 主入口
// ============================================================
function main() {
  try {
    // Create variables
    const vars = createVariables();
    
    // Create components
    const comps = createComponents(vars);
    
    // Create page
    const page = createPage(vars, comps);
    
    // Select and zoom to the created frame
    figma.currentPage.selection = [page];
    figma.viewport.scrollAndZoomIntoView([page]);
    
    figma.notify("✅ 故事列表页面生成完成！");
  } catch (error) {
    console.error("Error:", error);
    figma.notify("❌ 生成失败: " + error.message, { error: true });
  }
}

main();

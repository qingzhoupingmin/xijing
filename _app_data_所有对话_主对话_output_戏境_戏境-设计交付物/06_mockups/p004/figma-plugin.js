// p004 故事演绎 - Figma Plugin 脚本
// 生成高保真故事演绎页面设计

const { figma } = require('figma-api');

// ==================== 设计变量定义 ====================
const designTokens = {
  colors: {
    primary: { r: 0.486, g: 0.361, b: 0.988, a: 1 },        // #7C5CFC
    'primary/dark': { r: 0.388, g: 0.267, b: 0.878, a: 1 },
    secondary: { r: 0.788, g: 0.596, b: 0.290, a: 1 },     // #C9984A
    'neutral/0': { r: 1, g: 1, b: 1, a: 1 },                // #FFFFFF
    'neutral/1': { r: 0.976, g: 0.980, b: 0.984, a: 1 },   // #F9FAFB
    'neutral/3': { r: 0.898, g: 0.906, b: 0.922, a: 1 },    // #E5E7EB
    'neutral/6': { r: 0.420, g: 0.447, b: 0.502, a: 1 },    // #6B7280
    'neutral/7': { r: 0.216, g: 0.255, b: 0.318, a: 1 },    // #374151
    'neutral/8': { r: 0.122, g: 0.161, b: 0.216, a: 1 },    // #1F2937
    'primary/surface': { r: 0.961, g: 0.953, b: 1, a: 1 }   // #F5F3FF
  },
  spacing: {
    xs: 4,
    sm: 8,
    base: 16,
    md: 24,
    lg: 32,
    xl: 48
  },
  radius: {
    sm: 8,
    md: 12
  },
  fontSize: {
    caption: 12,
    body_sm: 14,
    body: 16,
    h2: 24
  }
};

// ==================== 工具函数 ====================
function hexToFigmaColor(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255,
    a: 1
  } : null;
}

function createFills(color) {
  return [{ type: 'SOLID', color: color }];
}

function createEffect(color = '#000000', opacity = 0.06) {
  return {
    type: 'DROP_SHADOW',
    color: { ...hexToFigmaColor(color), a: opacity },
    offset: { x: 0, y: 1 },
    radius: 3,
    visible: true,
    blendMode: 'NORMAL'
  };
}

// ==================== 组件创建函数 ====================

// 创建侧栏导航
function createSidebar(parent) {
  const sidebar = figma.createFrame();
  sidebar.name = 'Sidebar';
  sidebar.resize(64, figma.viewport.height);
  sidebar.backgrounds = createFills(designTokens.colors['neutral/0']);
  sidebar.layoutMode = 'VERTICAL';
  sidebar.paddingLeft = 20;
  sidebar.paddingRight = 20;
  sidebar.paddingTop = 24;
  sidebar.itemSpacing = 24;
  sidebar.verticalAlignItems = 'CENTER';
  sidebar.parent = parent;
  
  // 导航图标
  const icons = ['📖', '✨', '⚙️', '👤'];
  icons.forEach((icon, index) => {
    const iconFrame = figma.createFrame();
    iconFrame.name = `NavIcon_${index + 1}`;
    iconFrame.resize(40, 40);
    iconFrame.cornerRadius = 12;
    iconFrame.backgrounds = index === 0 
      ? createFills(designTokens.colors['primary/surface'])
      : createFills({ r: 1, g: 1, b: 1, a: 0 });
    iconFrame.layoutMode = 'HORIZONTAL';
    iconFrame.horizontalAlignItems = 'CENTER';
    iconFrame.verticalAlignItems = 'CENTER';
    iconFrame.parent = sidebar;
    
    const iconText = figma.createText();
    iconText.characters = icon;
    iconText.fontSize = 20;
    iconText.textAlignHorizontal = 'CENTER';
    iconText.parent = iconFrame;
  });
  
  return sidebar;
}

// 创建顶栏
function createTopbar(parent) {
  const topbar = figma.createFrame();
  topbar.name = 'TopBar';
  topbar.resize(figma.viewport.width, 56);
  topbar.backgrounds = createFills(designTokens.colors['neutral/0']);
  topbar.layoutMode = 'HORIZONTAL';
  topbar.paddingLeft = 24;
  topbar.paddingRight = 24;
  topbar.horizontalAlignItems = 'CENTER';
  topbar.stroke = createFills(designTokens.colors['neutral/3']);
  topbar.strokeWeight = 1;
  topbar.parent = parent;
  
  // 折叠按钮
  const collapseBtn = figma.createText();
  collapseBtn.characters = '☰';
  collapseBtn.fontSize = 20;
  collapseBtn.fill = createFills(designTokens.colors['neutral/6']);
  collapseBtn.parent = topbar;
  
  // 面包屑
  const breadcrumb = figma.createText();
  breadcrumb.characters = '我的故事 > 暗影编年';
  breadcrumb.fontSize = 14;
  breadcrumb.fill = createFills(designTokens.colors['neutral/6']);
  breadcrumb.marginLeft = 16;
  breadcrumb.parent = topbar;
  
  // 右侧容器
  const rightContainer = figma.createFrame();
  rightContainer.name = 'TopBarRight';
  rightContainer.layoutMode = 'HORIZONTAL';
  rightContainer.itemSpacing = 12;
  rightContainer.marginLeft = 'AUTO';
  rightContainer.parent = topbar;
  
  // 模型选择器
  const modelSelector = figma.createFrame();
  modelSelector.name = 'ModelSelector';
  modelSelector.resize(160, 32);
  modelSelector.backgrounds = createFills(designTokens.colors['neutral/0']);
  modelSelector.stroke = createFills(designTokens.colors['neutral/3']);
  modelSelector.strokeWeight = 1;
  modelSelector.cornerRadius = 8;
  modelSelector.layoutMode = 'HORIZONTAL';
  modelSelector.horizontalAlignItems = 'CENTER';
  modelSelector.paddingLeft = 12;
  modelSelector.parent = rightContainer;
  
  const modelText = figma.createText();
  modelText.characters = 'DeepSeek ▾';
  modelText.fontSize = 14;
  modelText.fill = createFills(designTokens.colors['neutral/6']);
  modelText.parent = modelSelector;
  
  // 生成章节按钮
  const genBtn = figma.createFrame();
  genBtn.name = 'PrimaryButton';
  genBtn.resize(100, 28);
  genBtn.backgrounds = createFills(designTokens.colors.primary);
  genBtn.cornerRadius = 8;
  genBtn.layoutMode = 'HORIZONTAL';
  genBtn.horizontalAlignItems = 'CENTER';
  genBtn.verticalAlignItems = 'CENTER';
  genBtn.parent = rightContainer;
  
  const genBtnText = figma.createText();
  genBtnText.characters = '生成章节';
  genBtnText.fontSize = 13;
  genBtnText.fill = createFills(designTokens.colors['neutral/0']);
  genBtnText.fontWeight = 500;
  genBtnText.parent = genBtn;
  
  return topbar;
}

// 创建标签页
function createTabBar(parent) {
  const tabBar = figma.createFrame();
  tabBar.name = 'TabBar';
  tabBar.resize(720, 48);
  tabBar.backgrounds = createFills({ r: 1, g: 1, b: 1, a: 0 });
  tabBar.layoutMode = 'HORIZONTAL';
  tabBar.itemSpacing = 32;
  tabBar.parent = parent;
  
  // 阅读标签
  const readTab = figma.createFrame();
  readTab.name = 'Tab_Read_Active';
  readTab.resize(80, 48);
  readTab.backgrounds = createFills({ r: 1, g: 1, b: 1, a: 0 });
  readTab.layoutMode = 'VERTICAL';
  readTab.verticalAlignItems = 'CENTER';
  readTab.parent = tabBar;
  
  const readTabText = figma.createText();
  readTabText.characters = '📖 阅读';
  readTabText.fontSize = 14;
  readTabText.fill = createFills(designTokens.colors.primary);
  readTabText.parent = readTab;
  
  // 底部下划线
  const readUnderline = figma.createRectangle();
  readUnderline.name = 'TabUnderline';
  readUnderline.resize(64, 2);
  readUnderline.fill = createFills(designTokens.colors.primary);
  readUnderline.y = 42;
  readUnderline.parent = readTab;
  
  // 回看标签
  const reviewTab = figma.createFrame();
  reviewTab.name = 'Tab_Review';
  reviewTab.resize(80, 48);
  reviewTab.backgrounds = createFills({ r: 1, g: 1, b: 1, a: 0 });
  reviewTab.layoutMode = 'VERTICAL';
  reviewTab.verticalAlignItems = 'CENTER';
  reviewTab.parent = tabBar;
  
  const reviewTabText = figma.createText();
  reviewTabText.characters = '📚 回看';
  reviewTabText.fontSize = 14;
  reviewTabText.fill = createFills(designTokens.colors['neutral/6']);
  reviewTabText.parent = reviewTab;
  
  return tabBar;
}

// 创建阅读卡片
function createReadingCard(parent) {
  const card = figma.createFrame();
  card.name = 'ReadingCard';
  card.resize(720, 400);
  card.backgrounds = createFills(designTokens.colors['neutral/0']);
  card.cornerRadius = 12;
  card.effects = [createEffect()];
  card.layoutMode = 'VERTICAL';
  card.paddingLeft = 32;
  card.paddingRight = 32;
  card.paddingTop = 48;
  card.paddingBottom = 48;
  card.itemSpacing = 24;
  card.parent = parent;
  
  // 章节标题
  const chapterTitle = figma.createText();
  chapterTitle.name = 'ChapterTitle';
  chapterTitle.characters = '第三章 暗潮涌动';
  chapterTitle.fontSize = 24;
  chapterTitle.fontWeight = 600;
  chapterTitle.fill = createFills(designTokens.colors['neutral/8']);
  chapterTitle.parent = card;
  
  // 章节进度
  const chapterProgress = figma.createText();
  chapterProgress.characters = '第3章 / 共8章';
  chapterProgress.fontSize = 12;
  chapterProgress.fill = createFills(designTokens.colors['neutral/6']);
  chapterProgress.parent = card;
  
  // 正文段落1
  const para1 = figma.createText();
  para1.name = 'Paragraph1';
  para1.characters = '夜色如墨，浓得化不开。陈默站在老宅的廊檐下，注视着庭院中那棵枯死的古槐。月光透过枝桠洒下斑驳的影子，像是无数双眼睛在暗中窥视。\n\n他已经在这里等了整整三个时辰。';
  para1.fontSize = 16;
  para1.lineHeight = { value: 180, unit: 'PERCENT' };
  para1.fill = createFills(designTokens.colors['neutral/7']);
  para1.parent = card;
  
  return card;
}

// 创建决策区面板
function createDecisionPanel(parent) {
  const panel = figma.createFrame();
  panel.name = 'DecisionPanel';
  panel.resize(720, 200);
  panel.backgrounds = createFills(designTokens.colors['neutral/0']);
  panel.cornerRadius = 12;
  panel.effects = [createEffect()];
  panel.layoutMode = 'VERTICAL';
  panel.paddingLeft = 24;
  panel.paddingRight = 24;
  panel.paddingTop = 24;
  panel.paddingBottom = 24;
  panel.itemSpacing = 16;
  
  // 顶部渐变边框效果（用矩形模拟）
  const gradientBorder = figma.createRectangle();
  gradientBorder.name = 'GradientBorder';
  gradientBorder.resize(720, 2);
  gradientBorder.fill = createFills(designTokens.colors.primary);
  gradientBorder.y = -12;
  gradientBorder.cornerRadius = { topLeft: 12, topRight: 12 };
  gradientBorder.parent = panel;
  
  // 局势描述
  const situation = figma.createText();
  situation.name = 'Situation';
  situation.characters = '当前局势：你已潜入敌人的据点，但身份随时可能暴露。前方传来脚步声，你必须立即做出决定。';
  situation.fontSize = 14;
  situation.fontStyle = 'ITALIC';
  situation.fill = createFills(designTokens.colors.secondary);
  situation.parent = panel;
  
  // Textarea 容器
  const textareaFrame = figma.createFrame();
  textareaFrame.name = 'Textarea';
  textareaFrame.resize(672, 80);
  textareaFrame.backgrounds = createFills(designTokens.colors['neutral/0']);
  textareaFrame.stroke = createFills(designTokens.colors['neutral/3']);
  textareaFrame.strokeWeight = 1;
  textareaFrame.cornerRadius = 8;
  textareaFrame.layoutMode = 'HORIZONTAL';
  textareaFrame.horizontalAlignItems = 'CENTER';
  textareaFrame.paddingLeft = 12;
  textareaFrame.parent = panel;
  
  const textareaPlaceholder = figma.createText();
  textareaPlaceholder.characters = '输入你的行动...';
  textareaPlaceholder.fontSize = 14;
  textareaPlaceholder.fill = createFills(designTokens.colors['neutral/6']);
  textareaPlaceholder.parent = textareaFrame;
  
  // 按钮容器
  const btnContainer = figma.createFrame();
  btnContainer.name = 'ButtonContainer';
  btnContainer.layoutMode = 'HORIZONTAL';
  btnContainer.horizontalAlignItems = 'END';
  btnContainer.itemSpacing = 12;
  btnContainer.parent = panel;
  
  // 提交决策按钮
  const submitBtn = figma.createFrame();
  submitBtn.name = 'GoldButton';
  submitBtn.resize(120, 36);
  submitBtn.backgrounds = createFills(designTokens.colors.secondary);
  submitBtn.cornerRadius = 8;
  submitBtn.layoutMode = 'HORIZONTAL';
  submitBtn.horizontalAlignItems = 'CENTER';
  submitBtn.verticalAlignItems = 'CENTER';
  submitBtn.parent = btnContainer;
  
  const submitBtnText = figma.createText();
  submitBtnText.characters = '提交决策';
  submitBtnText.fontSize = 14;
  submitBtnText.fontWeight = 500;
  submitBtnText.fill = createFills(designTokens.colors['neutral/0']);
  submitBtnText.parent = submitBtn;
  
  panel.parent = parent;
  return panel;
}

// ==================== 主函数 ====================
async function createP004Design() {
  // 创建页面
  const page = figma.createPage();
  page.name = 'p004_故事演绎';
  
  // 激活页面
  figma.currentPage = page;
  
  // 创建主画板
  const canvas = figma.createFrame();
  canvas.name = 'p004_StoryReading';
  canvas.resize(1440, 900);
  canvas.backgrounds = createFills(designTokens.colors['neutral/1']);
  canvas.layoutMode = 'VERTICAL';
  
  // 创建顶栏
  createTopbar(canvas);
  
  // 创建侧栏
  createSidebar(canvas);
  
  // 主内容区容器
  const mainContent = figma.createFrame();
  mainContent.name = 'MainContent';
  mainContent.resize(1376, 844);
  mainContent.backgrounds = createFills(designTokens.colors['neutral/1']);
  mainContent.layoutMode = 'VERTICAL';
  mainContent.paddingLeft = 64;
  mainContent.paddingTop = 24;
  mainContent.itemSpacing = 24;
  mainContent.parent = canvas;
  
  // 创建标签页
  createTabBar(mainContent);
  
  // 创建阅读卡片
  createReadingCard(mainContent);
  
  // 创建决策区
  createDecisionPanel(mainContent);
  
  // 底部链接
  const bottomLink = figma.createText();
  bottomLink.characters = '修改后续大纲';
  bottomLink.fontSize = 14;
  bottomLink.fill = createFills(designTokens.colors.primary);
  bottomLink.parent = mainContent;
  
  console.log('p004 故事演绎页面创建完成');
  figma.notify('p004 故事演绎页面设计已生成');
}

// 执行
createP004Design().catch(console.error);


// ==================== 补充状态组件 ====================

// 创建生成中状态（流式输出）
function createGeneratingState(parent) {
  const card = figma.createFrame();
  card.name = 'ReadingCard_Generating';
  card.resize(720, 400);
  card.backgrounds = createFills(designTokens.colors['neutral/0']);
  card.cornerRadius = 12;
  card.effects = [createEffect()];
  card.layoutMode = 'VERTICAL';
  card.paddingLeft = 32;
  card.paddingRight = 32;
  card.paddingTop = 48;
  card.paddingBottom = 48;
  card.itemSpacing = 24;
  card.parent = parent;

  // 进度条（紫金渐变）
  const progressBar = figma.createFrame();
  progressBar.name = 'GeneratingProgress';
  progressBar.resize(720, 3);
  progressBar.backgrounds = createFills(designTokens.colors.primary); // Figma中用渐变覆盖
  progressBar.cornerRadius = 2;
  progressBar.x = 0;
  progressBar.y = -12;
  progressBar.parent = card;

  // 章节标题
  const chapterTitle = figma.createText();
  chapterTitle.name = 'ChapterTitle';
  chapterTitle.characters = '第三章 暗潮涌动';
  chapterTitle.fontSize = 24;
  chapterTitle.fontWeight = 600;
  chapterTitle.fill = createFills(designTokens.colors['neutral/8']);
  chapterTitle.parent = card;

  // 已生成的正文段落
  const para1 = figma.createText();
  para1.name = 'GeneratingParagraph1';
  para1.characters = '夜色如墨，浓得化不开。陈默站在老宅的廊檐下，注视着庭院中那棵枯死的古槐。月光透过枝桠洒下斑驳的影子，像是无数双眼睛在暗中窥视。\n\n他已经在这里等了整整三个时辰。风从东面吹来，带着若有若无的檀香味——这是他约定的信号。';
  para1.fontSize = 16;
  para1.lineHeight = { value: 180, unit: 'PERCENT' };
  para1.fill = createFills(designTokens.colors['neutral/7']);
  para1.parent = card;

  // 正在输入的半截文字 + 闪烁光标
  const generatingLine = figma.createText();
  generatingLine.name = 'GeneratingLine';
  generatingLine.characters = '他缓缓转过身，目光落在...▎';
  generatingLine.fontSize = 16;
  generatingLine.lineHeight = { value: 180, unit: 'PERCENT' };
  generatingLine.fill = createFills(designTokens.colors['neutral/7']);
  generatingLine.parent = card;

  // 生成中文案
  const generatingText = figma.createText();
  generatingText.name = 'GeneratingStatus';
  generatingText.characters = '正在生成中...';
  generatingText.fontSize = 14;
  generatingText.fontWeight = 500;
  generatingText.fill = createFills(designTokens.colors.primary);
  generatingText.parent = card;

  // 注释：生成中状态下决策区隐藏
  const note = figma.createText();
  note.name = 'Note_DecisionHidden';
  note.characters = '⚠️ 生成中状态：决策区隐藏';
  note.fontSize = 12;
  note.fill = createFills(designTokens.colors['neutral/6']);
  note.parent = card;

  return card;
}

// 创建错误状态
function createErrorState(parent) {
  const card = figma.createFrame();
  card.name = 'ReadingCard_Error';
  card.resize(720, 300);
  card.backgrounds = createFills(designTokens.colors['neutral/0']);
  card.cornerRadius = 12;
  card.effects = [createEffect()];
  card.layoutMode = 'VERTICAL';
  card.paddingLeft = 32;
  card.paddingRight = 32;
  card.paddingTop = 48;
  card.paddingBottom = 48;
  card.itemSpacing = 16;
  card.parent = parent;

  // 上一章缩略内容（变淡）
  const prevChapter = figma.createText();
  prevChapter.name = 'PrevChapterPreview';
  prevChapter.characters = '第二章 回声（上一章内容缩略...）';
  prevChapter.fontSize = 14;
  prevChapter.fill = createFills({ r: 0.612, g: 0.635, b: 0.686, a: 1 }); // #9CA3AF
  prevChapter.parent = card;

  // 错误提示卡片
  const errorCard = figma.createFrame();
  errorCard.name = 'ErrorCard';
  errorCard.resize(656, 140);
  errorCard.backgrounds = createFills({ r: 0.996, g: 0.949, b: 0.949, a: 1 }); // #FEF2F3
  errorCard.cornerRadius = 12;
  errorCard.layoutMode = 'VERTICAL';
  errorCard.paddingLeft = 24;
  errorCard.paddingRight = 24;
  errorCard.paddingTop = 20;
  errorCard.paddingBottom = 20;
  errorCard.itemSpacing = 12;

  // 左边框（红色3px）— 用矩形模拟
  const errorBorder = figma.createRectangle();
  errorBorder.name = 'ErrorLeftBorder';
  errorBorder.resize(3, 140);
  errorBorder.fill = createFills({ r: 0.937, g: 0.267, b: 0.267, a: 1 }); // #EF4444
  errorBorder.x = 0;
  errorBorder.y = 0;
  errorBorder.parent = errorCard;

  // 错误标题行
  const errorTitle = figma.createText();
  errorTitle.name = 'ErrorTitle';
  errorTitle.characters = '❌ 生成失败';
  errorTitle.fontSize = 16;
  errorTitle.fontWeight = 600;
  errorTitle.fill = createFills(designTokens.colors['neutral/8']);
  errorTitle.parent = errorCard;

  // 错误描述
  const errorDesc = figma.createText();
  errorDesc.name = 'ErrorDescription';
  errorDesc.characters = 'API调用超时，请尝试重试或切换模型';
  errorDesc.fontSize = 14;
  errorDesc.fill = createFills(designTokens.colors['neutral/6']);
  errorDesc.parent = errorCard;

  // 操作按钮行
  const btnRow = figma.createFrame();
  btnRow.name = 'ErrorActionButtons';
  btnRow.layoutMode = 'HORIZONTAL';
  btnRow.itemSpacing = 12;
  btnRow.parent = errorCard;

  // 重试按钮（主要）
  const retryBtn = figma.createFrame();
  retryBtn.name = 'RetryButton_Primary';
  retryBtn.resize(72, 28);
  retryBtn.backgrounds = createFills(designTokens.colors.primary);
  retryBtn.cornerRadius = 8;
  retryBtn.layoutMode = 'HORIZONTAL';
  retryBtn.horizontalAlignItems = 'CENTER';
  retryBtn.verticalAlignItems = 'CENTER';
  retryBtn.parent = btnRow;

  const retryText = figma.createText();
  retryText.characters = '重试';
  retryText.fontSize = 13;
  retryText.fontWeight = 500;
  retryText.fill = createFills(designTokens.colors['neutral/0']);
  retryText.parent = retryBtn;

  // 切换模型重试按钮（次要）
  const switchBtn = figma.createFrame();
  switchBtn.name = 'SwitchModelButton_Secondary';
  switchBtn.resize(120, 28);
  switchBtn.backgrounds = createFills(designTokens.colors['neutral/0']);
  switchBtn.stroke = createFills(designTokens.colors['neutral/3']);
  switchBtn.strokeWeight = 1;
  switchBtn.cornerRadius = 8;
  switchBtn.layoutMode = 'HORIZONTAL';
  switchBtn.horizontalAlignItems = 'CENTER';
  switchBtn.verticalAlignItems = 'CENTER';
  switchBtn.parent = btnRow;

  const switchText = figma.createText();
  switchText.characters = '切换模型重试';
  switchText.fontSize = 13;
  switchText.fill = createFills(designTokens.colors['neutral/7']);
  switchText.parent = switchBtn;

  errorCard.parent = card;

  // 注释：错误状态下决策区隐藏
  const note = figma.createText();
  note.name = 'Note_DecisionHidden';
  note.characters = '⚠️ 错误状态：决策区隐藏';
  note.fontSize = 12;
  note.fill = createFills(designTokens.colors['neutral/6']);
  note.parent = card;

  return card;
}

// ==================== 状态切换说明 ====================
// 默认显示完成态（createReadingCard + createDecisionPanel）
// 切换到生成中：用 createGeneratingState 替换阅读卡片，移除决策区，顶栏按钮改为"取消生成"
// 切换到错误态：用 createErrorState 替换阅读卡片，移除决策区
// 三种状态互斥，同一时间只显示一种

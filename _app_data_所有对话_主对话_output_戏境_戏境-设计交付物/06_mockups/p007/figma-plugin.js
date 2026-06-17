// p007 章节回看 - Figma Plugin 脚本
// 生成高保真章节回看页面设计

const { figma } = require('figma-api');

// ==================== 设计变量定义 ====================
const designTokens = {
  colors: {
    primary: { r: 0.486, g: 0.361, b: 0.988, a: 1 },        // #7C5CFC
    'primary/dark': { r: 0.388, g: 0.267, b: 0.878, a: 1 },
    secondary: { r: 0.788, g: 0.596, b: 0.290, a: 1 },      // #C9984A
    'neutral/0': { r: 1, g: 1, b: 1, a: 1 },                // #FFFFFF
    'neutral/1': { r: 0.976, g: 0.980, b: 0.984, a: 1 },    // #F9FAFB
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
  readTab.name = 'Tab_Read';
  readTab.resize(80, 48);
  readTab.backgrounds = createFills({ r: 1, g: 1, b: 1, a: 0 });
  readTab.layoutMode = 'VERTICAL';
  readTab.verticalAlignItems = 'CENTER';
  readTab.parent = tabBar;
  
  const readTabText = figma.createText();
  readTabText.characters = '📖 阅读';
  readTabText.fontSize = 14;
  readTabText.fill = createFills(designTokens.colors['neutral/6']);
  readTabText.parent = readTab;
  
  // 回看标签（选中状态）
  const reviewTab = figma.createFrame();
  reviewTab.name = 'Tab_Review_Active';
  reviewTab.resize(80, 48);
  reviewTab.backgrounds = createFills({ r: 1, g: 1, b: 1, a: 0 });
  reviewTab.layoutMode = 'VERTICAL';
  reviewTab.verticalAlignItems = 'CENTER';
  reviewTab.parent = tabBar;
  
  const reviewTabText = figma.createText();
  reviewTabText.characters = '📚 回看';
  reviewTabText.fontSize = 14;
  reviewTabText.fill = createFills(designTokens.colors.primary);
  reviewTabText.parent = reviewTab;
  
  // 底部下划线
  const reviewUnderline = figma.createRectangle();
  reviewUnderline.name = 'TabUnderline';
  reviewUnderline.resize(64, 2);
  reviewUnderline.fill = createFills(designTokens.colors.primary);
  reviewUnderline.y = 42;
  reviewUnderline.parent = reviewTab;
  
  return tabBar;
}

// 创建章节目录列表
function createChapterList(parent) {
  const listContainer = figma.createFrame();
  listContainer.name = 'ChapterList';
  listContainer.resize(220, figma.viewport.height);
  listContainer.backgrounds = createFills(designTokens.colors['neutral/0']);
  listContainer.stroke = createFills(designTokens.colors['neutral/3']);
  listContainer.strokeWeight = 1;
  listContainer.layoutMode = 'VERTICAL';
  listContainer.paddingLeft = 16;
  listContainer.paddingRight = 16;
  listContainer.paddingTop = 24;
  listContainer.itemSpacing = 0;
  listContainer.parent = parent;
  
  // 目录标题
  const listTitle = figma.createText();
  listTitle.characters = '章节目录';
  listTitle.fontSize = 14;
  listTitle.fill = createFills(designTokens.colors['neutral/6']);
  listTitle.parent = listContainer;
  
  // 章节数据
  const chapters = [
    { num: '第一章', title: '黎明', active: false },
    { num: '第二章', title: '入局', active: true },
    { num: '第三章', title: '暗潮涌动', active: false }
  ];
  
  chapters.forEach((chapter, index) => {
    const chapterItem = figma.createFrame();
    chapterItem.name = `Chapter_${index + 1}`;
    chapterItem.resize(188, 44);
    chapterItem.backgrounds = chapter.active 
      ? createFills(designTokens.colors['primary/surface'])
      : createFills({ r: 1, g: 1, b: 1, a: 0 });
    chapterItem.cornerRadius = 8;
    chapterItem.layoutMode = 'HORIZONTAL';
    chapterItem.horizontalAlignItems = 'CENTER';
    chapterItem.paddingLeft = chapter.active ? 12 : 0;
    
    // 左边框（激活状态）
    if (chapter.active) {
      const leftBorder = figma.createRectangle();
      leftBorder.name = 'ActiveIndicator';
      leftBorder.resize(3, 24);
      leftBorder.fill = createFills(designTokens.colors.primary);
      leftBorder.parent = chapterItem;
    }
    
    // 章节文字
    const chapterText = figma.createText();
    chapterText.characters = `${chapter.num} ${chapter.title}`;
    chapterText.fontSize = 14;
    chapterText.fill = chapter.active 
      ? createFills(designTokens.colors.primary)
      : createFills(designTokens.colors['neutral/6']);
    chapterText.marginLeft = chapter.active ? 0 : 12;
    chapterText.parent = chapterItem;
  });
  
  return listContainer;
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
  chapterTitle.characters = '第二章 入局';
  chapterTitle.fontSize = 24;
  chapterTitle.fontWeight = 600;
  chapterTitle.fill = createFills(designTokens.colors['neutral/8']);
  chapterTitle.parent = card;
  
  // 章节进度
  const chapterProgress = figma.createText();
  chapterProgress.characters = '第2章 / 共8章';
  chapterProgress.fontSize = 12;
  chapterProgress.fill = createFills(designTokens.colors['neutral/6']);
  chapterProgress.parent = card;
  
  // 正文段落
  const para1 = figma.createText();
  para1.name = 'Paragraph1';
  para1.characters = '三天前，陈默收到了一封没有署名的信件。信中只有一句话：「古槐树下，子时相见。」他没有告诉任何人，独自来到了这所废弃已久的老宅。\n\n庭院中杂草丛生，唯有那棵古槐依然枝繁叶茂，在夜风中沙沙作响。';
  para1.fontSize = 16;
  para1.lineHeight = { value: 180, unit: 'PERCENT' };
  para1.fill = createFills(designTokens.colors['neutral/7']);
  para1.parent = card;
  
  return card;
}

// ==================== 主函数 ====================
async function createP007Design() {
  // 创建页面
  const page = figma.createPage();
  page.name = 'p007_章节回看';
  
  // 激活页面
  figma.currentPage = page;
  
  // 创建主画板
  const canvas = figma.createFrame();
  canvas.name = 'p007_ChapterReview';
  canvas.resize(1440, 900);
  canvas.backgrounds = createFills(designTokens.colors['neutral/1']);
  canvas.layoutMode = 'HORIZONTAL';
  
  // 创建侧栏
  createSidebar(canvas);
  
  // 顶栏（需要单独处理，因为在HORIZONTAL布局中）
  const topbarArea = figma.createFrame();
  topbarArea.name = 'TopbarArea';
  topbarArea.resize(1376, 56);
  topbarArea.backgrounds = createFills(designTokens.colors['neutral/0']);
  topbarArea.stroke = createFills(designTokens.colors['neutral/3']);
  topbarArea.strokeWeight = 1;
  topbarArea.layoutMode = 'HORIZONTAL';
  topbarArea.horizontalAlignItems = 'CENTER';
  topbarArea.verticalAlignItems = 'CENTER';
  topbarArea.paddingLeft = 24;
  topbarArea.paddingRight = 24;
  topbarArea.parent = canvas;
  
  // 折叠按钮
  const collapseBtn = figma.createText();
  collapseBtn.characters = '☰';
  collapseBtn.fontSize = 20;
  collapseBtn.fill = createFills(designTokens.colors['neutral/6']);
  collapseBtn.parent = topbarArea;
  
  // 面包屑
  const breadcrumb = figma.createText();
  breadcrumb.characters = '我的故事 > 暗影编年';
  breadcrumb.fontSize = 14;
  breadcrumb.fill = createFills(designTokens.colors['neutral/6']);
  breadcrumb.marginLeft = 16;
  breadcrumb.parent = topbarArea;
  
  // 主内容区分栏容器
  const mainContent = figma.createFrame();
  mainContent.name = 'MainContent';
  mainContent.resize(1376, 844);
  mainContent.backgrounds = createFills(designTokens.colors['neutral/1']);
  mainContent.layoutMode = 'HORIZONTAL';
  mainContent.parent = canvas;
  
  // 创建章节目录
  createChapterList(mainContent);
  
  // 右侧阅读区容器
  const readingArea = figma.createFrame();
  readingArea.name = 'ReadingArea';
  readingArea.resize(1156, 844);
  readingArea.backgrounds = createFills(designTokens.colors['neutral/1']);
  readingArea.layoutMode = 'VERTICAL';
  readingArea.paddingLeft = 24;
  readingArea.paddingTop = 24;
  readingArea.itemSpacing = 24;
  readingArea.parent = mainContent;
  
  // 创建标签页
  createTabBar(readingArea);
  
  // 创建阅读卡片
  createReadingCard(readingArea);
  
  console.log('p007 章节回看页面创建完成');
  figma.notify('p007 章节回看页面设计已生成');
}

// 执行
createP007Design().catch(console.error);

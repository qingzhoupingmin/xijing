// Figma Plugin: API配置页 (p002) - 含添加配置弹窗
// 在 Figma 中运行此脚本生成可编辑设计稿

async function main() {
  // === 颜色变量 ===
  const color = {
    neutral0: { r: 1, g: 1, b: 1, a: 1 },           // #FFFFFF
    neutral1: { r: 0.976, g: 0.980, b: 0.984, a: 1 }, // #F9FAFB
    neutral2: { r: 0.953, g: 0.957, b: 0.961, a: 1 }, // #F3F4F6
    neutral3: { r: 0.898, g: 0.906, b: 0.922, a: 1 }, // #E5E7EB
    neutral5: { r: 0.612, g: 0.639, b: 0.686, a: 1 }, // #9CA3AF
    neutral6: { r: 0.420, g: 0.447, b: 0.502, a: 1 }, // #6B7280
    neutral7: { r: 0.216, g: 0.255, b: 0.318, a: 1 }, // #374151
    neutral8: { r: 0.122, g: 0.161, b: 0.216, a: 1 }, // #1F2937
    primary: { r: 0.486, g: 0.361, b: 0.988, a: 1 }, // #7C5CFC
    primaryLight: { r: 0.608, g: 0.510, b: 0.988, a: 1 }, // #9B82FC
    primaryDark: { r: 0.388, g: 0.267, b: 0.878, a: 1 }, // #6344E0
    primarySurface: { r: 0.961, g: 0.953, b: 1, a: 1 }, // #F5F3FF
    secondary: { r: 0.788, g: 0.596, b: 0.290, a: 1 }, // #C9984A
    semanticSuccess: { r: 0.063, g: 0.725, b: 0.506, a: 1 }, // #10B981
    semanticSuccessLight: { r: 0.867, g: 0.961, b: 0.922, a: 1 }, // #DEFFF1
    overlay: { r: 0, g: 0, b: 0, a: 0.4 }, // rgba(0,0,0,0.4)
  };

  // === 创建颜色变量 ===
  const collection = figma.variables.createVariableCollection('戏境Colors');
  const mode = collection.modes[0];
  
  const varNeutral0 = figma.variables.createVariable('color', collection, 'neutral/0');
  varNeutral0.resolvedType = 'COLOR';
  varNeutral0.setValueForMode(mode, color.neutral0);
  
  const varNeutral1 = figma.variables.createVariable('color', collection, 'neutral/1');
  varNeutral1.resolvedType = 'COLOR';
  varNeutral1.setValueForMode(mode, color.neutral1);
  
  const varNeutral3 = figma.variables.createVariable('color', collection, 'neutral/3');
  varNeutral3.resolvedType = 'COLOR';
  varNeutral3.setValueForMode(mode, color.neutral3);
  
  const varNeutral5 = figma.variables.createVariable('color', collection, 'neutral/5');
  varNeutral5.resolvedType = 'COLOR';
  varNeutral5.setValueForMode(mode, color.neutral5);
  
  const varNeutral6 = figma.variables.createVariable('color', collection, 'neutral/6');
  varNeutral6.resolvedType = 'COLOR';
  varNeutral6.setValueForMode(mode, color.neutral6);
  
  const varNeutral7 = figma.variables.createVariable('color', collection, 'neutral/7');
  varNeutral7.resolvedType = 'COLOR';
  varNeutral7.setValueForMode(mode, color.neutral7);
  
  const varNeutral8 = figma.variables.createVariable('color', collection, 'neutral/8');
  varNeutral8.resolvedType = 'COLOR';
  varNeutral8.setValueForMode(mode, color.neutral8);
  
  const varPrimary = figma.variables.createVariable('color', collection, 'primary');
  varPrimary.resolvedType = 'COLOR';
  varPrimary.setValueForMode(mode, color.primary);
  
  const varPrimarySurface = figma.variables.createVariable('color', collection, 'primary/surface');
  varPrimarySurface.resolvedType = 'COLOR';
  varPrimarySurface.setValueForMode(mode, color.primarySurface);

  // === 创建页面 ===
  const page = figma.createPage();
  page.name = 'API配置页 (p002)';
  figma.currentPage = page;

  // === 创建主框架 ===
  const mainFrame = figma.createFrame();
  mainFrame.name = 'API配置页';
  mainFrame.resize(1440, 900);
  mainFrame.backgrounds = [{ type: 'SOLID', color: color.neutral1 }];
  mainFrame.fills = [{ type: 'SOLID', color: color.neutral1 }];
  mainFrame.layoutMode = 'HORIZONTAL';
  mainFrame.primaryAxisSizingMode = 'FIXED';
  mainFrame.counterAxisSizingMode = 'FIXED';
  mainFrame.itemSpacing = 0;

  // === 侧边栏 ===
  const sidebar = figma.createFrame();
  sidebar.name = '侧边栏';
  sidebar.resize(220, 900);
  sidebar.backgrounds = [{ type: 'SOLID', color: color.neutral0 }];
  sidebar.strokes = [{ type: 'SOLID', color: color.neutral3 }];
  sidebar.layoutMode = 'VERTICAL';
  sidebar.paddingLeft = 0;
  sidebar.paddingRight = 0;
  sidebar.paddingTop = 0;
  sidebar.paddingBottom = 0;
  sidebar.itemSpacing = 0;
  mainFrame.appendChild(sidebar);

  // === Logo区域 ===
  const logoArea = figma.createFrame();
  logoArea.name = 'Logo区域';
  logoArea.resize(220, 64);
  logoArea.backgrounds = [{ type: 'SOLID', color: color.neutral0 }];
  logoArea.layoutMode = 'HORIZONTAL';
  logoArea.paddingLeft = 16;
  logoArea.primaryAxisAlignItems = 'CENTER';
  sidebar.appendChild(logoArea);

  const logoText = figma.createText();
  logoText.name = 'Logo文字';
  logoText.characters = '戏境';
  logoText.fontSize = 24;
  logoText.fontName = { family: 'PingFang SC', style: 'Bold' };
  logoText.fills = [{ type: 'SOLID', color: color.primary }];
  logoArea.appendChild(logoText);

  // === 导航列表 ===
  const navItems = [
    { name: '我的故事', active: false },
    { name: '世界观工坊', active: false },
    { name: 'API配置', active: true },
    { name: '个人中心', active: false }
  ];

  const navContainer = figma.createFrame();
  navContainer.name = '导航列表';
  navContainer.layoutMode = 'VERTICAL';
  navContainer.itemSpacing = 4;
  navContainer.paddingTop = 16;
  navContainer.paddingBottom = 0;
  navContainer.paddingLeft = 8;
  navContainer.paddingRight = 8;
  sidebar.appendChild(navContainer);

  navItems.forEach((item) => {
    const navItem = figma.createFrame();
    navItem.name = item.name;
    navItem.resize(204, 44);
    navItem.backgrounds = item.active ? [{ type: 'SOLID', color: color.primarySurface }] : [{ type: 'SOLID', color: color.neutral0 }];
    navItem.cornerRadius = 8;
    navItem.layoutMode = 'HORIZONTAL';
    navItem.paddingLeft = 16;
    navItem.primaryAxisAlignItems = 'CENTER';
    navContainer.appendChild(navItem);

    if (item.active) {
      const accentBar = figma.createRectangle();
      accentBar.name = '激活条';
      accentBar.resize(3, 24);
      accentBar.fills = [{ type: 'SOLID', color: color.primary }];
      accentBar.cornerRadius = 2;
      navItem.appendChild(accentBar);
    }

    const navText = figma.createText();
    navText.name = '导航文字';
    navText.characters = item.name;
    navText.fontSize = 16;
    navText.fontName = { family: 'PingFang SC', style: 'Medium' };
    navText.fills = item.active ? [{ type: 'SOLID', color: color.primary }] : [{ type: 'SOLID', color: color.neutral8 }];
    navText.hyperlink = null;
    navItem.appendChild(navText);
  });

  // === 用户信息区域 ===
  const userArea = figma.createFrame();
  userArea.name = '用户区域';
  userArea.resize(220, 72);
  userArea.backgrounds = [{ type: 'SOLID', color: color.neutral0 }];
  userArea.layoutMode = 'HORIZONTAL';
  userArea.paddingLeft = 16;
  userArea.itemSpacing = 12;
  userArea.counterAxisAlignItems = 'CENTER';
  sidebar.appendChild(userArea);

  const avatar = figma.createEllipse();
  avatar.name = '头像';
  avatar.resize(40, 40);
  avatar.fills = [{ type: 'SOLID', color: color.primarySurface }];
  userArea.appendChild(avatar);

  const userName = figma.createText();
  userName.name = '用户名';
  userName.characters = '林夜';
  userName.fontSize = 16;
  userName.fontName = { family: 'PingFang SC', style: 'Medium' };
  userName.fills = [{ type: 'SOLID', color: color.neutral8 }];
  userArea.appendChild(userName);

  // === 内容区域 ===
  const contentArea = figma.createFrame();
  contentArea.name = '内容区';
  contentArea.resize(1220, 900);
  contentArea.backgrounds = [{ type: 'SOLID', color: color.neutral1 }];
  contentArea.layoutMode = 'VERTICAL';
  contentArea.paddingLeft = 24;
  contentArea.paddingRight = 24;
  contentArea.paddingTop = 0;
  contentArea.paddingBottom = 24;
  mainFrame.appendChild(contentArea);

  // === 顶栏 ===
  const topbar = figma.createFrame();
  topbar.name = '顶栏';
  topbar.resize(1172, 56);
  topbar.backgrounds = [{ type: 'SOLID', color: color.neutral0 }];
  topbar.strokes = [{ type: 'SOLID', color: color.neutral3 }];
  topbar.layoutMode = 'HORIZONTAL';
  contentArea.appendChild(topbar);

  // === 标题区 ===
  const headerArea = figma.createFrame();
  headerArea.name = '标题区';
  headerArea.resize(1172, 80);
  headerArea.backgrounds = [{ type: 'SOLID', color: color.neutral1 }];
  headerArea.layoutMode = 'HORIZONTAL';
  headerArea.counterAxisAlignItems = 'CENTER';
  headerArea.itemSpacing = 16;
  contentArea.appendChild(headerArea);

  const pageTitle = figma.createText();
  pageTitle.name = '页面标题';
  pageTitle.characters = 'API配置';
  pageTitle.fontSize = 24;
  pageTitle.fontName = { family: 'PingFang SC', style: 'Semibold' };
  pageTitle.fills = [{ type: 'SOLID', color: color.neutral8 }];
  headerArea.appendChild(pageTitle);

  const addButton = figma.createFrame();
  addButton.name = '添加按钮';
  addButton.resize(100, 36);
  addButton.backgrounds = [{ type: 'SOLID', color: color.primary }];
  addButton.cornerRadius = 8;
  addButton.layoutMode = 'HORIZONTAL';
  addButton.primaryAxisAlignItems = 'CENTER';
  addButton.counterAxisAlignItems = 'CENTER';
  headerArea.appendChild(addButton);

  const addButtonText = figma.createText();
  addButtonText.name = '按钮文字';
  addButtonText.characters = '添加配置';
  addButtonText.fontSize = 14;
  addButtonText.fontName = { family: 'PingFang SC', style: 'Medium' };
  addButtonText.fills = [{ type: 'SOLID', color: color.neutral0 }];
  addButton.appendChild(addButtonText);

  // === 配置卡片 ===
  const configCard = figma.createFrame();
  configCard.name = '配置卡片';
  configCard.resize(1172, 120);
  configCard.backgrounds = [{ type: 'SOLID', color: color.neutral0 }];
  configCard.cornerRadius = 12;
  configCard.effects = [
    { type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 0.06 }, offset: { x: 0, y: 1 }, blur: 3, spread: 0 },
    { type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 0.04 }, offset: { x: 0, y: 1 }, blur: 2, spread: 0 }
  ];
  configCard.layoutMode = 'VERTICAL';
  configCard.paddingTop = 0;
  configCard.itemSpacing = 0;
  contentArea.appendChild(configCard);

  const cardAccent = figma.createRectangle();
  cardAccent.name = '卡片顶部装饰';
  cardAccent.resize(1172, 2);
  cardAccent.fills = [{ type: 'SOLID', color: color.primary }];
  configCard.appendChild(cardAccent);

  const cardContent = figma.createFrame();
  cardContent.name = '卡片内容';
  cardContent.resize(1172, 118);
  cardContent.backgrounds = [{ type: 'SOLID', color: color.neutral0 }];
  cardContent.layoutMode = 'HORIZONTAL';
  cardContent.paddingLeft = 20;
  cardContent.paddingRight = 20;
  cardContent.counterAxisAlignItems = 'CENTER';
  cardContent.itemSpacing = 16;
  configCard.appendChild(cardContent);

  const cardLeft = figma.createFrame();
  cardLeft.name = '卡片左侧信息';
  cardLeft.layoutMode = 'VERTICAL';
  cardLeft.itemSpacing = 8;
  cardLeft.counterAxisAlignItems = 'LEFT';
  cardLeft.primaryAxisSizingMode = 'AUTO';
  cardLeft.counterAxisSizingMode = 'AUTO';
  cardContent.appendChild(cardLeft);

  const cardTitle = figma.createText();
  cardTitle.name = '配置名称';
  cardTitle.characters = '我的DeepSeek';
  cardTitle.fontSize = 18;
  cardTitle.fontName = { family: 'PingFang SC', style: 'Semibold' };
  cardTitle.fills = [{ type: 'SOLID', color: color.neutral8 }];
  cardLeft.appendChild(cardTitle);

  const cardDetails = figma.createText();
  cardDetails.name = '模型详情';
  cardDetails.characters = '厂商: DeepSeek  |  模型ID: deepseek-chat  |  Key: ****a3f2';
  cardDetails.fontSize = 14;
  cardDetails.fontName = { family: 'PingFang SC', style: 'Regular' };
  cardDetails.fills = [{ type: 'SOLID', color: color.neutral7 }];
  cardLeft.appendChild(cardDetails);

  const cardActions = figma.createFrame();
  cardActions.name = '卡片操作区';
  cardActions.layoutMode = 'HORIZONTAL';
  cardActions.itemSpacing = 24;
  cardActions.counterAxisAlignItems = 'CENTER';
  cardActions.primaryAxisSizingMode = 'AUTO';
  cardContent.appendChild(cardActions);

  const switchWidget = figma.createFrame();
  switchWidget.name = '启用开关';
  switchWidget.resize(44, 24);
  switchWidget.backgrounds = [{ type: 'SOLID', color: color.semanticSuccess }];
  switchWidget.cornerRadius = 12;
  cardActions.appendChild(switchWidget);

  const deleteBtn = figma.createText();
  deleteBtn.name = '删除按钮';
  deleteBtn.characters = '删除';
  deleteBtn.fontSize = 14;
  deleteBtn.fontName = { family: 'PingFang SC', style: 'Regular' };
  deleteBtn.fills = [{ type: 'SOLID', color: color.neutral6 }];
  cardActions.appendChild(deleteBtn);

  // === 添加新配置区域 ===
  const addSection = figma.createFrame();
  addSection.name = '添加新配置';
  addSection.resize(1172, 80);
  addSection.backgrounds = [{ type: 'SOLID', color: color.neutral0 }];
  addSection.strokes = [{ type: 'DASH', color: color.neutral3, strokeWeight: 2 }];
  addSection.cornerRadius = 12;
  addSection.layoutMode = 'HORIZONTAL';
  addSection.primaryAxisAlignItems = 'CENTER';
  addSection.counterAxisAlignItems = 'CENTER';
  contentArea.appendChild(addSection);

  const addSectionText = figma.createText();
  addSectionText.name = '添加文字';
  addSectionText.characters = '+ 添加新配置';
  addSectionText.fontSize = 16;
  addSectionText.fontName = { family: 'PingFang SC', style: 'Regular' };
  addSectionText.fills = [{ type: 'SOLID', color: color.neutral6 }];
  addSection.appendChild(addSectionText);

  // =====================================================
  // === 弹窗组件 (Dialog) - 添加配置弹窗 ===
  // =====================================================

  // === 遮罩层 ===
  const overlay = figma.createRectangle();
  overlay.name = '遮罩层';
  overlay.resize(1440, 900);
  overlay.fills = [{ type: 'SOLID', color: color.overlay }];
  overlay.x = 0;
  overlay.y = 0;
  mainFrame.appendChild(overlay);

  // === 弹窗容器 ===
  const dialog = figma.createFrame();
  dialog.name = '添加配置弹窗';
  dialog.resize(560, 620);
  dialog.backgrounds = [{ type: 'SOLID', color: color.neutral0 }];
  dialog.cornerRadius = 16;
  dialog.effects = [
    { type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 0.25 }, offset: { x: 0, y: 25 }, blur: 50, spread: 0 },
    { type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 0.15 }, offset: { x: 0, y: 10 }, blur: 20, spread: 0 }
  ];
  dialog.layoutMode = 'VERTICAL';
  dialog.paddingLeft = 24;
  dialog.paddingRight = 24;
  dialog.paddingTop = 24;
  dialog.paddingBottom = 24;
  dialog.x = (1440 - 560) / 2;
  dialog.y = (900 - 620) / 2;
  overlay.appendChild(dialog);

  // === 弹窗标题区 ===
  const dialogHeader = figma.createFrame();
  dialogHeader.name = '弹窗标题区';
  dialogHeader.resize(512, 28);
  dialogHeader.backgrounds = [{ type: 'SOLID', color: color.neutral0 }];
  dialogHeader.layoutMode = 'HORIZONTAL';
  dialogHeader.primaryAxisAlignItems = 'CENTER';
  dialogHeader.counterAxisAlignItems = 'CENTER';
  dialog.appendChild(dialogHeader);

  const dialogTitle = figma.createText();
  dialogTitle.name = '弹窗标题';
  dialogTitle.characters = '添加API配置';
  dialogTitle.fontSize = 18;
  dialogTitle.fontName = { family: 'PingFang SC', style: 'Semibold' };
  dialogTitle.fills = [{ type: 'SOLID', color: color.neutral8 }];
  dialogHeader.appendChild(dialogTitle);

  const closeBtn = figma.createText();
  closeBtn.name = '关闭按钮';
  closeBtn.characters = '✕';
  closeBtn.fontSize = 18;
  closeBtn.fills = [{ type: 'SOLID', color: color.neutral5 }];
  dialogHeader.appendChild(closeBtn);

  // === 表单区域 ===
  const formArea = figma.createFrame();
  formArea.name = '表单区域';
  formArea.resize(512, 480);
  formArea.backgrounds = [{ type: 'SOLID', color: color.neutral0 }];
  formArea.layoutMode = 'VERTICAL';
  formArea.itemSpacing = 20;
  formArea.counterAxisAlignItems = 'STRETCH';
  dialog.appendChild(formArea);

  // === 表单字段: 配置名称 ===
  const field1 = figma.createFrame();
  field1.name = '配置名称字段';
  field1.resize(512, 64);
  field1.backgrounds = [{ type: 'SOLID', color: color.neutral0 }];
  field1.layoutMode = 'VERTICAL';
  field1.itemSpacing = 8;
  formArea.appendChild(field1);

  const label1 = figma.createText();
  label1.name = '配置名称标签';
  label1.characters = '配置名称';
  label1.fontSize = 14;
  label1.fontName = { family: 'PingFang SC', style: 'Medium' };
  label1.fills = [{ type: 'SOLID', color: color.neutral7 }];
  field1.appendChild(label1);

  const input1 = figma.createFrame();
  input1.name = '配置名称输入框';
  input1.resize(512, 36);
  input1.backgrounds = [{ type: 'SOLID', color: color.neutral0 }];
  input1.strokes = [{ type: 'SOLID', color: color.neutral3 }];
  input1.cornerRadius = 8;
  input1.layoutMode = 'HORIZONTAL';
  input1.paddingLeft = 12;
  input1.primaryAxisAlignItems = 'CENTER';
  field1.appendChild(input1);

  const input1Placeholder = figma.createText();
  input1Placeholder.name = '占位文字';
  input1Placeholder.characters = '如：我的DeepSeek';
  input1Placeholder.fontSize = 14;
  input1Placeholder.fontName = { family: 'PingFang SC', style: 'Regular' };
  input1Placeholder.fills = [{ type: 'SOLID', color: color.neutral5 }];
  input1.appendChild(input1Placeholder);

  // === 表单字段: 厂商 ===
  const field2 = figma.createFrame();
  field2.name = '厂商字段';
  field2.resize(512, 64);
  field2.backgrounds = [{ type: 'SOLID', color: color.neutral0 }];
  field2.layoutMode = 'VERTICAL';
  field2.itemSpacing = 8;
  formArea.appendChild(field2);

  const label2 = figma.createText();
  label2.name = '厂商标签';
  label2.characters = '厂商';
  label2.fontSize = 14;
  label2.fontName = { family: 'PingFang SC', style: 'Medium' };
  label2.fills = [{ type: 'SOLID', color: color.neutral7 }];
  field2.appendChild(label2);

  const select2 = figma.createFrame();
  select2.name = '厂商下拉框';
  select2.resize(512, 36);
  select2.backgrounds = [{ type: 'SOLID', color: color.neutral0 }];
  select2.strokes = [{ type: 'SOLID', color: color.neutral3 }];
  select2.cornerRadius = 8;
  select2.layoutMode = 'HORIZONTAL';
  select2.paddingLeft = 12;
  select2.primaryAxisAlignItems = 'CENTER';
  select2.itemSpacing = 8;
  field2.appendChild(select2);

  const select2Text = figma.createText();
  select2Text.name = '选中值';
  select2Text.characters = 'DeepSeek';
  select2Text.fontSize = 14;
  select2Text.fontName = { family: 'PingFang SC', style: 'Regular' };
  select2Text.fills = [{ type: 'SOLID', color: color.neutral8 }];
  select2.appendChild(select2Text);

  const select2Arrow = figma.createText();
  select2Arrow.name = '下拉箭头';
  select2Arrow.characters = '▼';
  select2Arrow.fontSize = 10;
  select2Arrow.fills = [{ type: 'SOLID', color: color.neutral6 }];
  select2.appendChild(select2Arrow);

  // === 厂商下拉列表 (展开状态) ===
  const dropdown = figma.createFrame();
  dropdown.name = '厂商下拉列表';
  dropdown.resize(512, 216);
  dropdown.backgrounds = [{ type: 'SOLID', color: color.neutral0 }];
  dropdown.strokes = [{ type: 'SOLID', color: color.neutral3 }];
  dropdown.cornerRadius = 8;
  dropdown.effects = [
    { type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 0.1 }, offset: { x: 0, y: 4 }, blur: 12, spread: 0 }
  ];
  dropdown.layoutMode = 'VERTICAL';
  dropdown.itemSpacing = 0;
  dropdown.x = 0;
  dropdown.y = 200;
  dropdown.opacity = 0;
  field2.appendChild(dropdown);

  const providers = ['文心一言', '通义千问', '智谱', '豆包', 'DeepSeek', '自定义'];
  providers.forEach((provider, index) => {
    const option = figma.createFrame();
    option.name = provider;
    option.resize(512, 36);
    option.backgrounds = provider === 'DeepSeek' ? [{ type: 'SOLID', color: color.primarySurface }] : [{ type: 'SOLID', color: color.neutral0 }];
    option.layoutMode = 'HORIZONTAL';
    option.paddingLeft = 12;
    option.primaryAxisAlignItems = 'CENTER';
    dropdown.appendChild(option);

    const optionText = figma.createText();
    optionText.name = '选项文字';
    optionText.characters = provider;
    optionText.fontSize = 14;
    optionText.fontName = { family: 'PingFang SC', style: 'Regular' };
    optionText.fills = provider === 'DeepSeek' ? [{ type: 'SOLID', color: color.primary }] : [{ type: 'SOLID', color: color.neutral8 }];
    option.appendChild(optionText);
  });

  // === 表单字段: 接口地址 ===
  const field3 = figma.createFrame();
  field3.name = '接口地址字段';
  field3.resize(512, 64);
  field3.backgrounds = [{ type: 'SOLID', color: color.neutral0 }];
  field3.layoutMode = 'VERTICAL';
  field3.itemSpacing = 8;
  formArea.appendChild(field3);

  const label3 = figma.createText();
  label3.name = '接口地址标签';
  label3.characters = '接口地址';
  label3.fontSize = 14;
  label3.fontName = { family: 'PingFang SC', style: 'Medium' };
  label3.fills = [{ type: 'SOLID', color: color.neutral7 }];
  field3.appendChild(label3);

  const inputRow3 = figma.createFrame();
  inputRow3.name = '输入框+标签行';
  inputRow3.resize(512, 36);
  inputRow3.backgrounds = [{ type: 'SOLID', color: color.neutral0 }];
  inputRow3.layoutMode = 'HORIZONTAL';
  inputRow3.itemSpacing = 8;
  inputRow3.counterAxisAlignItems = 'CENTER';
  field3.appendChild(inputRow3);

  const input3 = figma.createFrame();
  input3.name = '接口地址输入框';
  input3.resize(380, 36);
  input3.backgrounds = [{ type: 'SOLID', color: color.neutral2 }];
  input3.strokes = [{ type: 'SOLID', color: color.neutral3 }];
  input3.cornerRadius = 8;
  input3.layoutMode = 'HORIZONTAL';
  input3.paddingLeft = 12;
  input3.primaryAxisAlignItems = 'CENTER';
  inputRow3.appendChild(input3);

  const input3Text = figma.createText();
  input3Text.name = '接口地址值';
  input3Text.characters = 'https://api.deepseek.com/v1/chat/completions';
  input3Text.fontSize = 14;
  input3Text.fontName = { family: 'PingFang SC', style: 'Regular' };
  input3Text.fills = [{ type: 'SOLID', color: color.neutral8 }];
  input3.appendChild(input3Text);

  const autoFillTag = figma.createFrame();
  autoFillTag.name = '自动填充标签';
  autoFillTag.resize(56, 24);
  autoFillTag.backgrounds = [{ type: 'SOLID', color: color.primarySurface }];
  autoFillTag.cornerRadius = 4;
  autoFillTag.layoutMode = 'HORIZONTAL';
  autoFillTag.primaryAxisAlignItems = 'CENTER';
  autoFillTag.counterAxisAlignItems = 'CENTER';
  inputRow3.appendChild(autoFillTag);

  const autoFillTagText = figma.createText();
  autoFillTagText.name = '标签文字';
  autoFillTagText.characters = '自动填充';
  autoFillTagText.fontSize = 12;
  autoFillTagText.fontName = { family: 'PingFang SC', style: 'Medium' };
  autoFillTagText.fills = [{ type: 'SOLID', color: color.primary }];
  autoFillTag.appendChild(autoFillTagText);

  // === 表单字段: API Key ===
  const field4 = figma.createFrame();
  field4.name = 'API Key字段';
  field4.resize(512, 64);
  field4.backgrounds = [{ type: 'SOLID', color: color.neutral0 }];
  field4.layoutMode = 'VERTICAL';
  field4.itemSpacing = 8;
  formArea.appendChild(field4);

  const label4 = figma.createText();
  label4.name = 'API Key标签';
  label4.characters = 'API Key';
  label4.fontSize = 14;
  label4.fontName = { family: 'PingFang SC', style: 'Medium' };
  label4.fills = [{ type: 'SOLID', color: color.neutral7 }];
  field4.appendChild(label4);

  const inputRow4 = figma.createFrame();
  inputRow4.name = '输入框+图标行';
  inputRow4.resize(512, 36);
  inputRow4.backgrounds = [{ type: 'SOLID', color: color.neutral0 }];
  inputRow4.strokes = [{ type: 'SOLID', color: color.neutral3 }];
  inputRow4.cornerRadius = 8;
  inputRow4.layoutMode = 'HORIZONTAL';
  inputRow4.paddingLeft = 12;
  inputRow4.primaryAxisAlignItems = 'CENTER';
  inputRow4.itemSpacing = 8;
  field4.appendChild(inputRow4);

  const input4Placeholder = figma.createText();
  input4Placeholder.name = '占位文字';
  input4Placeholder.characters = '请输入API Key';
  input4Placeholder.fontSize = 14;
  input4Placeholder.fontName = { family: 'PingFang SC', style: 'Regular' };
  input4Placeholder.fills = [{ type: 'SOLID', color: color.neutral5 }];
  inputRow4.appendChild(input4Placeholder);

  const eyeIcon = figma.createText();
  eyeIcon.name = '显示/隐藏图标';
  eyeIcon.characters = '👁';
  eyeIcon.fontSize = 16;
  eyeIcon.fills = [{ type: 'SOLID', color: color.neutral6 }];
  inputRow4.appendChild(eyeIcon);

  // === 表单字段: 模型ID ===
  const field5 = figma.createFrame();
  field5.name = '模型ID字段';
  field5.resize(512, 64);
  field5.backgrounds = [{ type: 'SOLID', color: color.neutral0 }];
  field5.layoutMode = 'VERTICAL';
  field5.itemSpacing = 8;
  formArea.appendChild(field5);

  const label5 = figma.createText();
  label5.name = '模型ID标签';
  label5.characters = '模型ID';
  label5.fontSize = 14;
  label5.fontName = { family: 'PingFang SC', style: 'Medium' };
  label5.fills = [{ type: 'SOLID', color: color.neutral7 }];
  field5.appendChild(label5);

  const select5 = figma.createFrame();
  select5.name = '模型ID下拉框';
  select5.resize(512, 36);
  select5.backgrounds = [{ type: 'SOLID', color: color.neutral0 }];
  select5.strokes = [{ type: 'SOLID', color: color.neutral3 }];
  select5.cornerRadius = 8;
  select5.layoutMode = 'HORIZONTAL';
  select5.paddingLeft = 12;
  select5.primaryAxisAlignItems = 'CENTER';
  select5.itemSpacing = 8;
  field5.appendChild(select5);

  const select5Text = figma.createText();
  select5Text.name = '选中值';
  select5Text.characters = 'deepseek-chat';
  select5Text.fontSize = 14;
  select5Text.fontName = { family: 'PingFang SC', style: 'Regular' };
  select5Text.fills = [{ type: 'SOLID', color: color.neutral8 }];
  select5.appendChild(select5Text);

  const select5Arrow = figma.createText();
  select5Arrow.name = '下拉箭头';
  select5Arrow.characters = '▼';
  select5Arrow.fontSize = 10;
  select5Arrow.fills = [{ type: 'SOLID', color: color.neutral6 }];
  select5.appendChild(select5Arrow);

  // === 按钮组 ===
  const buttonGroup = figma.createFrame();
  buttonGroup.name = '按钮组';
  buttonGroup.resize(512, 36);
  buttonGroup.backgrounds = [{ type: 'SOLID', color: color.neutral0 }];
  buttonGroup.layoutMode = 'HORIZONTAL';
  buttonGroup.counterAxisAlignItems = 'CENTER';
  buttonGroup.itemSpacing = 12;
  buttonGroup.primaryAxisAlignItems = 'END';
  dialog.appendChild(buttonGroup);

  // 取消按钮
  const cancelBtn = figma.createFrame();
  cancelBtn.name = '取消按钮';
  cancelBtn.resize(72, 36);
  cancelBtn.backgrounds = [{ type: 'SOLID', color: color.neutral0 }];
  cancelBtn.strokes = [{ type: 'SOLID', color: color.neutral3 }];
  cancelBtn.cornerRadius = 8;
  cancelBtn.layoutMode = 'HORIZONTAL';
  cancelBtn.primaryAxisAlignItems = 'CENTER';
  cancelBtn.counterAxisAlignItems = 'CENTER';
  buttonGroup.appendChild(cancelBtn);

  const cancelBtnText = figma.createText();
  cancelBtnText.name = '按钮文字';
  cancelBtnText.characters = '取消';
  cancelBtnText.fontSize = 14;
  cancelBtnText.fontName = { family: 'PingFang SC', style: 'Medium' };
  cancelBtnText.fills = [{ type: 'SOLID', color: color.neutral6 }];
  cancelBtn.appendChild(cancelBtnText);

  // 测试连接按钮
  const testBtn = figma.createFrame();
  testBtn.name = '测试连接按钮';
  testBtn.resize(88, 36);
  testBtn.backgrounds = [{ type: 'SOLID', color: color.primary }];
  testBtn.cornerRadius = 8;
  testBtn.layoutMode = 'HORIZONTAL';
  testBtn.primaryAxisAlignItems = 'CENTER';
  testBtn.counterAxisAlignItems = 'CENTER';
  buttonGroup.appendChild(testBtn);

  const testBtnText = figma.createText();
  testBtnText.name = '按钮文字';
  testBtnText.characters = '测试连接';
  testBtnText.fontSize = 14;
  testBtnText.fontName = { family: 'PingFang SC', style: 'Medium' };
  testBtnText.fills = [{ type: 'SOLID', color: color.neutral0 }];
  testBtn.appendChild(testBtnText);

  // 保存按钮
  const saveBtn = figma.createFrame();
  saveBtn.name = '保存按钮';
  saveBtn.resize(72, 36);
  saveBtn.backgrounds = [{ type: 'SOLID', color: color.primary }];
  saveBtn.cornerRadius = 8;
  saveBtn.layoutMode = 'HORIZONTAL';
  saveBtn.primaryAxisAlignItems = 'CENTER';
  saveBtn.counterAxisAlignItems = 'CENTER';
  buttonGroup.appendChild(saveBtn);

  const saveBtnText = figma.createText();
  saveBtnText.name = '按钮文字';
  saveBtnText.characters = '保存';
  saveBtnText.fontSize = 14;
  saveBtnText.fontName = { family: 'PingFang SC', style: 'Medium' };
  saveBtnText.fills = [{ type: 'SOLID', color: color.neutral0 }];
  saveBtn.appendChild(saveBtnText);

  figma.closePlugin();
}

main().catch(err => {
  console.error(err);
  figma.closePlugin();
});

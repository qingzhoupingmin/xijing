// Figma Plugin: 个人中心 (p003)
// 在 Figma 中运行此脚本生成可编辑设计稿

async function main() {
  // === 颜色变量 ===
  const color = {
    neutral0: { r: 1, g: 1, b: 1, a: 1 },           // #FFFFFF
    neutral1: { r: 0.976, g: 0.980, b: 0.984, a: 1 }, // #F9FAFB
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
  page.name = '个人中心 (p003)';
  figma.currentPage = page;

  // === 创建主框架 ===
  const mainFrame = figma.createFrame();
  mainFrame.name = '个人中心';
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
    { name: 'API配置', active: false },
    { name: '个人中心', active: true }
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
  contentArea.appendChild(headerArea);

  const pageTitle = figma.createText();
  pageTitle.name = '页面标题';
  pageTitle.characters = '个人中心';
  pageTitle.fontSize = 24;
  pageTitle.fontName = { family: 'PingFang SC', style: 'Semibold' };
  pageTitle.fills = [{ type: 'SOLID', color: color.neutral8 }];
  headerArea.appendChild(pageTitle);

  // === 表单卡片 ===
  const formCard = figma.createFrame();
  formCard.name = '表单卡片';
  formCard.resize(1172, 520);
  formCard.backgrounds = [{ type: 'SOLID', color: color.neutral0 }];
  formCard.cornerRadius = 12;
  formCard.effects = [
    { type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 0.06 }, offset: { x: 0, y: 1 }, blur: 3, spread: 0 },
    { type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 0.04 }, offset: { x: 0, y: 1 }, blur: 2, spread: 0 }
  ];
  formCard.layoutMode = 'VERTICAL';
  formCard.paddingLeft = 24;
  formCard.paddingRight = 24;
  formCard.paddingTop = 24;
  formCard.paddingBottom = 24;
  formCard.itemSpacing = 24;
  contentArea.appendChild(formCard);

  // === 昵称修改区 ===
  const nicknameSection = figma.createFrame();
  nicknameSection.name = '昵称修改区';
  nicknameSection.layoutMode = 'VERTICAL';
  nicknameSection.itemSpacing = 16;
  nicknameSection.counterAxisAlignItems = 'LEFT';
  formCard.appendChild(nicknameSection);

  const nicknameTitle = figma.createText();
  nicknameTitle.name = '分组标题';
  nicknameTitle.characters = '昵称修改';
  nicknameTitle.fontSize = 18;
  nicknameTitle.fontName = { family: 'PingFang SC', style: 'Semibold' };
  nicknameTitle.fills = [{ type: 'SOLID', color: color.neutral8 }];
  nicknameSection.appendChild(nicknameTitle);

  const nicknameRow = figma.createFrame();
  nicknameRow.name = '昵称输入行';
  nicknameRow.layoutMode = 'HORIZONTAL';
  nicknameRow.itemSpacing = 16;
  nicknameRow.counterAxisAlignItems = 'CENTER';
  nicknameSection.appendChild(nicknameRow);

  const nicknameLabel = figma.createText();
  nicknameLabel.name = '标签';
  nicknameLabel.characters = '昵称';
  nicknameLabel.fontSize = 14;
  nicknameLabel.fontName = { family: 'PingFang SC', style: 'Regular' };
  nicknameLabel.fills = [{ type: 'SOLID', color: color.neutral7 }];
  nicknameRow.appendChild(nicknameLabel);

  const currentNickname = figma.createText();
  currentNickname.name = '当前值';
  currentNickname.characters = '当前值: 林夜';
  currentNickname.fontSize = 16;
  currentNickname.fontName = { family: 'PingFang SC', style: 'Medium' };
  currentNickname.fills = [{ type: 'SOLID', color: color.neutral8 }];
  nicknameRow.appendChild(currentNickname);

  const nicknameInput = figma.createFrame();
  nicknameInput.name = '新昵称输入框';
  nicknameInput.resize(320, 40);
  nicknameInput.backgrounds = [{ type: 'SOLID', color: color.neutral0 }];
  nicknameInput.strokes = [{ type: 'SOLID', color: color.neutral3 }];
  nicknameInput.cornerRadius = 8;
  nicknameInput.layoutMode = 'HORIZONTAL';
  nicknameInput.paddingLeft = 12;
  nicknameInput.counterAxisAlignItems = 'CENTER';
  nicknameRow.appendChild(nicknameInput);

  const nicknamePlaceholder = figma.createText();
  nicknamePlaceholder.name = '占位符';
  nicknamePlaceholder.characters = '请输入新昵称';
  nicknamePlaceholder.fontSize = 14;
  nicknamePlaceholder.fontName = { family: 'PingFang SC', style: 'Regular' };
  nicknamePlaceholder.fills = [{ type: 'SOLID', color: color.neutral3 }];
  nicknameInput.appendChild(nicknamePlaceholder);

  const saveButton = figma.createFrame();
  saveButton.name = '保存按钮';
  saveButton.resize(80, 36);
  saveButton.backgrounds = [{ type: 'SOLID', color: color.primary }];
  saveButton.cornerRadius = 8;
  saveButton.effects = [{ type: 'DROP_SHADOW', color: { r: 0.486, g: 0.361, b: 0.988, a: 0.25 }, offset: { x: 0, y: 4 }, blur: 14, spread: 0 }];
  saveButton.layoutMode = 'HORIZONTAL';
  saveButton.primaryAxisAlignItems = 'CENTER';
  saveButton.counterAxisAlignItems = 'CENTER';
  nicknameRow.appendChild(saveButton);

  const saveButtonText = figma.createText();
  saveButtonText.name = '按钮文字';
  saveButtonText.characters = '保存';
  saveButtonText.fontSize = 14;
  saveButtonText.fontName = { family: 'PingFang SC', style: 'Medium' };
  saveButtonText.fills = [{ type: 'SOLID', color: color.neutral0 }];
  saveButton.appendChild(saveButtonText);

  // === 分隔线 ===
  const divider = figma.createRectangle();
  divider.name = '分隔线';
  divider.resize(1124, 1);
  divider.fills = [{ type: 'SOLID', color: color.neutral3 }];
  formCard.appendChild(divider);

  // === 密码修改区 ===
  const passwordSection = figma.createFrame();
  passwordSection.name = '密码修改区';
  passwordSection.layoutMode = 'VERTICAL';
  passwordSection.itemSpacing = 16;
  passwordSection.counterAxisAlignItems = 'LEFT';
  formCard.appendChild(passwordSection);

  const passwordTitle = figma.createText();
  passwordTitle.name = '分组标题';
  passwordTitle.characters = '密码修改';
  passwordTitle.fontSize = 18;
  passwordTitle.fontName = { family: 'PingFang SC', style: 'Semibold' };
  passwordTitle.fills = [{ type: 'SOLID', color: color.neutral8 }];
  passwordSection.appendChild(passwordTitle);

  // 旧密码
  const oldPasswordRow = figma.createFrame();
  oldPasswordRow.name = '旧密码行';
  oldPasswordRow.layoutMode = 'HORIZONTAL';
  oldPasswordRow.itemSpacing = 16;
  oldPasswordRow.counterAxisAlignItems = 'CENTER';
  passwordSection.appendChild(oldPasswordRow);

  const oldPasswordLabel = figma.createText();
  oldPasswordLabel.name = '标签';
  oldPasswordLabel.characters = '旧密码';
  oldPasswordLabel.fontSize = 14;
  oldPasswordLabel.fontName = { family: 'PingFang SC', style: 'Regular' };
  oldPasswordLabel.fills = [{ type: 'SOLID', color: color.neutral7 }];
  oldPasswordRow.appendChild(oldPasswordLabel);

  const oldPasswordInput = figma.createFrame();
  oldPasswordInput.name = '输入框';
  oldPasswordInput.resize(320, 40);
  oldPasswordInput.backgrounds = [{ type: 'SOLID', color: color.neutral0 }];
  oldPasswordInput.strokes = [{ type: 'SOLID', color: color.neutral3 }];
  oldPasswordInput.cornerRadius = 8;
  oldPasswordInput.layoutMode = 'HORIZONTAL';
  oldPasswordInput.paddingLeft = 12;
  oldPasswordInput.counterAxisAlignItems = 'CENTER';
  oldPasswordRow.appendChild(oldPasswordInput);

  const oldPasswordPlaceholder = figma.createText();
  oldPasswordPlaceholder.name = '占位符';
  oldPasswordPlaceholder.characters = '请输入旧密码';
  oldPasswordPlaceholder.fontSize = 14;
  oldPasswordPlaceholder.fontName = { family: 'PingFang SC', style: 'Regular' };
  oldPasswordPlaceholder.fills = [{ type: 'SOLID', color: color.neutral3 }];
  oldPasswordInput.appendChild(oldPasswordPlaceholder);

  // 新密码
  const newPasswordRow = figma.createFrame();
  newPasswordRow.name = '新密码行';
  newPasswordRow.layoutMode = 'HORIZONTAL';
  newPasswordRow.itemSpacing = 16;
  newPasswordRow.counterAxisAlignItems = 'CENTER';
  passwordSection.appendChild(newPasswordRow);

  const newPasswordLabel = figma.createText();
  newPasswordLabel.name = '标签';
  newPasswordLabel.characters = '新密码';
  newPasswordLabel.fontSize = 14;
  newPasswordLabel.fontName = { family: 'PingFang SC', style: 'Regular' };
  newPasswordLabel.fills = [{ type: 'SOLID', color: color.neutral7 }];
  newPasswordRow.appendChild(newPasswordLabel);

  const newPasswordInput = figma.createFrame();
  newPasswordInput.name = '输入框';
  newPasswordInput.resize(320, 40);
  newPasswordInput.backgrounds = [{ type: 'SOLID', color: color.neutral0 }];
  newPasswordInput.strokes = [{ type: 'SOLID', color: color.neutral3 }];
  newPasswordInput.cornerRadius = 8;
  newPasswordInput.layoutMode = 'HORIZONTAL';
  newPasswordInput.paddingLeft = 12;
  newPasswordInput.counterAxisAlignItems = 'CENTER';
  newPasswordRow.appendChild(newPasswordInput);

  const newPasswordPlaceholder = figma.createText();
  newPasswordPlaceholder.name = '占位符';
  newPasswordPlaceholder.characters = '请输入新密码';
  newPasswordPlaceholder.fontSize = 14;
  newPasswordPlaceholder.fontName = { family: 'PingFang SC', style: 'Regular' };
  newPasswordPlaceholder.fills = [{ type: 'SOLID', color: color.neutral3 }];
  newPasswordInput.appendChild(newPasswordPlaceholder);

  // 确认密码
  const confirmPasswordRow = figma.createFrame();
  confirmPasswordRow.name = '确认密码行';
  confirmPasswordRow.layoutMode = 'HORIZONTAL';
  confirmPasswordRow.itemSpacing = 16;
  confirmPasswordRow.counterAxisAlignItems = 'CENTER';
  passwordSection.appendChild(confirmPasswordRow);

  const confirmPasswordLabel = figma.createText();
  confirmPasswordLabel.name = '标签';
  confirmPasswordLabel.characters = '确认密码';
  confirmPasswordLabel.fontSize = 14;
  confirmPasswordLabel.fontName = { family: 'PingFang SC', style: 'Regular' };
  confirmPasswordLabel.fills = [{ type: 'SOLID', color: color.neutral7 }];
  confirmPasswordRow.appendChild(confirmPasswordLabel);

  const confirmPasswordInput = figma.createFrame();
  confirmPasswordInput.name = '输入框';
  confirmPasswordInput.resize(320, 40);
  confirmPasswordInput.backgrounds = [{ type: 'SOLID', color: color.neutral0 }];
  confirmPasswordInput.strokes = [{ type: 'SOLID', color: color.neutral3 }];
  confirmPasswordInput.cornerRadius = 8;
  confirmPasswordInput.layoutMode = 'HORIZONTAL';
  confirmPasswordInput.paddingLeft = 12;
  confirmPasswordInput.counterAxisAlignItems = 'CENTER';
  confirmPasswordRow.appendChild(confirmPasswordInput);

  const confirmPasswordPlaceholder = figma.createText();
  confirmPasswordPlaceholder.name = '占位符';
  confirmPasswordPlaceholder.characters = '请再次输入新密码';
  confirmPasswordPlaceholder.fontSize = 14;
  confirmPasswordPlaceholder.fontName = { family: 'PingFang SC', style: 'Regular' };
  confirmPasswordPlaceholder.fills = [{ type: 'SOLID', color: color.neutral3 }];
  confirmPasswordInput.appendChild(confirmPasswordPlaceholder);

  const changePasswordButton = figma.createFrame();
  changePasswordButton.name = '修改密码按钮';
  changePasswordButton.resize(120, 36);
  changePasswordButton.backgrounds = [{ type: 'SOLID', color: color.primary }];
  changePasswordButton.cornerRadius = 8;
  changePasswordButton.effects = [{ type: 'DROP_SHADOW', color: { r: 0.486, g: 0.361, b: 0.988, a: 0.25 }, offset: { x: 0, y: 4 }, blur: 14, spread: 0 }];
  changePasswordButton.layoutMode = 'HORIZONTAL';
  changePasswordButton.primaryAxisAlignItems = 'CENTER';
  changePasswordButton.counterAxisAlignItems = 'CENTER';
  confirmPasswordRow.appendChild(changePasswordButton);

  const changePasswordButtonText = figma.createText();
  changePasswordButtonText.name = '按钮文字';
  changePasswordButtonText.characters = '修改密码';
  changePasswordButtonText.fontSize = 14;
  changePasswordButtonText.fontName = { family: 'PingFang SC', style: 'Medium' };
  changePasswordButtonText.fills = [{ type: 'SOLID', color: color.neutral0 }];
  changePasswordButton.appendChild(changePasswordButtonText);

  figma.closePlugin();
}

main().catch(err => {
  console.error(err);
  figma.closePlugin();
});

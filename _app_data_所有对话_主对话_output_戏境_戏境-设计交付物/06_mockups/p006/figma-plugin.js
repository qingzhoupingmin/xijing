// Figma Plugin: 登录页 (p006) - Tab切换版
// 在 Figma 中运行此脚本生成可编辑设计稿

async function main() {
  // === 颜色变量 ===
  const color = {
    neutral0: { r: 1, g: 1, b: 1, a: 1 },           // #FFFFFF
    neutral1: { r: 0.976, g: 0.980, b: 0.984, a: 1 }, // #F9FAFB
    neutral3: { r: 0.898, g: 0.906, b: 0.922, a: 1 }, // #E5E7EB
    neutral5: { r: 0.612, g: 0.639, b: 0.686, a: 1 }, // #9CA3AF
    neutral6: { r: 0.420, g: 0.447, b: 0.502, a: 1 }, // #6B7280
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
  
  const varPrimary = figma.variables.createVariable('color', collection, 'primary');
  varPrimary.resolvedType = 'COLOR';
  varPrimary.setValueForMode(mode, color.primary);
  
  const varPrimaryDark = figma.variables.createVariable('color', collection, 'primary/dark');
  varPrimaryDark.resolvedType = 'COLOR';
  varPrimaryDark.setValueForMode(mode, color.primaryDark);

  // === 创建页面 ===
  const page = figma.createPage();
  page.name = '登录页 (p006)';
  figma.currentPage = page;

  // === 创建主框架 ===
  const frame = figma.createFrame();
  frame.name = '登录页';
  frame.resize(1440, 900);
  frame.backgrounds = [{ type: 'SOLID', color: color.neutral1 }];
  frame.fills = [{ type: 'SOLID', color: color.neutral1 }];
  frame.layoutMode = 'HORIZONTAL';
  frame.primaryAxisSizingMode = 'FIXED';
  frame.counterAxisSizingMode = 'FIXED';
  frame.itemSpacing = 0;

  // === 登录卡片容器（用于居中） ===
  const cardContainer = figma.createFrame();
  cardContainer.name = '居中容器';
  cardContainer.resize(1440, 900);
  cardContainer.backgrounds = [{ type: 'SOLID', color: color.neutral1 }];
  cardContainer.layoutMode = 'VERTICAL';
  cardContainer.primaryAxisAlignItems = 'CENTER';
  cardContainer.counterAxisAlignItems = 'CENTER';
  frame.appendChild(cardContainer);

  // === 背景紫色光晕装饰 ===
  const bgGlow = figma.createEllipse();
  bgGlow.name = '背景光晕';
  bgGlow.resize(600, 400);
  bgGlow.fills = [{ type: 'SOLID', color: { r: 0.486, g: 0.361, b: 0.988, a: 0.08 } }];
  bgGlow.blur = 80;
  cardContainer.appendChild(bgGlow);

  // === 登录卡片 ===
  const loginCard = figma.createFrame();
  loginCard.name = '登录卡片';
  loginCard.resize(400, 560);
  loginCard.backgrounds = [{ type: 'SOLID', color: color.neutral0 }];
  loginCard.cornerRadius = 16;
  loginCard.effects = [
    { type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 0.06 }, offset: { x: 0, y: 1 }, blur: 3, spread: 0 },
    { type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: 0.04 }, offset: { x: 0, y: 1 }, blur: 2, spread: 0 }
  ];
  loginCard.layoutMode = 'VERTICAL';
  loginCard.paddingLeft = 32;
  loginCard.paddingRight = 32;
  loginCard.paddingTop = 32;
  loginCard.paddingBottom = 32;
  loginCard.counterAxisAlignItems = 'CENTER';
  loginCard.itemSpacing = 16;
  cardContainer.appendChild(loginCard);

  // === 顶部渐变装饰线 ===
  const topAccent = figma.createRectangle();
  topAccent.name = '顶部装饰';
  topAccent.resize(400, 2);
  topAccent.fills = [{
    type: 'GRADIENT_LINEAR',
    gradientHandlePositions: [{ x: 0, y: 0.5 }, { x: 1, y: 0.5 }],
    gradientStops: [
      { position: 0, color: color.primary },
      { position: 1, color: color.secondary }
    ]
  }];
  loginCard.appendChild(topAccent);

  // === Logo 文字 ===
  const logo = figma.createText();
  logo.name = 'Logo';
  logo.characters = '戏境';
  logo.fontSize = 32;
  logo.fontName = { family: 'PingFang SC', style: 'Bold' };
  logo.fills = [{ type: 'SOLID', color: color.primary }];
  logo.textAlignHorizontal = 'CENTER';
  loginCard.appendChild(logo);

  // === 副标题 ===
  const subtitle = figma.createText();
  subtitle.name = '副标题';
  subtitle.characters = 'AI驱动互动叙事平台';
  subtitle.fontSize = 12;
  subtitle.fontName = { family: 'PingFang SC', style: 'Regular' };
  subtitle.fills = [{ type: 'SOLID', color: color.neutral6 }];
  subtitle.textAlignHorizontal = 'CENTER';
  loginCard.appendChild(subtitle);

  // ============================================================
  // === TabSwitch 组件 ===
  // 交互逻辑：点击Tab切换显示对应表单（登录/注册）
  // ============================================================
  const tabSwitch = figma.createFrame();
  tabSwitch.name = 'TabSwitch';
  tabSwitch.resize(336, 40);
  tabSwitch.backgrounds = [{ type: 'SOLID', color: color.neutral0 }];
  tabSwitch.layoutMode = 'HORIZONTAL';
  tabSwitch.counterAxisAlignItems = 'STRETCH';
  tabSwitch.itemSpacing = 0;
  loginCard.appendChild(tabSwitch);

  // --- Tab: 登录 ---
  const loginTab = figma.createFrame();
  loginTab.name = 'Tab-登录';
  loginTab.resize(168, 40);
  loginTab.backgrounds = [{ type: 'SOLID', color: color.neutral0 }];
  loginTab.layoutMode = 'VERTICAL';
  loginTab.primaryAxisAlignItems = 'CENTER';
  loginTab.counterAxisAlignItems = 'CENTER';
  tabSwitch.appendChild(loginTab);

  const loginTabText = figma.createText();
  loginTabText.name = 'Tab文字';
  loginTabText.characters = '登录';
  loginTabText.fontSize = 14;
  loginTabText.fontName = { family: 'PingFang SC', style: 'Medium' };
  loginTabText.fills = [{ type: 'SOLID', color: color.neutral6 }]; // 未选中态：灰色
  loginTab.appendChild(loginTabText);

  // --- Tab: 注册 (当前选中) ---
  const registerTab = figma.createFrame();
  registerTab.name = 'Tab-注册';
  registerTab.resize(168, 40);
  registerTab.backgrounds = [{ type: 'SOLID', color: color.neutral0 }];
  registerTab.layoutMode = 'VERTICAL';
  registerTab.primaryAxisAlignItems = 'CENTER';
  registerTab.counterAxisAlignItems = 'CENTER';
  tabSwitch.appendChild(registerTab);

  const registerTabText = figma.createText();
  registerTabText.name = 'Tab文字';
  registerTabText.characters = '注册';
  registerTabText.fontSize = 14;
  registerTabText.fontName = { family: 'PingFang SC', style: 'Medium' };
  registerTabText.fills = [{ type: 'SOLID', color: color.primary }]; // 选中态：紫色
  registerTab.appendChild(registerTabText);

  // --- Tab下划线 (选中态) ---
  const tabUnderline = figma.createRectangle();
  tabUnderline.name = 'Tab下划线';
  tabUnderline.resize(40, 2);
  tabUnderline.fills = [{ type: 'SOLID', color: color.primary }];
  tabUnderline.relativeTransform = { parent: registerTab, x: 64, y: 38 }; // 居中于"注册"文字下方
  registerTab.appendChild(tabUnderline);

  // ============================================================
  // === 注册表单（当前显示）===
  // 交互逻辑：Tab切换时隐藏/显示对应表单
  // ============================================================
  const registerForm = figma.createFrame();
  registerForm.name = '注册表单';
  registerForm.resize(336, 360);
  registerForm.backgrounds = [{ type: 'SOLID', color: color.neutral0 }];
  registerForm.layoutMode = 'VERTICAL';
  registerForm.counterAxisAlignItems = 'CENTER';
  registerForm.itemSpacing = 16;
  loginCard.appendChild(registerForm);

  // --- 邮箱输入框 ---
  const emailInput = figma.createFrame();
  emailInput.name = '邮箱输入框';
  emailInput.resize(336, 36);
  emailInput.backgrounds = [{ type: 'SOLID', color: color.neutral0 }];
  emailInput.strokes = [{ type: 'SOLID', color: color.neutral3 }];
  emailInput.cornerRadius = 8;
  emailInput.layoutMode = 'HORIZONTAL';
  emailInput.paddingLeft = 12;
  emailInput.paddingRight = 12;
  registerForm.appendChild(emailInput);

  const emailPlaceholder = figma.createText();
  emailPlaceholder.name = '邮箱占位符';
  emailPlaceholder.characters = '请输入邮箱';
  emailPlaceholder.fontSize = 14;
  emailPlaceholder.fontName = { family: 'PingFang SC', style: 'Regular' };
  emailPlaceholder.fills = [{ type: 'SOLID', color: color.neutral5 }];
  emailInput.appendChild(emailPlaceholder);

  // --- 密码输入框 ---
  const passwordInput = figma.createFrame();
  passwordInput.name = '密码输入框';
  passwordInput.resize(336, 36);
  passwordInput.backgrounds = [{ type: 'SOLID', color: color.neutral0 }];
  passwordInput.strokes = [{ type: 'SOLID', color: color.neutral3 }];
  passwordInput.cornerRadius = 8;
  passwordInput.layoutMode = 'HORIZONTAL';
  passwordInput.paddingLeft = 12;
  passwordInput.paddingRight = 12;
  registerForm.appendChild(passwordInput);

  const passwordPlaceholder = figma.createText();
  passwordPlaceholder.name = '密码占位符';
  passwordPlaceholder.characters = '请输入密码';
  passwordPlaceholder.fontSize = 14;
  passwordPlaceholder.fontName = { family: 'PingFang SC', style: 'Regular' };
  passwordPlaceholder.fills = [{ type: 'SOLID', color: color.neutral5 }];
  passwordInput.appendChild(passwordPlaceholder);

  // --- 确认密码输入框 ---
  const confirmPasswordInput = figma.createFrame();
  confirmPasswordInput.name = '确认密码输入框';
  confirmPasswordInput.resize(336, 36);
  confirmPasswordInput.backgrounds = [{ type: 'SOLID', color: color.neutral0 }];
  confirmPasswordInput.strokes = [{ type: 'SOLID', color: color.neutral3 }];
  confirmPasswordInput.cornerRadius = 8;
  confirmPasswordInput.layoutMode = 'HORIZONTAL';
  confirmPasswordInput.paddingLeft = 12;
  confirmPasswordInput.paddingRight = 12;
  registerForm.appendChild(confirmPasswordInput);

  const confirmPasswordPlaceholder = figma.createText();
  confirmPasswordPlaceholder.name = '确认密码占位符';
  confirmPasswordPlaceholder.characters = '请再次输入密码';
  confirmPasswordPlaceholder.fontSize = 14;
  confirmPasswordPlaceholder.fontName = { family: 'PingFang SC', style: 'Regular' };
  confirmPasswordPlaceholder.fills = [{ type: 'SOLID', color: color.neutral5 }];
  confirmPasswordInput.appendChild(confirmPasswordPlaceholder);

  // --- 注册按钮 ---
  const registerButton = figma.createFrame();
  registerButton.name = '注册按钮';
  registerButton.resize(336, 44);
  registerButton.backgrounds = [{ type: 'SOLID', color: color.primary }];
  registerButton.cornerRadius = 8;
  registerButton.effects = [{ type: 'DROP_SHADOW', color: { r: 0.486, g: 0.361, b: 0.988, a: 0.25 }, offset: { x: 0, y: 4 }, blur: 14, spread: 0 }];
  registerButton.layoutMode = 'HORIZONTAL';
  registerButton.primaryAxisAlignItems = 'CENTER';
  registerButton.counterAxisAlignItems = 'CENTER';
  registerForm.appendChild(registerButton);

  const registerButtonText = figma.createText();
  registerButtonText.name = '按钮文字';
  registerButtonText.characters = '注册';
  registerButtonText.fontSize = 16;
  registerButtonText.fontName = { family: 'PingFang SC', style: 'Medium' };
  registerButtonText.fills = [{ type: 'SOLID', color: color.neutral0 }];
  registerButton.appendChild(registerButtonText);

  // --- 底部链接：已有账号？登录 ---
  const loginLink = figma.createText();
  loginLink.name = '登录链接';
  loginLink.characters = '已有账号？登录';
  loginLink.fontSize = 14;
  loginLink.fontName = { family: 'PingFang SC', style: 'Medium' };
  loginLink.fills = [{ type: 'SOLID', color: color.primary }];
  loginLink.textAlignHorizontal = 'CENTER';
  registerForm.appendChild(loginLink);

  // ============================================================
  // === 登录表单（隐藏状态，Tab切换时显示）===
  // 交互逻辑：Tab切换时隐藏/显示对应表单
  // ============================================================
  const loginForm = figma.createFrame();
  loginForm.name = '登录表单 (隐藏)';
  loginForm.resize(336, 280);
  loginForm.visible = false; // 默认隐藏
  loginForm.backgrounds = [{ type: 'SOLID', color: color.neutral0 }];
  loginForm.layoutMode = 'VERTICAL';
  loginForm.counterAxisAlignItems = 'CENTER';
  loginForm.itemSpacing = 16;
  loginCard.appendChild(loginForm);

  // --- 登录邮箱输入框 ---
  const loginEmailInput = figma.createFrame();
  loginEmailInput.name = '邮箱输入框';
  loginEmailInput.resize(336, 36);
  loginEmailInput.backgrounds = [{ type: 'SOLID', color: color.neutral0 }];
  loginEmailInput.strokes = [{ type: 'SOLID', color: color.neutral3 }];
  loginEmailInput.cornerRadius = 8;
  loginEmailInput.layoutMode = 'HORIZONTAL';
  loginEmailInput.paddingLeft = 12;
  loginEmailInput.paddingRight = 12;
  loginForm.appendChild(loginEmailInput);

  const loginEmailPlaceholder = figma.createText();
  loginEmailPlaceholder.name = '邮箱占位符';
  loginEmailPlaceholder.characters = '请输入邮箱';
  loginEmailPlaceholder.fontSize = 14;
  loginEmailPlaceholder.fontName = { family: 'PingFang SC', style: 'Regular' };
  loginEmailPlaceholder.fills = [{ type: 'SOLID', color: color.neutral5 }];
  loginEmailInput.appendChild(loginEmailPlaceholder);

  // --- 登录密码输入框 ---
  const loginPasswordInput = figma.createFrame();
  loginPasswordInput.name = '密码输入框';
  loginPasswordInput.resize(336, 36);
  loginPasswordInput.backgrounds = [{ type: 'SOLID', color: color.neutral0 }];
  loginPasswordInput.strokes = [{ type: 'SOLID', color: color.neutral3 }];
  loginPasswordInput.cornerRadius = 8;
  loginPasswordInput.layoutMode = 'HORIZONTAL';
  loginPasswordInput.paddingLeft = 12;
  loginPasswordInput.paddingRight = 12;
  loginForm.appendChild(loginPasswordInput);

  const loginPasswordPlaceholder = figma.createText();
  loginPasswordPlaceholder.name = '密码占位符';
  loginPasswordPlaceholder.characters = '请输入密码';
  loginPasswordPlaceholder.fontSize = 14;
  loginPasswordPlaceholder.fontName = { family: 'PingFang SC', style: 'Regular' };
  loginPasswordPlaceholder.fills = [{ type: 'SOLID', color: color.neutral5 }];
  loginPasswordInput.appendChild(loginPasswordPlaceholder);

  // --- 登录按钮 ---
  const loginButton = figma.createFrame();
  loginButton.name = '登录按钮';
  loginButton.resize(336, 44);
  loginButton.backgrounds = [{ type: 'SOLID', color: color.primary }];
  loginButton.cornerRadius = 8;
  loginButton.effects = [{ type: 'DROP_SHADOW', color: { r: 0.486, g: 0.361, b: 0.988, a: 0.25 }, offset: { x: 0, y: 4 }, blur: 14, spread: 0 }];
  loginButton.layoutMode = 'HORIZONTAL';
  loginButton.primaryAxisAlignItems = 'CENTER';
  loginButton.counterAxisAlignItems = 'CENTER';
  loginForm.appendChild(loginButton);

  const loginButtonText = figma.createText();
  loginButtonText.name = '按钮文字';
  loginButtonText.characters = '登录';
  loginButtonText.fontSize = 16;
  loginButtonText.fontName = { family: 'PingFang SC', style: 'Medium' };
  loginButtonText.fills = [{ type: 'SOLID', color: color.neutral0 }];
  loginButton.appendChild(loginButtonText);

  // --- 底部链接：没有账号？注册 ---
  const registerLink = figma.createText();
  registerLink.name = '注册链接';
  registerLink.characters = '没有账号？注册';
  registerLink.fontSize = 14;
  registerLink.fontName = { family: 'PingFang SC', style: 'Medium' };
  registerLink.fills = [{ type: 'SOLID', color: color.primary }];
  registerLink.textAlignHorizontal = 'CENTER';
  loginForm.appendChild(registerLink);

  // ============================================================
  // === 组件命名与分组 ===
  // ============================================================
  // TabSwitch 组件：包含 loginTab 和 registerTab
  // 注册表单：邮箱 + 密码 + 确认密码 + 注册按钮
  // 登录表单：邮箱 + 密码 + 登录按钮

  figma.closePlugin();
}

main().catch(err => {
  console.error(err);
  figma.closePlugin();
});

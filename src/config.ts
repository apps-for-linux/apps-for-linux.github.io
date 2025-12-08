import type {
	AnnouncementConfig,
	FooterConfig,
	NavBarConfig,
	ParticleConfig,
	PostConfig,
	ProfileConfig,
	SidebarLayoutConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";
import {
	detectBrowserLanguage,
	getTranslateLanguageFromConfig,
} from "./utils/language-utils";

/**
 *
 */

// 自动检测浏览器语言
const SITE_LANG = detectBrowserLanguage("en"); // 服务端渲染时默认为 'en'
// 如果需要强制使用特定语言，可以取消注释下面一行并设置语言代码
//const SITE_LANG = "zh"; // 强制使用的语言代码，'zh', 'en', 'ja' 等

// 设置网站时区
const SITE_TIMEZONE = 3; // from -12 to 12 default in UTC+3

// 站点配置
export const siteConfig: SiteConfig = {
	// 站点 URL（以斜杠结尾）
	siteURL: "https://apps-for-linux.github.io/", // 请替换为你的站点 URL 并以斜杠结尾
	// 站点标题
	title: "Apps For Linux",
	// 站点副标题
	subtitle: "Blog Template",
	// 语言配置
	lang: SITE_LANG, // 自动检测的浏览器语言
	// 翻译配置
	translate: {
		// 启用翻译功能
		enable: true,
		// 翻译服务
		service: "client.edge", // 使用 Edge 浏览器
		// 默认翻译语言
		defaultLanguage: getTranslateLanguageFromConfig(SITE_LANG), // 根据检测到的语言自动设置默认翻译语言
		// 显示语言选择下拉框
		showSelectTag: false, // 使用自定义按钮
		// 自动检测用户语言
		autoDiscriminate: true,
		// 翻译时忽略的 CSS 类名
		ignoreClasses: ["ignore", "banner-title", "banner-subtitle"],
		// 翻译时忽略的 HTML 标签
		ignoreTags: ["script", "style", "code", "pre"],
	},
	// 时区配置
	timeZone: SITE_TIMEZONE,
	// 字体配置
	// 主题色配置
	themeColor: {
		// 主题色的默认色相 (范围从 0 到 360。例如：红色：0，青色：200，蓝绿色：250，粉色：345)
		hue: 255,
		// 对访问者隐藏主题色选择器
		fixed: false,
	},
	// 默认主题 ("system" 跟随系统 | "light" 浅色 | "dark" 深色)
	defaultTheme: "system",
	// 壁纸配置
};

/**
 *
 */

// 导航栏配置
export const navBarConfig: NavBarConfig = {
	// 链接配置 (支持多级菜单)
	links: [
		LinkPreset.Home,
		{
			name: "Links",
			url: "/links/",
			icon: "material-symbols:link",
			children: [
				{
					name: "GitHub",
					url: "https://github.com/apps-for-linux/apps-for-linux.github.io",
					external: true,
					icon: "fa6-brands:github",
				},
			],
		},
		{
			name: "About",
			url: "/content/",
			icon: "material-symbols:info",
		},
	],
};

/**
 *
 */

// 侧边栏布局配置
export const sidebarLayoutConfig: SidebarLayoutConfig = {
	// 侧边栏组件配置列表
	components: [
		{
			// 组件类型
			type: "profile", // 用户资料组件
			// 是否启用该组件
			enable: true,
			// 组件所属侧边栏
			side: "left",
			// 组件显示顺序 (数字越小越靠前)
			order: 1,
			// 组件位置
			position: "top", // 固定在顶部
			// CSS 类名，用于应用样式和动画
			class: "onload-animation",
			// 动画延迟时间 (毫秒) ，用于错开动画效果
			animationDelay: 0,
		},
		{
			// 组件类型
			type: "announcement", // 公告组件
			// 是否启用该组件 (现在通过统一配置控制)
			enable: true,
			// 组件所属侧边栏
			side: "left",
			// 组件显示顺序
			order: 2,
			// 组件位置
			position: "top", // 固定在顶部
			// CSS 类名
			class: "onload-animation",
			// 动画延迟时间
			animationDelay: 50,
		},
		{
			// 组件类型
			type: "categories", // 分类组件
			// 是否启用该组件
			enable: true,
			// 组件所属侧边栏
			side: "right",
			// 组件显示顺序
			order: 3,
			// 组件位置
			position: "sticky", // 粘性定位，可滚动
			// CSS 类名
			class: "onload-animation",
			// 动画延迟时间
			animationDelay: 150,
			// 响应式配置
			responsive: {
				// 折叠阈值
				collapseThreshold: 5, // 当分类数量超过5个时自动折叠
			},
		},
		{
			// 组件类型
			type: "tags", // 标签组件
			// 是否启用该组件
			enable: true,
			// 组件所属侧边栏
			side: "right",
			// 组件显示顺序
			order: 4,
			// 组件位置
			position: "sticky", // 粘性定位，可滚动
			// CSS 类名
			class: "onload-animation",
			// 动画延迟时间
			animationDelay: 250,
			// 响应式配置
			responsive: {
				// 折叠阈值
				collapseThreshold: 20, // 当标签数量超过20个时自动折叠
			},
		},
	],
	// 默认动画配置
	defaultAnimation: {
		// 是否启用默认动画
		enable: true,
		// 基础延迟时间 (毫秒)
		baseDelay: 0,
		// 每个组件递增的延迟时间 (毫秒)
		increment: 50,
	},
	// 响应式布局配置
	responsive: {
		// 不同设备的布局模式 ("hidden" 不显示侧边栏 | "drawer" 抽屉模式 | "sidebar" 显示侧边栏)
		layout: {
			// 移动端
			mobile: "sidebar",
			// 平板端
			tablet: "sidebar",
			// 桌面端
			desktop: "sidebar",
		},
	},
};

// 资料配置
export const profileConfig: ProfileConfig = {
	// 头像配置 (相对于 /src 目录。如果以 '/' 开头，则相对于 /public 目录)
	// 信息配置
	name: "Twilight",
	// 简介配置
	bio: "Hi",
	// 链接配置
	links: [
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/Spr-Aachen/Twilight",
		},
	],
};

// 公告配置
export const announcementConfig: AnnouncementConfig = {
	// 公告标题
	title: "Announcement",
	// 公告内容
	content: "Welcome to my blog!",
	// 允许用户关闭公告
	closable: true,
	// 链接配置
	link: {
		// 启用链接
		enable: true,
		// 链接文本
		text: "Learn More",
		// 链接 URL
		url: "/about/",
		// 是否外部链接
		external: false, // 内部链接
	},
};

/**
 *
 */

// Article Configuration
export const postConfig: PostConfig = {
	// 显示“上次编辑”卡片
	showLastModified: true,
	// 在文章内容中显示封面
	showCoverInContent: false,
	// 代码高亮配置
	expressiveCode: {
		// 主题
		theme: "github-dark", // 深色背景
	},
	// 目录配置
	// 许可证配置
	license: {
		// 启用许可证
		enable: true,
		// 许可证名称
		name: "CC BY-NC-SA 4.0",
		// 许可证链接
		url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
	},
};

/**
 *
 */

// 页脚配置
export const footerConfig: FooterConfig = {
	// 启用 Footer HTML 注入功能
	enable: false,
};
// 直接编辑 FooterConfig.html 文件来添加备案号等自定义内容

/**
 *
 */

// 粒子特效配置
export const particleConfig: ParticleConfig = {
	// 启用粒子特效
	enable: true,
	// 粒子数量
	particleNum: 12,
	// 粒子越界限制次数，-1为无限循环
	limitTimes: -1,
	// 粒子尺寸配置
	size: {
		// 粒子最小尺寸倍数
		min: 0.3,
		// 粒子最大尺寸倍数
		max: 0.9,
	},
	// 粒子透明度配置
	opacity: {
		// 粒子最小不透明度
		min: 0.3,
		// 粒子最大不透明度
		max: 0.9,
	},
	// 粒子移动速度配置
	speed: {
		// 水平移动速度
		horizontal: {
			// 最小值
			min: -0.9,
			// 最大值
			max: 0.9,
		},
		// 垂直移动速度
		vertical: {
			// 最小值
			min: 0.15,
			// 最大值
			max: 0.3,
		},
		// 旋转速度
		rotation: 0.12,
		// 消失速度
		fadeSpeed: 0.12, // 不应大于最小不透明度
	},
	// 粒子层级
	zIndex: 100, // 确保粒子在合适的层级显示
};

/**
 *
 */

// 导出所有配置的统一接口
export const widgetConfigs = {
	profile: profileConfig,
	announcement: announcementConfig,
	layout: sidebarLayoutConfig,
	particle: particleConfig,
} as const;

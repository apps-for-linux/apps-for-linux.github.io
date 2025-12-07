import { BREAKPOINT_LG } from "@/constants/breakpoints";
import {
	SYSTEM_MODE,
	DARK_MODE,
	LIGHT_MODE,
	WALLPAPER_NONE,
} from "@constants/constants";
import { siteConfig } from "@/config";
import type { LIGHT_DARK_MODE, WALLPAPER_MODE } from "@/types/config";

// 声明全局函数类型
declare global {
	interface Window {
		initBannerCarousel?: () => void;
		initFullscreenWallpaperCarousel?: () => void;
		initSemifullScrollDetection?: () => void;
	}
}

/**
 * Hue
 */

export function getDefaultHue(): number {
	const fallback = "250";
	const configCarrier = document.getElementById("config-carrier");
	return Number.parseInt(configCarrier?.dataset.hue || fallback);
}

export function getHue(): number {
	const stored = localStorage.getItem("hue");
	return stored ? Number.parseInt(stored) : getDefaultHue();
}

export function setHue(hue: number): void {
	localStorage.setItem("hue", String(hue));
	const r = document.querySelector(":root") as HTMLElement;
	if (!r) {
		return;
	}
	r.style.setProperty("--hue", String(hue));
}

/**
 * Theme
 */

export function applyThemeToDocument(theme: LIGHT_DARK_MODE) {
	// 获取当前主题状态的完整信息
	const currentIsDark = document.documentElement.classList.contains("dark");
	const currentTheme = document.documentElement.getAttribute("data-theme");

	// 计算目标主题状态
	let targetIsDark: boolean;
	switch (theme) {
		case LIGHT_MODE:
			targetIsDark = false;
			break;
		case DARK_MODE:
			targetIsDark = true;
			break;
		case SYSTEM_MODE:
			targetIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
			break;
		default:
			targetIsDark = currentIsDark; // fallback to current mode if theme is unknown
			break;
	}

	// 检测是否真的需要主题切换：
	// 1. dark类状态是否改变
	// 2. expressiveCode主题是否需要更新
	const needsThemeChange = currentIsDark !== targetIsDark;
	const targetTheme = targetIsDark ? "github-dark" : "github-light";
	const needsCodeThemeUpdate = currentTheme !== targetTheme;

	// 如果既不需要主题切换也不需要代码主题更新，直接返回
	if (!needsThemeChange && !needsCodeThemeUpdate) {
		return;
	}

	// 只在需要主题切换时添加过渡保护
	if (needsThemeChange) {
		document.documentElement.classList.add("is-theme-transitioning");
	}

	// 使用 requestAnimationFrame 确保在下一帧执行，避免闪屏
	requestAnimationFrame(() => {
		// 应用主题变化
		if (needsThemeChange) {
			if (targetIsDark) {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}
		}

		// Set the theme for Expressive Code based on current mode
		document.documentElement.setAttribute("data-theme", targetTheme);

		// 在下一帧快速移除保护类，使用微任务确保DOM更新完成
		if (needsThemeChange) {
			// 使用 requestAnimationFrame 确保在下一帧移除过渡保护类
			requestAnimationFrame(() => {
				document.documentElement.classList.remove("is-theme-transitioning");
			});
		}
	});
}

// 设置主题
export function setTheme(theme: LIGHT_DARK_MODE): void {
	localStorage.setItem("theme", theme);
	applyThemeToDocument(theme);
}

// 获取存储的主题
export function getStoredTheme(): LIGHT_DARK_MODE {
	return (
		(localStorage.getItem("theme") as LIGHT_DARK_MODE) ||
		siteConfig.defaultTheme
	);
}

// 显示banner壁纸
function showBannerMode() {
	// 隐藏全屏壁纸（通过CSS类控制）
	const fullscreenContainer = document.querySelector(
		"[data-fullscreen-wallpaper]",
	);
	if (fullscreenContainer) {
		fullscreenContainer.classList.add("hidden");
	}

	// 显示banner壁纸（通过CSS类控制）
	const bannerWrapper = document.getElementById("banner-wrapper");
	if (bannerWrapper) {
		// 确保banner可见
		bannerWrapper.classList.remove("hidden");
		bannerWrapper.classList.remove("opacity-0");
		bannerWrapper.classList.add("opacity-100");
		bannerWrapper.classList.remove("mobile-hide-banner");
		// 更新主内容位置
		const mainContentWrapper = document.querySelector(
			".absolute.w-full.z-30",
		) as HTMLElement | null;
		if (mainContentWrapper) {
			mainContentWrapper.classList.remove("mobile-main-no-banner");
			mainContentWrapper.style.top = ""; // 重置top样式
		}
		// 在移动端非首页时隐藏banner
		const isMobile = window.innerWidth < BREAKPOINT_LG;
		const navbar = document.getElementById("navbar");
		const dataIsHome = navbar?.getAttribute("data-is-home");
		const isHome =
			dataIsHome != null
				? dataIsHome === "true"
				: location.pathname === "/" || location.pathname === "";
		if (isMobile && !isHome) {
			bannerWrapper.classList.add("mobile-hide-banner");
			if (mainContentWrapper) {
				mainContentWrapper.classList.add("mobile-main-no-banner");
				mainContentWrapper.style.top = "5.5rem";
			}
		}
	}
	// 组件现在自动处理轮播初始化

	// 调整主内容透明度
	adjustMainContentTransparency(true);
}

// 隐藏所有壁纸
function hideAllWallpapers() {
	// 隐藏所有壁纸（通过CSS类控制）
	const bannerWrapper = document.getElementById("banner-wrapper");
	const fullscreenContainer = document.querySelector(
		"[data-fullscreen-wallpaper]",
	);

	if (bannerWrapper) {
		bannerWrapper.classList.add("hidden");
	}

	if (fullscreenContainer) {
		fullscreenContainer.classList.add("hidden");
	}

	// 调整主内容位置和透明度
	adjustMainContentPosition("none");
	adjustMainContentTransparency(false);
}

// 更新导航栏透明模式

// 调整主内容位置
function adjustMainContentPosition(mode: "none") {
	const mainContent = document.querySelector(
		".absolute.w-full.z-30",
	) as HTMLElement;
	if (!mainContent) return;

	// 移除现有的位置类
	mainContent.classList.remove("mobile-main-no-banner", "no-banner-layout");

	switch (mode) {
		default:
			mainContent.classList.add("no-banner-layout");
			mainContent.style.top = "5.5rem";
			break;
	}
}

function adjustMainContentTransparency(enable: boolean) {
	const mainContent = document.querySelector(".absolute.w-full.z-30");
	if (!mainContent) return;

	if (enable) {
		mainContent.classList.add("wallpaper-transparent");
	} else {
		mainContent.classList.remove("wallpaper-transparent");
	}
}

function reinitializeComponents(mode: WALLPAPER_MODE) {
	// 重新初始化相关组件
	switch (mode) {
		case WALLPAPER_NONE:
			// 无需特殊初始化
			break;
	}
}

/*
 * @Author: 937bb
 * @email: 3535025404@qq.com
 * @Date: 2025-06-24 09:16:15
 * @LastEditors: 937bb
 * @LastEditTime: 2025-06-26 14:59:57
 */
import { useRuntimeConfig } from "#app";

export function useGlobalConfig() {
	const config = useRuntimeConfig();
	// console.log(config.public);
	return {
		siteName: config.public.VITE_SITE_NAME || "WebAPI接口",
		apiBase: config.public.VITE_BASE_URL || "",
		icp: config.public.VITE_ICP || "",
		icpUrl: "https://beian.miit.gov.cn/",
		author: config.public.VITE_AUTHOR || "",
	};
}

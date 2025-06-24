import { useRuntimeConfig } from "#app";

export function useGlobalConfig() {
	const config = useRuntimeConfig();
	return {
		siteName: config.public.VITE_SITE_NAME || "WebAPI接口",
		apiBase: config.public.VITE_API_BASE || "",
		icp: config.public.VITE_ICP || "",
		icpUrl: "https://beian.miit.gov.cn/",
		author: config.public.VITE_AUTHOR || "",
	};
}

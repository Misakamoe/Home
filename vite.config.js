import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { createHtmlPlugin } from "vite-plugin-html";
import { resolve } from "path";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default ({ mode }) =>
	defineConfig({
		plugins: [
			vue(),
			AutoImport({
				resolvers: [ElementPlusResolver()],
			}),
			Components({
				resolvers: [ElementPlusResolver()],
			}),
			createHtmlPlugin({
				minify: true,
				template: "index.html",
				inject: {
					data: {
						logo: loadEnv(mode, process.cwd()).VITE_SITE_LOGO,
						appleLogo: loadEnv(mode, process.cwd()).VITE_SITE_APPLE_LOGO,
						title: loadEnv(mode, process.cwd()).VITE_SITE_NAME,
						author: loadEnv(mode, process.cwd()).VITE_SITE_ANTHOR,
						keywords: loadEnv(mode, process.cwd()).VITE_SITE_KEYWORDS,
						description: loadEnv(mode, process.cwd()).VITE_SITE_DES,
					},
				},
			}),
			VitePWA({
				registerType: "autoUpdate",
				workbox: {
					skipWaiting: true,
					clientsClaim: true,
					runtimeCaching: [
						{
							urlPattern: /(.*?)\.(js|css|woff2|woff|ttf)/, // js / css 静态资源缓存
							handler: "CacheFirst",
							options: {
								cacheName: "js-css-cache",
							},
						},
						{
							urlPattern: /(.*?)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/, // 图片缓存
							handler: "CacheFirst",
							options: {
								cacheName: "image-cache",
							},
						},
					],
				},
				manifest: {
					name: loadEnv(mode, process.cwd()).VITE_SITE_NAME,
					short_name: loadEnv(mode, process.cwd()).VITE_SITE_NAME,
					description: loadEnv(mode, process.cwd()).VITE_SITE_DES,
					display: "standalone",
					start_url: "/",
					theme_color: "#424242",
					background_color: "#424242",
					icons: [
						{
							src: "/images/icon/android-chrome-36x36.png",
							sizes: "36x36",
							type: "image/png",
						},
						{
							src: "/images/icon/android-chrome-48x48.png",
							sizes: "48x48",
							type: "image/png",
						},
						{
							src: "/images/icon/android-chrome-72x72.png",
							sizes: "72x72",
							type: "image/png",
						},
						{
							src: "/images/icon/android-chrome-96x96.png",
							sizes: "96x96",
							type: "image/png",
						},
						{
							src: "/images/icon/android-chrome-144x144.png",
							sizes: "144x144",
							type: "image/png",
						},
						{
							src: "/images/icon/android-chrome-192x192.png",
							sizes: "192x192",
							type: "image/png",
						},
						{
							src: "/images/icon/android-chrome-256x256.png",
							sizes: "256x256",
							type: "image/png",
						},
						{
							src: "/images/icon/android-chrome-384x384.png",
							sizes: "384x384",
							type: "image/png",
						},
						{
							src: "/images/icon/android-chrome-512x512.png",
							sizes: "512x512",
							type: "image/png",
							purpose: "any maskable",
						},
					],
				},
			}),
		],
		server: {
			port: "3000",
			hmr: true,
		},
		resolve: {
			alias: [
				{
					find: "@",
					replacement: resolve(__dirname, "src"),
				},
			],
		},
		css: {
			preprocessorOptions: {
				scss: {
					charset: false,
					additionalData: `@import "./src/style/global.scss";`,
				},
			},
		},
		build: {
			minify: "terser",
			terserOptions: {
				compress: {
					// 生产环境时移除 console
					pure_funcs: ["console.log"],
				},
			},
		},
	});

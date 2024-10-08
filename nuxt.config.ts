// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },

	future: {
		compatibilityVersion: 4,
	},

	extends: [
		"./app/modules/auth",
		"./app/modules/products",
		"./app/modules/attribute-groups",
	],

	app: {
		head: {
			link: [
				{ rel: "icon", type: "image/svg+xml", href: "/logo.svg" },
			],
			bodyAttrs: {
				id: "body",
			},
		},
	},

	modules: [
		"@nuxtjs/google-fonts",
		"@nuxtjs/i18n",
		"@pinia/nuxt",
		"@nuxtjs/tailwindcss",
		"@nuxtjs/color-mode",
	],

	pinia: {
		storesDirs: ["~/stores/**", "~models/**/stores/**"],
	},

	css: ["~/assets/css/tailwind.css"],

	i18n: {
		strategy: "no_prefix",
		locales: [
			// { code: "en", language: 'en-US', name: "English", file: "en.ts", dir: "ltr" }, // Английский
			{
				code: "ru",
				language: "ru-RU",
				name: "Русский",
				file: "ru.ts",
				dir: "ltr",
			},
		],
		defaultLocale: "ru",
		detectBrowserLanguage: false,
		langDir: "locales",
		vueI18n: "./i18n.config.ts",
	},

	colorMode: {
		classSuffix: "",
		preference: "system",
		fallback: "light",
		storageKey: "nuxt-color-mode",
	},

	tailwindcss: {
		cssPath: "~/assets/css/tailwind.css",
		configPath: "./tailwind.config.js",
		exposeConfig: true,
		viewer: true,
	},

	googleFonts: {
		families: {
			Nunito: [200, 300, 400, 500, 600, 700],
		},
		display: "swap", // Можно добавить для улучшения загрузки шрифтов
		download: false, // Загружает шрифты локально
		inject: true,
	},

	routeRules: {
		"/": { prerender: true },
		"/:pathMatch(.*)*": { prerender: true },
	},

	nitro: {
		prerender: {
			routes: ["/index.html", "/404.html"],
		},
	},
});

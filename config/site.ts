export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Next.js + NextUI",
	description: "Make beautiful websites regardless of your design experience.",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
		{
			label: "Calendar",
			href: "/calendar",
		},
	],
	navMenuItems: [
		{
			label: "Profile",
			href: "/profile",
		},
		{
			label: "Calendar",
			href: "/calendar",
		}
	],
	links: {
		github: "https://github.com/ErickSenaGodinho"
	},
};

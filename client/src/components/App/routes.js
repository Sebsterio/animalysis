import { Home } from "components/Home";
import { Survey } from "components/Survey";

export const routes = [
	{
		path: "/", // URL
		title: "Home", // Appers in header
		component: Home, // To render
		exact: true, // Switch match
		inNav: true, // Is listed in nav menu
	},
	{
		path: "/new-report",
		title: "New Report",
		component: Survey,
		exact: true,
		inNav: true,
	},
	{
		path: "/new-report/:section",
		title: "New Report",
		component: Survey,
		exact: true,
		inNav: false,
	},
	{
		path: "/new-report/:section/:question",
		title: "New Report",
		component: Survey,
		exact: true,
		inNav: false,
	},
];

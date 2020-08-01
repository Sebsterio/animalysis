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
		path: "/survey",
		title: "Survey",
		component: Survey,
		exact: true,
		inNav: true,
	},
	{
		path: "/survey/:section",
		title: "Survey",
		component: Survey,
		exact: true,
		inNav: false,
	},
	{
		path: "/survey/:section/:question",
		title: "Survey",
		component: Survey,
		exact: true,
		inNav: false,
	},
];

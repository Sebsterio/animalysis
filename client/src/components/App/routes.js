import { Home } from "components/Home";
import { Survey } from "components/Survey";
import { Review } from "components/Review";

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
		path: "/new-report/review",
		title: "Review Report",
		component: Review,
		exact: true,
		inNav: false,
	},
];

import { Home } from "pages/Home";
import { Survey } from "pages/Survey";
import { Review } from "pages/Review";
import { Account } from "pages/Account";

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
	{
		path: "/account",
		title: "My Account",
		component: Account,
		exact: true,
		inNav: true,
	},
	{
		path: "/account/:mode",
		title: "My Account",
		component: Account,
		exact: true,
		inNav: false,
	},
];

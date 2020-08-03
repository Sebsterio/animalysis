import { Home } from "components/Home";
import { Survey } from "components/Survey";
import { Review } from "components/Review";
import { AccountPage } from "components/AccountPage";

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
		component: AccountPage,
		exact: true,
		inNav: true,
	},
	{
		path: "/account/:mode",
		title: "My Account",
		component: AccountPage,
		exact: true,
		inNav: false,
	},
];

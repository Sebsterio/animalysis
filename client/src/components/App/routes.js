import { Home } from "components/Home";
import { Survey } from "components/Survey";

export const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
		exact: true,
		inNav: true,
	},
	{
		path: "/survey",
		name: "Survey",
		component: Survey,
		exact: true,
		inNav: true,
	},
	{
		path: "/survey/:section",
		name: "Survey",
		component: Survey,
		exact: true,
		inNav: false,
	},
	{
		path: "/survey/:section/:question",
		name: "Survey",
		component: Survey,
		exact: true,
		inNav: false,
	},
];

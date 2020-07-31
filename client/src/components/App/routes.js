import { Home } from "components/Home";
import { Survey } from "components/Survey";

export const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
		inNav: true,
	},
	{
		path: "/survey",
		name: "Survey",
		component: Survey,
		inNav: true,
	},
];

export default routes;

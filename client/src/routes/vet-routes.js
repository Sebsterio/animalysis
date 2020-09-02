import { Home } from "pages/Home";
import { Survey } from "pages/Survey";
import { Account } from "pages/Account";
import { ProfileForm } from "pages/ProfileForm";
import { SurveyEditor } from "pages/SurveyEditor";

// Aux
const exact = true;
const inNav = true;

export const vetRoutes = [
	{
		path: "/", //       URL
		title: "Home", //   Appers in header and as NavLink
		// linkText: "", // overrides "title" in NavLink
		component: Home, // To render in App > Route
		exact, //           Router Switch match
		inNav, //           Is listed in Nav Menu
	},
	// --- Profile form ---
	{
		path: "/profile",
		title: "My Profile",
		linkText: "Profile",
		component: ProfileForm,
		exact,
		inNav,
	},
	// --- Account ---
	{
		path: "/account",
		title: "My Account",
		linkText: "Account",
		component: Account,
		exact,
		inNav,
	},
	{
		path: "/account/:mode",
		title: "My Account",
		linkText: "Account",
		component: Account,
		exact,
	},
	// --- Survey ---
	{
		path: "/survey/edit",
		title: "Survey Editor",
		component: SurveyEditor,
		exact,
		inNav,
	},
	{
		path: "/survey/view",
		title: "Survey Preview",
		component: Survey,
		exact,
	},
];

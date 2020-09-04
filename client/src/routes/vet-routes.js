import {
	VetDashboard,
	VetSurvey,
	Account,
	ProfileForm,
	SurveyEditor,
	VetClinicForm,
	ClinicSearch,
} from "pages";

// Aux
const exact = true;
const inNav = true;

export const vetRoutes = [
	{
		path: "/",
		title: "Dashboard",
		component: VetDashboard,
		exact,
		inNav,
	},
	// --- Clinic search ---
	{
		path: "/clinic-search",
		title: "Find Organisation",
		linkText: "Organisation",
		component: ClinicSearch,
		exact,
		inNav,
	},
	// --- Survey ---
	{
		path: "/survey/edit",
		title: "Survey Editor",
		linkText: "Survey",
		component: SurveyEditor,
		exact,
		inNav,
	},
	{
		path: "/survey/view",
		title: "Survey Preview",
		component: VetSurvey,
		exact,
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
	// --- Clinic form ---
	{
		path: "/my-clinic",
		title: "My Organisation",
		linkText: "Organisation",
		component: VetClinicForm,
		exact,
	},
];

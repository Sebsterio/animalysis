import {
	VetDashboard,
	VetSurvey,
	SurveyEditor,
	Survey,
	Summary,
	Account,
	ProfileForm,
	VetClinicForm,
	ClinicSearch,
	Report,
	Pet,
	VetReports,
	Profile,
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
	// --- Reports History ---
	{
		path: "/reports",
		title: "Reports History",
		linkText: "Reports",
		component: VetReports,
		exact,
		inNav,
	},
	// --- Clinic ---
	{
		path: "/my-clinic",
		title: "My Organisation",
		linkText: "Organisation",
		component: VetClinicForm,
		exact,
		inNav,
	},
	{
		path: "/clinic-search",
		title: "Find Organisation",
		component: ClinicSearch,
		exact,
	},
	// --- Survey ---
	{
		path: "/survey/edit",
		title: "Survey Editor",
		linkText: "Survey",
		component: SurveyEditor,
		exact,
		inNav,
		suOnly: true, // superuser only (temp)
	},
	{
		path: "/survey/view",
		title: "Survey Preview",
		component: VetSurvey,
		exact,
	},
	{
		path: "/analysis",
		title: "Survey Preview",
		component: Survey,
		exact,
	},
	{
		path: "/analysis/summary",
		title: "Analysis Summary",
		component: Summary,
		exact,
	},
	{
		path: "/analysis/alert",
		title: "Alert",
		component: Summary,
		exact,
	},
	{
		path: "/report",
		title: "Report",
		component: Report,
		exact,
	},
	{
		path: "/report/:id",
		title: "Report",
		component: Report,
		exact,
	},

	// --- Profile ---
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
	// --- Pet profile ---
	{
		path: "/pet/:name", // name or id
		title: "Pet Profile",
		component: Pet,
		exact,
	},
	// --- Pet Owner profile ---
	{
		path: "/client/:id",
		title: "Client Profile",
		component: Profile,
		exact,
	},
];

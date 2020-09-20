import { lazy } from "react";

const SuDashboard = lazy(() => import("pages/SuDashboard"));
const VetSurvey = lazy(() => import("pages/VetSurvey"));
const SurveyEditor = lazy(() => import("pages/SurveyEditor"));
const Survey = lazy(() => import("pages/Survey"));
const Summary = lazy(() => import("pages/Summary"));
const Report = lazy(() => import("pages/Report"));
const Account = lazy(() => import("pages/Account"));
const ProfileForm = lazy(() => import("pages/ProfileForm"));
const VetClinicForm = lazy(() => import("pages/VetClinicForm"));
const ClinicSearch = lazy(() => import("pages/ClinicSearch"));

/*******************
 * Superuser routes
 * No client profiles, no pet profiles
 *******************/

// Aux
const exact = true;
const inNav = true;

export const suRoutes = [
	{
		path: "/",
		title: "Dashboard",
		component: SuDashboard,
		exact,
		inNav,
	},
	// --- Clinic ---
	{
		path: "/clinic-search",
		title: "Clinics",
		component: ClinicSearch,
		exact,
		inNav,
	},
	{
		path: "/my-clinic",
		title: "View Clinic",
		component: VetClinicForm,
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
];

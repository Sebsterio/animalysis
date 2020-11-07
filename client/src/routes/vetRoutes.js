import { lazy } from "react";

const VetDashboard = lazy(() => import("pages/VetDashboard"));
const VetSurvey = lazy(() => import("pages/VetSurvey"));
const SurveyEditor = lazy(() => import("pages/SurveyEditor"));
const Survey = lazy(() => import("pages/Survey"));
const Summary = lazy(() => import("pages/Summary"));
const Account = lazy(() => import("pages/Account"));
const ProfileForm = lazy(() => import("pages/ProfileForm"));
const VetClinicForm = lazy(() => import("pages/VetClinicForm"));
const ClinicSearch = lazy(() => import("pages/ClinicSearch"));
const Report = lazy(() => import("pages/Report"));
const Pet = lazy(() => import("pages/Pet"));
const VetReports = lazy(() => import("pages/VetReports"));
const Profile = lazy(() => import("pages/Profile"));
const Demo = lazy(() => import("pages/Demo"));

// Aux
const exact = true;
const inNav = true;
const demoOnly = true;

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
		title: "My Clinic",
		linkText: "Clinic",
		component: VetClinicForm,
		exact,
		inNav,
	},
	{
		path: "/clinic-search",
		title: "Clinic Search",
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
		demoOnly, // temp; v.1 only
	},
	{
		path: "/survey/view",
		title: "Survey Preview",
		component: VetSurvey,
		exact,
		demoOnly, // temp; v.1 only
	},
	{
		path: "/analysis",
		title: "Survey Preview",
		component: Survey,
		exact,
		demoOnly, // temp; v.1 only
	},
	{
		path: "/analysis/summary",
		title: "Analysis Summary",
		component: Summary,
		exact,
		demoOnly, // temp; v.1 only
	},
	{
		path: "/analysis/alert",
		title: "Alert",
		component: Summary,
		exact,
		demoOnly, // temp; v.1 only
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
	// --- Report ---
	{
		path: "/report/:id",
		title: "Report",
		component: Report,
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
	// --- Exit demo ---
	{
		path: "/demo",
		title: "Exit Demo",
		component: Demo,
		exact,
		inNav,
		demoOnly,
	},
];

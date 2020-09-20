import { lazy } from "react";

const Home = lazy(() => import("pages/Home"));
const Pet = lazy(() => import("pages/Pet"));
const PetForm = lazy(() => import("pages/PetForm"));
const Survey = lazy(() => import("pages/Survey"));
const Report = lazy(() => import("pages/Report"));
const Account = lazy(() => import("pages/Account"));
const Summary = lazy(() => import("pages/Summary"));
const ClinicForm = lazy(() => import("pages/ClinicForm"));
const ClinicSearch = lazy(() => import("pages/ClinicSearch"));
const ProfileForm = lazy(() => import("pages/ProfileForm"));

// Aux
const exact = true;
const inNav = true;

export const clientRoutes = [
	{
		path: "/",
		title: "Home",
		component: Home,
		exact,
		inNav,
	},
	// --- Pet profile ---
	{
		path: "/pet/:name",
		title: "Pet Profile",
		component: Pet,
		exact,
	},
	// --- Pet form ---
	{
		path: "/add-pet",
		title: "New Pet",
		component: PetForm,
		exact,
	},
	{
		path: "/edit-pet/:name",
		title: "Edit Pet Profile",
		component: PetForm,
		exact,
	},
	// --- User form ---
	{
		path: "/profile",
		title: "My Profile",
		linkText: "Profile",
		component: ProfileForm,
		exact,
		inNav,
	},
	// --- Clinic form ---
	{
		path: "/my-clinic",
		title: "My Clinic",
		linkText: "Clinic",
		component: ClinicForm,
		exact,
		inNav,
	},
	// --- Clinic search ---
	{
		path: "/clinic-search",
		title: "Find Clinic",
		component: ClinicSearch,
		exact,
	},
	// --- Analysis ---
	{
		path: "/analysis",
		title: "New Analysis",
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
	// --- Report ---
	{
		path: "/report/:id",
		title: "Report",
		component: Report,
		exact,
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

import {
	Home,
	Pet,
	PetForm,
	Survey,
	Report,
	Account,
	Summary,
	ClinicForm,
	ClinicSearch,
	ProfileForm,
} from "pages";

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
		component: ClinicForm,
		exact,
	},
	// --- Clinic search ---
	{
		path: "/clinic-search",
		title: "Find Clinic",
		linkText: "Clinic",
		component: ClinicSearch,
		exact,
		inNav,
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

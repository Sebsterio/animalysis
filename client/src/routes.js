import { Home } from "pages/Home";
import { Pet } from "pages/Pet";
import { PetForm } from "pages/PetForm";
import { Survey } from "pages/Survey";
import { Report } from "pages/Report";
import { Account } from "pages/Account";
import { Summary } from "pages/Summary";
import { ClinicForm } from "pages/ClinicForm";
import { UserForm } from "pages/UserForm";

export const routes = [
	{
		path: "/", // URL
		title: "Home", // Appers in header and as NavLink
		component: Home, // To render
		exact: true, // Router Switch match
		inNav: true, // Is listed in Nav Menu
		//linkText: "", // overrides "title" in NavLink
	},
	// --- Pet profile ---
	{
		path: "/pet/:name",
		title: "Pet Profile",
		component: Pet,
		exact: true,
		inNav: false,
	},
	// --- Pet form ---
	{
		path: "/add-pet",
		title: "New Pet",
		component: PetForm,
		exact: true,
		inNav: false,
	},
	{
		path: "/edit-pet/:name",
		title: "Edit Pet Profile",
		component: PetForm,
		exact: true,
		inNav: false,
	},
	// --- User form ---
	{
		path: "/profile",
		title: "My Profile",
		component: UserForm,
		exact: true,
		inNav: true,
	},
	// --- Clinic form ---
	{
		path: "/my-clinic",
		title: "My Clinic",
		component: ClinicForm,
		exact: true,
		inNav: true,
	},
	// --- Analysis ---
	{
		path: "/analysis",
		title: "New Analysis",
		component: Survey,
		exact: true,
		inNav: false,
	},
	{
		path: "/analysis/summary",
		title: "Analysis Summary",
		component: Summary,
		exact: true,
		inNav: false,
	},
	{
		path: "/analysis/alert",
		title: "Alert",
		component: Summary,
		exact: true,
		inNav: false,
	},
	// --- Report ---
	{
		path: "/report",
		title: "Report",
		component: Report,
		exact: true,
		inNav: false,
	},
	{
		path: "/report/:id",
		title: "Report",
		component: Report,
		exact: true,
		inNav: false,
	},
	// --- Account ---
	{
		path: "/account",
		title: "My Account",
		component: Account,
		exact: true,
		inNav: true,
	},
	{
		path: "/account/:mode",
		title: "My Account",
		component: Account,
		exact: true,
		inNav: false,
	},
];

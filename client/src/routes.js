import { Home } from "pages/Home";
import { Pet } from "pages/Pet";
import { PetForm } from "pages/PetForm";
import { Survey } from "pages/Survey";
import { Report } from "pages/Report";
import { Account } from "pages/Account";
import { Summary } from "pages/Summary";
import { ClinicForm } from "pages/ClinicForm";
import { UserForm } from "pages/UserForm";
import { SurveyEditor } from "pages/SurveyEditor";

// Aux
const exact = true;
const inNav = true;
const inAdminNav = true;

export const routes = [
	{
		path: "/", //       URL
		title: "Home", //   Appers in header and as NavLink
		// linkText: "", // overrides "title" in NavLink
		component: Home, // To render in App > Route
		exact, //           Router Switch match
		inNav, //           Is listed in Nav Menu
		// inAdminNav //    Is listed in Nav Menu for admin users
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
		component: UserForm,
		exact,
		inNav,
	},
	// --- Clinic form ---
	{
		path: "/my-clinic",
		title: "My Clinic",
		component: ClinicForm,
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
		component: Account,
		exact,
		inNav,
	},
	{
		path: "/account/:mode",
		title: "My Account",
		component: Account,
		exact,
	},

	// ===================== Admin =================

	{
		path: "/admin/survey",
		title: "Survey Editor",
		component: SurveyEditor,
		exact,
		inAdminNav,
	},
];

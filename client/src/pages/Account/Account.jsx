import React from "react";
import { Redirect } from "react-router-dom";
import { Auth, Main } from "./components";
import { mainModes, authModes, subroutes } from "./Account-constants";
import { getInputDataFromForm } from "utils/form";

/*********************************
 * Handle auth state,
 * render corresponding component,
 * and redirect if needed
 * Display auth error feedback in input (TODO)
 *********************************/

const AccountPage = ({
	// router
	match,
	// state
	isAuthenticated,
	// dispatch
	signIn,
	signUp,
	signOut,
	closeAccount,
}) => {
	// ---------------------- Handlers ----------------------

	const handleSubmit = (e) => {
		e.preventDefault();
		const inputNames = ["email", "password", "firstName"];
		const data = getInputDataFromForm(e.target, ...inputNames);
		if (mode === authModes.signIn) return signIn(data);
		if (mode === authModes.signUp) return signUp(data);
		if (mode === mainModes.close) return closeAccount(data);
	};

	// ------------------ Routing & Render ------------------

	const { mode } = match.params;

	const mainModeIsMatched = Object.values(mainModes).includes(mode);
	const authModeIsMatched = Object.values(authModes).includes(mode);

	if (isAuthenticated) {
		// After auth success, redirect to Home
		if (authModeIsMatched) return <Redirect to="/" />;
		// Ensure URL param is valid
		if (mode && !mainModeIsMatched) return <Redirect to={subroutes.account} />;
		// Render Account page
		return <Main {...{ mode, mainModeIsMatched, signOut, handleSubmit }} />;
	}
	// Not authenticated
	else {
		// Ensure URL param is present and valid
		if (!mode || !authModeIsMatched) return <Redirect to={subroutes.singIn} />;
		// Render Auth form
		return <Auth {...{ mode, handleSubmit }} />;
	}
};

export default AccountPage;

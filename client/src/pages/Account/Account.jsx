import React from "react";
import { Redirect } from "react-router-dom";
import { Auth, Main } from "./components";
import { mainModes, authModes } from "./Account-modes";

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
}) => {
	// ---------------------- Handlers ----------------------

	const handleSubmit = (e) => {
		e.preventDefault();
		const {
			email: { value: email },
			password: { value: password },
			firstName,
		} = e.target;
		const data = { email, password, firstName: firstName && firstName.value };
		// if (firstName) data.firstName = firstName.value;
		if (mode === authModes.signIn) return signIn(data);
		if (mode === authModes.signUp) return signUp(data);
	};

	// ------------------ Routing & Render ------------------

	const { mode } = match.params;

	const mainModesIsMatched = Object.values(mainModes).includes(mode);
	const authModesIsMatched = Object.values(authModes).includes(mode);

	const accountPageUrl = `/account`;
	const singInPageUrl = `/account/${authModes.signIn}`;

	if (isAuthenticated) {
		// After auth success, redirect to Home
		if (authModesIsMatched) return <Redirect to="/" />;
		// Ensure URL param is valid
		if (mode && !mainModesIsMatched) return <Redirect to={accountPageUrl} />;
		// Render Account page
		return <Main signOut={signOut} />;
	}
	// Not authenticated
	else {
		// Ensure URL param is present and valid
		if (!mode || !authModesIsMatched) return <Redirect to={singInPageUrl} />;
		// Render Auth form
		return <Auth mode={mode} submit={handleSubmit} />;
	}
};

export default AccountPage;

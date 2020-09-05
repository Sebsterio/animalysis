import React from "react";
import { Redirect } from "react-router-dom";
import { Auth, Main } from "./components";
import { mainModes, authModes, subroutes } from "./Account-constants";
import { getTruthyInputDataFromForm } from "utils/form";

/*********************************
 * Handle auth state,
 * render corresponding component,
 * and redirect if needed
 * Display auth error feedback in input (TODO)
 *********************************/

const AccountPage = ({
	// router
	match,
	history,
	// state
	authenticated,
	updating,
	// dispatch
	signIn,
	signUp,
	signOut,
	update,
	close,
	clearError,
}) => {
	// ---------------------- Handlers ----------------------

	// prettier-ignore
	const handleSubmit = (e) => {
		e.preventDefault();
		clearError()
		const inputNames = ["email", "password", "newEmail", "newPassword", "firstName", 'type'];
		const data = getTruthyInputDataFromForm(e.target, ...inputNames);
		if (mode === authModes.signIn) return signIn(data);
		if (mode === authModes.signUp) return signUp(data);
		if (mode === mainModes.close) return close(data);
		const {email, password, type} = mainModes
		if ( [email, password, type].includes(mode)) return update(data);
	};

	const goBack = () => {
		clearError();
		if (match.params.mode) history.push("/account");
		else history.push("/");
	};

	// ------------------ Routing & Render ------------------

	const { mode } = match.params;

	const mainModeIsMatched = Object.values(mainModes).includes(mode);
	const authModeIsMatched = Object.values(authModes).includes(mode);

	if (authenticated) {
		// After auth success, redirect to Home
		if (authModeIsMatched) return <Redirect to="/" />;
		// Ensure URL param is valid
		if (mode && !mainModeIsMatched) return <Redirect to={subroutes.account} />;
		// Render Account page
		return (
			<Main
				{...{ mode, mainModeIsMatched, updating }}
				{...{ handleSubmit, signOut, goBack }}
			/>
		);
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

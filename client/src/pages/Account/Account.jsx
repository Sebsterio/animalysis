import React from "react";
import { Redirect } from "react-router-dom";
import { Auth, Main } from "./components";
import {
	inputNames,
	mainModes,
	authModes,
	subroutes,
} from "./Account-constants";
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
	superuser,
	isDemo,
	// dispatch
	signIn,
	signUp,
	sendCode,
	resetPassword,
	signOut,
	update,
	close,
	clearError,
}) => {
	const { mode } = match.params;

	// ---------------------- Handlers ----------------------

	const handleSubmit = async (e) => {
		e.preventDefault();
		clearError();
		const data = getTruthyInputDataFromForm(e.target, ...inputNames);
		if (mode === authModes.signIn) return signIn(data);
		if (mode === authModes.signUp) return signUp(data);
		if (mode === mainModes.close) return close(data);
		if (mode === authModes.forgotPw) {
			const res = await sendCode(data);
			return res ? history.push(subroutes.resetPw) : null;
		}
		if (mode === authModes.resetPw) {
			const res = await resetPassword(data);
			return res ? history.push(subroutes.signIn) : null;
		}
		const { email, password, type } = mainModes;
		if ([email, password, type].includes(mode)) {
			const res = await update(data);
			return res ? history.push("/") : null;
		}
	};

	const goBack = () => {
		clearError();
		if (match.params.mode) history.push("/account");
		else history.push("/");
	};

	// ------------------ Routing & Render ------------------

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
				{...{ mode, mainModeIsMatched, updating, superuser, isDemo }}
				{...{ handleSubmit, signOut, goBack }}
			/>
		);
	}
	// Not authenticated
	else {
		// Ensure URL param is present and valid
		if (!mode || !authModeIsMatched) return <Redirect to={subroutes.signIn} />;
		// Render Auth form
		return <Auth {...{ mode, handleSubmit, updating }} />;
	}
};

export default AccountPage;

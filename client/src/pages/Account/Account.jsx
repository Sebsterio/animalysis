import React from "react";
import { Redirect } from "react-router-dom";
import { Auth, Main } from "./components";
import { mainModes, authModes } from "./Account-modes";

const AccountPage = ({
	// router
	match,
	// state
	isAuthenticated,
	// dispatch
	signIn,
}) => {
	// ---------------------- Handlers ----------------------

	const handleSignIn = (e) => {
		e.preventDefault();
		signIn();
	};

	// ------------------ Routing & Render ------------------

	const { mode } = match.params;

	const mainModesIsMatched = Object.values(mainModes).includes(mode);
	const authModesIsMatched = Object.values(authModes).includes(mode);

	if (isAuthenticated) {
		if (authModesIsMatched) return <Redirect to="/" />; // After auth success
		if (mode && !mainModesIsMatched) return <Redirect to="/account" />;
		return <Main />;
	}
	// Not authenticated
	else {
		if (!mode || !authModesIsMatched)
			return <Redirect to={`/account/${authModes.signIn}`} />;
		return <Auth mode={mode} signIn={handleSignIn} />;
	}
};

export default AccountPage;

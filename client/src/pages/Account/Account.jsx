import React from "react";
import { Auth } from "./components";
import { mainModes, authModes } from "./Account-modes";
import { Redirect } from "react-router-dom";

const MainMenu = () => (
	<div>
		<h1>Account Main Menu</h1>
		<p>Log Out Btn</p>
		<p>Edit Details Btn</p>
		<p>Close Account</p>
	</div>
);
const AccountPage = ({ match, isAuthenticated }) => {
	const { mode } = match.params;

	const mainModesValues = Object.values(mainModes);
	const authModesValues = Object.values(authModes);

	const mainModesMatched = mainModesValues.includes(mode);
	const authModesMatched = authModesValues.includes(mode);

	// Routing & Render
	if (isAuthenticated) {
		if (authModesMatched) return <Redirect to="/" />; // After auth success
		if (mode && !mainModesMatched) return <Redirect to="/account" />;

		return <MainMenu />;
	}

	// Not authenticated
	else {
		if (!mode || !authModesMatched)
			return <Redirect to={`/account/${authModes.signIn}`} />;

		return <Auth mode={mode} />;
	}
};

export default AccountPage;

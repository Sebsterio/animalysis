import React from "react";
import { MenuButton, Form } from "./index";
import { Page, Nav } from "components";
import { subroutes } from "../Account-constants";

export const Main = ({
	mode,
	mainModeIsMatched: isSubroute,
	updating,
	superuser,
	isDemo,
	signOut,
	handleSubmit,
	goBack,
}) => {
	const menu = (
		<>
			<MenuButton
				children="Change email"
				to={subroutes.email}
				disabled={isDemo}
			/>
			<MenuButton
				children="Change password"
				to={subroutes.password}
				disabled={isDemo}
			/>
			<MenuButton
				children="Account type"
				to={subroutes.type}
				disabled={superuser || isDemo}
			/>
			<MenuButton
				children="Close account"
				to={subroutes.close}
				disabled={isDemo}
			/>
			<MenuButton children="Sign out" onClick={signOut} />
		</>
	);
	return (
		<Page
			main={isSubroute ? <Form {...{ updating, mode, handleSubmit }} /> : menu}
			footer={<Nav textLeft="Back" onClickLeft={goBack} />}
		/>
	);
};

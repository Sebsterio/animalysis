import React from "react";
import { MenuButton, Form } from "./index";
import { Page, Nav } from "components";
import { subroutes } from "../Account-constants";

export const Main = ({
	mode,
	mainModeIsMatched: isSubroute,
	updating,
	signOut,
	handleSubmit,
	goBack,
}) => {
	const menu = (
		<>
			<MenuButton children="Edit details" to={subroutes.edit} />
			<MenuButton children="Register as vet" to={"/register-clinic"} disabled />
			<MenuButton children="Close account" to={subroutes.close} />
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

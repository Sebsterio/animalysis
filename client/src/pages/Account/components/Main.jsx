import React from "react";
import { Container, Button, Typography } from "@material-ui/core";
import { MenuButton } from "./index";

import { useStyles } from "../Account-styles";
import { mainModes, subroutes } from "../Account-constants";
import { PasswordInput } from "./PasswordInput";

export const Main = ({ mode, mainModeIsMatched, signOut, handleSubmit }) => {
	const c = useStyles();

	const modesData = {
		[mainModes.edit]: {
			btnText: "Done",
		},
		[mainModes.close]: {
			heading: (
				<Typography>
					Caution! You're about to permanently delete your account. This process
					is irreversible.
				</Typography>
			),
			btnText: "Close account",
			btnColor: "secondary",
			btnVariant: "contained",
			body: <PasswordInput />,
		},
	};

	return (
		<Container maxWidth="xs">
			{mainModeIsMatched ? (
				// ------------------ Form -----------------
				// route='/account/:mode'
				<form className={c.form} onSubmit={handleSubmit}>
					{modesData[mode].heading || null}
					{modesData[mode].body || null}
					<Button
						fullWidth
						type="submit"
						variant={modesData[mode].btnVariant || "outlined"}
						color={modesData[mode].btnColor || "default"}
						children={modesData[mode].btnText}
					/>
				</form>
			) : (
				// -------------- Main menu --------------
				// route='/account'
				<>
					<MenuButton children="Edit details" to={subroutes.edit} />
					<MenuButton children="Register as vet" to={"/register-clinic"} />
					<MenuButton children="Close account" to={subroutes.close} />
					<MenuButton children="Sign out" onClick={signOut} />
				</>
			)}
		</Container>
	);
};

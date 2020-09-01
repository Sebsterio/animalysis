import React from "react";
import { withError } from "HOC";
import { Button, Typography } from "@material-ui/core";
import { Stack } from "components";
import { useStyles } from "../Account-styles";
import { mainModes } from "../Account-constants";
import { EmailInput, PasswordInput } from "./index";
import { useValueWithTimeout } from "hooks";

export const Form = withError(({ mode, updating, handleSubmit, isError }) => {
	const c = useStyles();

	const modesData = {
		[mainModes.edit]: {
			body: (
				<>
					<EmailInput label="New email" isNew />
					<PasswordInput label="New password" isNew />
					<PasswordInput label="Current password" />
				</>
			),
			btnText: "Update",
			btnTextOngoing: "Updating...",
			btnTextDone: "Done!",
		},
		[mainModes.close]: {
			heading: (
				<Typography>
					Caution! You're about to permanently delete your account. This process
					is irreversible.
				</Typography>
			),
			body: <PasswordInput />,
			btnText: "Close account",
			btnTextOngoing: "Closing...",
			btnTextDone: "Done!",
			btnColor: "secondary",
			btnVariant: "contained",
		},
	};

	const buttonText = useValueWithTimeout({
		isOngoing: updating,
		valueDefault: modesData[mode].btnText,
		valueOngoing: modesData[mode].btnTextOngoing,
		valueDone: modesData[mode].btnTextDone,
	});

	return (
		<form className={c.form} onSubmit={handleSubmit}>
			<Stack>
				{modesData[mode].heading || null}
				{modesData[mode].body || null}
				<Button
					fullWidth
					type="submit"
					variant={modesData[mode].btnVariant || "outlined"}
					color={modesData[mode].btnColor || "default"}
					children={isError ? modesData[mode].btnText : buttonText}
				/>
			</Stack>
		</form>
	);
});

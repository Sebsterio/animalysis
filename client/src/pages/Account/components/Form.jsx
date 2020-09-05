import React from "react";
import { withError } from "HOC";
import { Button, Typography } from "@material-ui/core";
import { Stack } from "components";
import { useStyles } from "../Account-styles";
import { mainModes } from "../Account-constants";
import { EmailInput, PasswordInput, TypeInput } from "./index";
import { useValueWithTimeout } from "hooks";

export const Form = withError(({ mode, updating, handleSubmit, isError }) => {
	const c = useStyles();

	const modesData = {
		[mainModes.email]: {
			line1: <EmailInput label="New email" isNew />,
			line2: <PasswordInput />,
		},
		[mainModes.password]: {
			line1: <PasswordInput label="Current password" />,
			line2: <PasswordInput label="New password" isNew />,
		},
		[mainModes.type]: {
			line1: <TypeInput />,
			line2: <PasswordInput />,
		},
		[mainModes.close]: {
			line1: (
				<Typography>
					Caution! You're about to permanently delete your account. This process
					is irreversible.
				</Typography>
			),
			line2: <PasswordInput />,
			btnText: "Close account",
			btnTextOngoing: "Closing...",
			btnColor: "secondary",
			btnVariant: "contained",
		},
	};

	const buttonText = useValueWithTimeout({
		isOngoing: updating,
		valueDefault: modesData[mode].btnText || "Update",
		valueOngoing: modesData[mode].btnTextOngoing || "Updating...",
		valueDone: modesData[mode].btnTextDone || "Done!",
	});

	return (
		<form className={c.form} onSubmit={handleSubmit}>
			<Stack>
				{modesData[mode].line1 || null}
				{modesData[mode].line2 || null}
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

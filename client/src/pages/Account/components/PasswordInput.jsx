import React from "react";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

export const PasswordInput = ({ label, isNew }) => (
	<Grid item xs={12}>
		<TextField
			variant="outlined"
			required={!isNew}
			fullWidth
			type="password"
			name={isNew ? "newPassword" : "password"}
			label={label || "Password"}
			autoComplete={isNew ? undefined : "current-password"}
		/>
	</Grid>
);

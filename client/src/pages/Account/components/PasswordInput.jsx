import React from "react";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

export const PasswordInput = ({ label = "Password" }) => (
	<Grid item xs={12}>
		<TextField
			variant="outlined"
			required
			fullWidth
			name="password"
			label={label}
			type="password"
			autoComplete="current-password"
		/>
	</Grid>
);

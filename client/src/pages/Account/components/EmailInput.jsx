import React from "react";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

export const EmailInput = ({ label = "Email Address" }) => (
	<Grid item xs={12}>
		<TextField
			variant="outlined"
			required
			fullWidth
			label={label}
			name="email"
			type="email"
			autoComplete="email"
		/>
	</Grid>
);

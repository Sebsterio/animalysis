import React from "react";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

export const EmailInput = ({ label, isNew }) => (
	<Grid item xs={12}>
		<TextField
			variant="outlined"
			required={!isNew}
			fullWidth
			type="email"
			label={label || "Email Address"}
			name={isNew ? "newEmail" : "email"}
			autoComplete={isNew ? undefined : "email"}
		/>
	</Grid>
);

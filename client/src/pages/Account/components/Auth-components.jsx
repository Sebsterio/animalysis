import React from "react";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

export const OptIn = (
	<Grid item xs={12}>
		<FormControlLabel
			control={<Checkbox value="allowExtraEmails" color="primary" />}
			label="I want to receive inspiration, marketing promotions and updates via email."
		/>
	</Grid>
);

export const UserInfo = (
	<>
		<Grid item xs={12} sm={6}>
			<TextField
				autoComplete="fname"
				name="firstName"
				variant="outlined"
				required
				fullWidth
				id="firstName"
				label="First Name"
				autoFocus
			/>
		</Grid>
		<Grid item xs={12} sm={6}>
			<TextField
				variant="outlined"
				required
				fullWidth
				id="lastName"
				label="Last Name"
				name="lastName"
				autoComplete="lname"
			/>
		</Grid>
	</>
);

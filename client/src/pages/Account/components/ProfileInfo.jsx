import React from "react";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

export const ProfileInfo = (
	<>
		<Grid item xs={12}>
			<TextField
				fullWidth
				required
				autoFocus
				name="firstName"
				autoComplete="fname"
				label="First Name"
				variant="outlined"
			/>
		</Grid>
		{/* <Grid item xs={12} sm={6}>
			<TextField
				fullWidth
				label="Last Name"
				name="lastName"
				autoComplete="lname"
				variant="outlined"
			/>
		</Grid> */}
	</>
);

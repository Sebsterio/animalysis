import React from "react";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

export const UserInfo = (
	<>
		<Grid item xs={12}>
			<TextField
				variant="outlined"
				required
				fullWidth
				label="Email Address"
				name="email"
				type="email"
				autoComplete="email"
			/>
		</Grid>
		<Grid item xs={12}>
			<TextField
				variant="outlined"
				required
				fullWidth
				name="password"
				label="Password"
				type="password"
				autoComplete="current-password"
			/>
		</Grid>
	</>
);

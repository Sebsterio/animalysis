import React from "react";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";

export const OptIn = (
	<Grid item xs={12}>
		<FormControlLabel
			control={<Checkbox value="allowExtraEmails" color="primary" />}
			label="I want to receive inspiration, marketing promotions and updates via email."
		/>
	</Grid>
);

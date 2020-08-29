import React from "react";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";

export const Terms = (
	<Grid item xs={12}>
		<FormControlLabel
			name="terms"
			control={<Checkbox required value="termsAndConditions" color="primary" />}
			label="I accept the Terms and Conditions."
		/>
	</Grid>
);

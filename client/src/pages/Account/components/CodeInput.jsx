import React from "react";
import { withError } from "HOC";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

export const CodeInput = withError(({ label, codeError, errorMessage }) => {
	return (
		<Grid item xs={12}>
			<TextField
				variant="outlined"
				required
				fullWidth
				type="text"
				autoComplete="off"
				name="code"
				label={codeError ? errorMessage : label || "Security Code"}
				error={codeError}
			/>
		</Grid>
	);
});

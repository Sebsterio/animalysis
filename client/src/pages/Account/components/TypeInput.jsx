import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

export const TypeInput = () => {
	return (
		<Grid item xs={12}>
			<TextField
				select
				fullWidth
				variant="outlined"
				type="text"
				name="type"
				label="I'm a..."
				defaultValue="" // avoid React warning
			>
				<MenuItem value="client">Pet owner</MenuItem>
				<MenuItem value="vet">Vet</MenuItem>
			</TextField>
		</Grid>
	);
};

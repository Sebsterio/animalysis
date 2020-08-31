import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@material-ui/core";

export const MenuButton = (props) => {
	return (
		<Button
			fullWidth
			variant="outlined"
			component={!!props.to ? RouterLink : undefined}
			{...props}
		/>
	);
};

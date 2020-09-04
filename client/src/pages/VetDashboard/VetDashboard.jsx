import React from "react";
import { Container, Typography } from "@material-ui/core";

export const VetDashboard = () => {
	return (
		<Container maxWidth="xs">
			<Typography variant="h3">- Welcome msg</Typography>
			<Typography variant="h5">- Organisation logo and name</Typography>
			<Typography>
				- if no clinic details, register clinic button AND join clinic button
			</Typography>
			<Typography>- New reports list</Typography>
			<Typography>- Load old reports link</Typography>
		</Container>
	);
};

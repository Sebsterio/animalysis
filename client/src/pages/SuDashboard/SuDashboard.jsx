import React from "react";
import Typography from "@material-ui/core/Typography";
import { Page } from "components";

export const SuDashboard = () => {
	return (
		<Page
			header={
				<Typography
					variant="h4"
					align="center"
					// Don't show name; make su mode explicit
					children="Welcome, Superuser"
				/>
			}
		/>
	);
};

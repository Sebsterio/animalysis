import React from "react";
import Typography from "@material-ui/core/Typography";
import { Page } from "components";

export const SuDashboard = ({ username }) => {
	return (
		<Page
			header={
				<Typography
					variant="h4"
					align="center"
					children={`Welcome, ${username || "Superuser"}`}
				/>
			}
		/>
	);
};

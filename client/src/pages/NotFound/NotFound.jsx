import React from "react";
import { Page } from "components";
import Typography from "@material-ui/core/Typography";

export const NotFound = () => {
	return (
		<Page
			main={
				<>
					<Typography align="center" variant="h2">
						404
					</Typography>
					<Typography align="center">Page not found</Typography>
				</>
			}
		/>
	);
};

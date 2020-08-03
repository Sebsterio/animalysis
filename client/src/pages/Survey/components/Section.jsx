import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, MobileStepper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	container: {
		textAlign: "center",
	},
	stepper: {
		display: "inline-block",
		// display: "flex",
		// justifyContent: "center",
		// textAlign: "center",
	},
}));

export const Section = ({ section }) => {
	const clx = useStyles();

	return (
		<Box className={clx.container}>
			<Box mb={1}>
				<MobileStepper
					variant="dots"
					steps={6}
					position="static"
					activeStep={1}
					className={clx.stepper}
				/>
			</Box>
			<Typography
				component="h2"
				variant="subtitle1"
				className={useStyles().container}
				children={section.title}
			/>
		</Box>
	);
};

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, MobileStepper } from "@material-ui/core";

// ---------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
	container: {
		textAlign: "center",
	},
	stepper: {
		display: "inline-block",
	},
}));

export const Section = ({ sectionTitle, historyLength, queueLength }) => {
	const activeStep = historyLength - 1;
	const steps = historyLength + queueLength;

	const clx = useStyles();

	return (
		<Box className={clx.container}>
			<Box mb={1}>
				<MobileStepper
					variant="dots"
					className={clx.stepper}
					position="static"
					activeStep={activeStep}
					steps={steps}
				/>
			</Box>
			<Typography
				component="h2"
				variant="subtitle1"
				className={useStyles().container}
				children={sectionTitle}
			/>
		</Box>
	);
};

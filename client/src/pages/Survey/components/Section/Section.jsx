import React, { useRef } from "react";
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

export const Section = ({
	sequenceName,
	sectionTitle,
	sectionIndex,
	lastSectionIndex,
}) => {
	// Show only main sequence sections in Stepper
	const mainSequence = useRef({ activeStep: 0, steps: 0 });
	if (sequenceName === "main")
		mainSequence.current = {
			activeStep: sectionIndex,
			steps: lastSectionIndex + 1,
		};
	const { activeStep, steps } = mainSequence.current;

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

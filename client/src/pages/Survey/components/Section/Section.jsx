import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, MobileStepper } from "@material-ui/core";
import { LinkBlock } from "components";

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
	isVet,
	sectionTitle,
	historySections,
	historyAndQueueSections,
	endPreview,
}) => {
	const c = useStyles();

	return (
		<Box className={c.container}>
			{isVet && (
				<LinkBlock
					to="/survey/edit"
					text="End preview"
					clickHandler={endPreview}
				/>
			)}
			<Box mb={1}>
				<MobileStepper
					variant="dots"
					className={c.stepper}
					position="static"
					activeStep={historySections.length - 1}
					steps={historyAndQueueSections.length}
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

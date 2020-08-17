import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";

export const useStyles = makeStyles((theme) => ({
	container: {
		width: "100%",
		display: "flex",
		flexFlow: "row nowrap",
		justifyContent: "space-between",
	},
	nextButton: {
		// TEMPORARY
		transform: ({ enlargedRight }) => (enlargedRight ? "scale(2)" : "scale(1)"),
	},
}));

export const Nav = ({
	textLeft,
	textRight,
	onClickLeft,
	onClickRight,
	disabledLeft = false,
	disabledRight = false,
	enlargedRight = false,
	noArrows = false,
}) => {
	const clx = useStyles({ enlargedRight });

	return (
		<div className={clx.container}>
			<Button
				children={textLeft}
				onClick={onClickLeft}
				disabled={disabledLeft}
				startIcon={noArrows ? null : <KeyboardArrowLeft />}
			/>

			<Button
				children={textRight}
				onClick={onClickRight}
				disabled={disabledRight}
				endIcon={noArrows ? null : <KeyboardArrowRight />}
				className={clx.nextButton}
			/>
		</div>
	);
};

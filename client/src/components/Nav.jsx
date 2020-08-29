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
	textMiddle,
	textRight,
	onClickLeft,
	onClickMiddle,
	onClickRight,
	disabledLeft = false,
	disabledMiddle = false,
	disabledRight = false,
	enlargedRight = false,
	onlyRight = false,
	noArrows = false,
}) => {
	const c = useStyles({ enlargedRight });

	return (
		<div className={c.container}>
			{textLeft && (
				<Button
					children={textLeft}
					onClick={onClickLeft}
					disabled={disabledLeft}
					startIcon={noArrows ? null : <KeyboardArrowLeft />}
				/>
			)}

			{textMiddle && (
				<Button
					variant="contained"
					color="primary"
					children={textMiddle}
					onClick={onClickMiddle}
					disabled={disabledMiddle}
				/>
			)}

			<Button
				children={textRight}
				onClick={onClickRight}
				disabled={disabledRight}
				fullWidth={onlyRight}
				endIcon={noArrows ? null : <KeyboardArrowRight />}
				className={c.nextButton}
			/>
		</div>
	);
};

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
	onlyRight = false,
	noArrows = false,
}) => {
	const c = useStyles({ enlargedRight });

	return (
		<div className={c.container}>
			{!onlyRight && (
				<Button
					children={textLeft}
					onClick={onClickLeft}
					disabled={disabledLeft}
					startIcon={noArrows ? null : <KeyboardArrowLeft />}
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

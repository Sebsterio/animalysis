import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(0.3, 0),
	},
}));

export const Footer = ({
	// parent
	history,
	data,
	petId,
	// store
	isPetIdActive,
	// dispatch
	startProblemReport,
	startRoutineCheck,
}) => {
	const clx = useStyles();

	const unfinishedAnalysis = isPetIdActive(petId);

	return (
		<div>
			<Button
				fullWidth
				variant="contained"
				className={clx.button}
				onClick={() => startRoutineCheck(data)}
				children="Routine Health Check"
			/>
			<Button
				fullWidth
				variant="contained"
				color={unfinishedAnalysis ? "default" : "primary"}
				className={clx.button}
				onClick={() => startProblemReport(data)}
				children="Report a Problem"
			/>
			{unfinishedAnalysis && (
				<Button
					fullWidth
					variant="contained"
					color="primary"
					className={clx.button}
					onClick={() => history.push("/analysis")}
					children="Continue Analysis"
				/>
			)}
			<Button
				fullWidth
				variant="outlined"
				className={clx.button}
				onClick={() => history.push("/")}
				children="Back"
			/>
		</div>
	);
};

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
	const c = useStyles();

	const unfinishedAnalysis = isPetIdActive(petId);

	return (
		<div>
			<Button
				fullWidth
				variant="contained"
				className={c.button}
				onClick={() => startRoutineCheck(data)}
				children="Routine Health Check"
			/>
			<Button
				fullWidth
				variant="contained"
				color={unfinishedAnalysis ? "default" : "primary"}
				className={c.button}
				onClick={() => startProblemReport(data)}
				children="Report a Problem"
			/>
			{unfinishedAnalysis && (
				<Button
					fullWidth
					variant="contained"
					color="primary"
					className={c.button}
					onClick={() => history.push("/analysis")}
					children="Continue Analysis"
				/>
			)}
			<Button
				fullWidth
				variant="outlined"
				className={c.button}
				onClick={() => history.push("/")}
				children="Back"
			/>
		</div>
	);
};

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	page: {
		display: "flex",
		flexFlow: "column nowrap",
		justifyContent: "space-between",
		padding: theme.spacing(3),
	},
	head: {
		display: "flex",
		flexFlow: "column nowrap",
		justifyContent: "center",
	},
	main: {
		display: "flex",
		flexFlow: "row wrap",
		justifyContent: "center",
	},
	surveyBtn: {
		margin: theme.spacing(1, 0),
	},
	temp: {
		width: 130,
		height: 130,
		margin: theme.spacing(1),
		background: "grey",
	},
}));

export const Home = ({ history, surveyIsLoaded }) => {
	const clx = useStyles();

	const goToSurvey = () => history.push("/analysis");

	const [pets, setPets] = useState(1);

	return (
		<Container maxWidth="xs" className={clx.page}>
			{/* Header */}
			<div className={clx.head}>
				{true && (
					<Button
						variant="contained"
						className={clx.surveyBtn}
						onClick={() => {}}
						children="Choose a Clinic"
					/>
				)}
				{surveyIsLoaded && (
					<Button
						variant="contained"
						className={clx.surveyBtn}
						onClick={goToSurvey}
						children="Continue Analysis"
					/>
				)}
			</div>

			{/* Main */}
			<div className={clx.main}>
				{Array.from({ length: pets }, (_, i) => (
					<div key={i} className={clx.temp}></div>
				))}
			</div>

			{/* Footer */}
			<Button
				variant="contained"
				className={clx.surveyBtn}
				onClick={() => setPets(pets + 1)}
				children="New Pet"
			/>
		</Container>
	);
};

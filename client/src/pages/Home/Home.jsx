import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Button } from "@material-ui/core";
import { Head } from "./components";

const useStyles = makeStyles((theme) => ({
	page: {
		display: "flex",
		flexFlow: "column nowrap",
		justifyContent: "space-between",
		padding: theme.spacing(3),
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

export const Home = ({ history }) => {
	const clx = useStyles();

	const [pets, setPets] = useState(1);

	return (
		<Container maxWidth="xs" className={clx.page}>
			<Head history={history} />

			{/* Main */}
			<div className={clx.main}>
				{Array.from({ length: pets }, (_, i) => (
					<div key={i} className={clx.temp}></div>
				))}
			</div>

			{/* Footer */}
			<Button
				variant="outlined"
				className={clx.surveyBtn}
				onClick={() => setPets(pets + 1)}
				children="New Pet"
			/>
		</Container>
	);
};

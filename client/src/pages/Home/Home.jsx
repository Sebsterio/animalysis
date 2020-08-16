import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Button, Typography } from "@material-ui/core";
import { Head } from "./components";
import dogImage from "assets/dog.jpg";

const useStyles = makeStyles((theme) => ({
	page: {
		display: "flex",
		flexFlow: "column nowrap",
		justifyContent: "space-between",
		padding: theme.spacing(3),
	},
	greeting: {
		margin: theme.spacing(4, 0),
	},
	main: {
		display: "flex",
		flexFlow: "row wrap",
		justifyContent: "center",
	},
	surveyBtn: {
		margin: theme.spacing(4, 0, 0),
	},
	profile: {
		width: 130,
		height: 130,
		margin: theme.spacing(1),
		background: `url(${dogImage})`,
		backgroundSize: "cover",
	},
}));

export const Home = ({ history, username }) => {
	const clx = useStyles();

	const [pets, setPets] = useState(1);

	return (
		<Container maxWidth="xs" className={clx.page}>
			<Head history={history} />

			<Typography
				variant="h4"
				align="center"
				children={`Welcome, ${username}`}
				className={clx.greeting}
			/>

			{/* Main */}
			<div className={clx.main}>
				{Array.from({ length: pets }, (_, i) => (
					<div
						key={i}
						className={clx.profile}
						onClick={() => history.push("/profile/benny")}
					></div>
				))}
			</div>

			<Button
				variant="outlined"
				className={clx.surveyBtn}
				onClick={() => setPets(pets + 1)}
				children="New Pet"
			/>
		</Container>
	);
};

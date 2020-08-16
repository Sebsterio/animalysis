import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Button } from "@material-ui/core";
import { Head, PetCard } from "./components";
import dogImage from "assets/dog.jpg";

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
		justifyContent: "space-around",
	},
	surveyBtn: {
		margin: theme.spacing(4, 0, 0),
	},
}));

export const Home = ({ history, pets }) => {
	const clx = useStyles();

	const [petsNum, setPetsNum] = useState(1);

	return (
		<Container maxWidth="xs" className={clx.page}>
			<Head history={history} />

			<div className={clx.main}>
				{Array.from({ length: petsNum }, (_, i) => (
					<PetCard
						key={i}
						pet={pets[0]} //////
						handleClick={() => history.push("/profile/benny")} ////
					/>
				))}
			</div>

			<Button
				variant="outlined"
				className={clx.surveyBtn}
				onClick={() => setPetsNum(petsNum + 1)}
				children="New Pet"
			/>
		</Container>
	);
};

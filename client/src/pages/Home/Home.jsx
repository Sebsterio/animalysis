import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Button } from "@material-ui/core";
import { Head, PetCard } from "./components";

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

	const noPets = !pets.length;

	return (
		<Container maxWidth="xs" className={clx.page}>
			<Head history={history} />

			<div className={clx.main}>
				{noPets ? (
					<PetCard handleClick={() => history.push("/add-pet")} />
				) : (
					pets.map((pet) => (
						<PetCard
							key={pet.id}
							pet={pet}
							handleClick={() => history.push("/pet/" + pet.name)}
						/>
					))
				)}
			</div>

			{!noPets ? (
				<Button
					variant="outlined"
					className={clx.surveyBtn}
					onClick={() => history.push("/add-pet")}
					children="New Pet"
				/>
			) : (
				<div style={{ height: "10vh" }} />
			)}
		</Container>
	);
};

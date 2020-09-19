import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Button } from "@material-ui/core";
import { Head, PetCard } from "./components";
import { Page } from "components";

const useStyles = makeStyles((theme) => ({
	main: {
		display: "flex",
		flexFlow: "row wrap",
		justifyContent: "space-around",
	},
}));

export const Home = ({ history, pets }) => {
	const c = useStyles();

	const noPets = !pets.length;

	const addPet = () => history.push("/add-pet");

	const goToPet = (name) => history.push("/pet/" + name);

	return (
		<Page
			header={<Head history={history} />}
			main={
				<div className={c.main}>
					{noPets ? (
						<PetCard handleClick={addPet} />
					) : (
						pets.map((pet) => <PetCard key={pet.id} {...{ pet, goToPet }} />)
					)}
				</div>
			}
			footer={
				!noPets ? (
					<Button
						children="New Pet"
						onClick={addPet}
						variant="outlined"
						fullWidth
					/>
				) : (
					<div style={{ height: "10vh" }} />
				)
			}
		/>
	);
};

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import PlusImage from "assets/plus.png";

const useStyles = makeStyles((theme) => ({
	root: {
		flex: "1 0 40%",
		maxWidth: 260,
		margin: theme.spacing(1),
	},
	media: {
		height: 0,
		paddingTop: "100%", // 16:9
	},
}));

export const PetCard = ({ pet, goToPet }) => {
	const c = useStyles();

	if (!pet) pet = { name: "Add a pet", imageUrl: PlusImage };

	const { name, imageUrl } = pet;

	const handleClick = () => goToPet(pet.name);

	return (
		<Card className={c.root} onClick={handleClick}>
			<CardActionArea>
				<CardMedia
					className={c.media}
					image={imageUrl}
					title={`${name}'s profile picture`}
				/>
				<CardContent>
					<Typography
						component="h2"
						variant="h5"
						align="center"
						children={name}
					/>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

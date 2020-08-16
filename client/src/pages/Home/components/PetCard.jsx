import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	root: {
		flex: "1 0 40%",
		margin: theme.spacing(1),
	},
	media: {
		height: 0,
		paddingTop: "100%", // 16:9
	},
}));

export const PetCard = ({ pet, handleClick }) => {
	const clx = useStyles();

	return (
		<Card className={clx.root} onClick={handleClick}>
			<CardActionArea>
				<CardMedia
					className={clx.media}
					image={pet.imageUrl}
					title={`${pet.name}'s profile picture`}
				/>
				<CardContent>
					<Typography
						component="h2"
						variant="h5"
						align="center"
						children={pet.name}
					/>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

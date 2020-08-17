import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Typography, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { getAge } from "utils/date";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		flexFlow: "row nowrap",
		alignItems: "center",
	},
	avatar: ({ small }) => ({
		width: theme.spacing(small ? 6 : 10),
		height: theme.spacing(small ? 6 : 10),
		borderRadius: 4,
	}),
	info: {
		flex: "1 1 100%",
		marginLeft: theme.spacing(2),
		display: "flex",
		flexFlow: "column nowrap",
		alignSelf: "flex-start",
	},
	infoHeader: {
		display: "flex",
		flexFlow: "row nowrap",
		justifyContent: "space-between",
		alignItems: "center",
	},
	infoDesc: {
		flex: "1 1 100%",
		display: "flex",
		alignItems: "center",
	},
}));

export const PetSnippet = ({ pet, history, small }) => {
	const clx = useStyles({ small });

	const editPet = () => history.push("/edit-profile/" + pet.name.toLowerCase());

	return (
		<div className={clx.container}>
			<Avatar alt={pet.name} src={pet.imageUrl} className={clx.avatar} />
			<div className={clx.info}>
				<div className={clx.infoHeader}>
					<Typography variant={small ? "h6" : "h4"} children={pet.name} />
					{!!history && (
						<IconButton aria-label="edit pet details" onClick={editPet}>
							<EditIcon />
						</IconButton>
					)}
				</div>
				<div className={clx.infoDesc}>
					<Typography>
						{getAge(pet.dateOfBirth)} year old {pet.sex} {pet.breed}
					</Typography>
				</div>
			</div>
		</div>
	);
};
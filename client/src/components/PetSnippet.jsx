import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Typography, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { getAgeFromDate } from "utils/date";

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

export const PetSnippet = ({
	pet: { name, breed, imageUrl, sex, birthMonth: month, birthYear: year },
	history,
	small,
	isVet,
}) => {
	const c = useStyles({ small });

	const editPet = () => history.push("/edit-pet/" + name.toLowerCase());

	const age = getAgeFromDate(month, year);
	const ageString = age[1] > 0 ? `${age[1]} years old` : `${age[0]} months old`;

	return (
		<div className={c.container}>
			<Avatar alt={name} src={imageUrl} className={c.avatar} />
			<div className={c.info}>
				<div className={c.infoHeader}>
					<Typography variant={small ? "h6" : "h4"} children={name} />
					{!!history && !isVet && (
						<IconButton aria-label="edit pet details" onClick={editPet}>
							<EditIcon />
						</IconButton>
					)}
				</div>
				<div className={c.infoDesc}>
					<Typography>
						{ageString} {sex} {breed}
					</Typography>
				</div>
			</div>
		</div>
	);
};

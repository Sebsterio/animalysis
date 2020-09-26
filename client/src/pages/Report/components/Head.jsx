import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import { PetSnippet } from "components";

const useStyles = makeStyles((theme) => ({
	link: {
		textDecoration: "none",
	},
	alert: {
		marginBottom: theme.spacing(2),
		alignItems: "center",
	},
}));

export const Head = ({ pet, clinicIsSet, userHasPhone, isVet }) => {
	const c = useStyles();

	return (
		// separte content from parent's grid layout
		<div>
			{isVet ? null : !clinicIsSet ? (
				<Link to="/my-clinic" className={c.link}>
					<Alert
						severity="error"
						children="You haven't chosen a clinic to send reports to. Click here to add one."
						className={c.alert}
					/>
				</Link>
			) : !userHasPhone ? (
				<Link to="/profile" className={c.link}>
					<Alert
						severity="warning"
						children="Add a phone number so that your clinic can contact you."
						className={c.alert}
					/>
				</Link>
			) : null}
			<PetSnippet pet={pet} small />
		</div>
	);
};

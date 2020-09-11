import React, { useState, useEffect } from "react";
import { Redirect, Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Page, Spinner, Dictionary, Stack, PetSnippet } from "components";

const useStyles = makeStyles((theme) => ({
	footerButton: { margin: theme.spacing(0.3, 0) },
	petSnippetContainer: { padding: theme.spacing(2) },
	petSnippetLink: { textDecoration: "none" },
}));

export const Profile = ({ match, history, fetchClient, getPets }) => {
	const c = useStyles();

	const { id } = match.params;

	const [client, setClient] = useState(null);
	const [pets, setPets] = useState(null);
	const [status, setStatus] = useState("loading");

	useEffect(() => {
		(async () => {
			setStatus("loading");
			const res = await fetchClient(id);
			if (!res) return setStatus("error");
			setClient(res.data);
			setPets(getPets(id));
			setStatus("success");
		})();
	}, [fetchClient, id]);

	if (status === "loading") return <Spinner />;
	if (status === "error") return <Redirect to="/not-found" />;

	const { email, profile } = client;
	const { firstName, surname, phone } = profile;

	console.log({ pets });

	return (
		<Page
			main={
				<Stack>
					<Card>
						<CardContent>
							<Dictionary>
								<Typography variant="h6" color="primary">
									Name:
								</Typography>
								<Typography>
									{firstName + (surname ? ` ${surname}` : "")}
								</Typography>
								<Typography variant="h6" color="primary">
									Telephone:
								</Typography>
								<Typography>{phone}</Typography>
								<Typography variant="h6" color="primary">
									Email:
								</Typography>
								<Typography>{email}</Typography>
							</Dictionary>
							<Stack></Stack>
						</CardContent>
					</Card>

					{pets.length && (
						<Paper className={c.petSnippetContainer}>
							{pets.map((pet) => (
								<RouterLink to={"/pet/" + pet.id} className={c.petSnippetLink}>
									<PetSnippet pet={pet} small isVet />
								</RouterLink>
							))}
						</Paper>
					)}
				</Stack>
			}
			footer={
				<>
					<Button
						fullWidth
						color="primary"
						variant="outlined"
						className={c.footerButton}
						onClick={() => {}}
						children="Send an email"
					/>
					<Button
						fullWidth
						color="primary"
						variant="contained"
						className={c.footerButton}
						onClick={() => {}}
						children="Call"
					/>
					<Button
						fullWidth
						variant="outlined"
						className={c.footerButton}
						onClick={() => history.goBack()}
						children="Back"
					/>
				</>
			}
		/>
	);
};

import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Page, Spinner, Dictionary, Stack } from "components";

export const Profile = ({ match, history, fetchClient }) => {
	const { id } = match.params;

	const [client, setClient] = useState(null);
	const [status, setStatus] = useState("loading");

	useEffect(() => {
		(async () => {
			setStatus("loading");
			const res = await fetchClient(id);
			if (!res) return setStatus("error");
			setClient(res.data);
			setStatus("success");
		})();
	}, [fetchClient, id]);

	if (status === "loading") return <Spinner />;
	if (status === "error") return <Redirect to="/not-found" />;

	const { email, profile } = client;
	const { firstName, surname, phone } = profile;

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
								<Typography>{firstName}</Typography>
								<Typography variant="h6" color="primary">
									Surname:
								</Typography>
								<Typography>{surname}</Typography>
								<Typography variant="h6" color="primary">
									Telephone:
								</Typography>
								<Typography>{phone}</Typography>
								<Typography variant="h6" color="primary">
									Email:
								</Typography>
								<Typography>{email}</Typography>
							</Dictionary>
						</CardContent>
					</Card>

					<Button
						fullWidth
						variant="outlined"
						color="primary"
						children="Send an email"
						onClick={() => {}}
					/>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						children="Call"
						onClick={() => {}}
					/>
				</Stack>
			}
			footer={
				<Button
					fullWidth
					variant="outlined"
					onClick={() => history.goBack()}
					children="Back"
				/>
			}
		/>
	);
};

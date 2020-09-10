import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Page } from "components";
import { Spinner, Dictionary } from "components";

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

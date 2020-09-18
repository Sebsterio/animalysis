import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Tooltip from "@material-ui/core/Tooltip";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Stack } from "components";

const useStyles = makeStyles((theme) => ({
	logo: {
		display: "flex",
		justifyContent: "center",
	},
	header: {
		display: "grid",
		gridTemplateColumns: "1fr auto",
	},
}));

export const ClinicDetails = ({
	name,
	address,
	email,
	phone,
	phone2,
	logoUrl,
	verified,
}) => {
	const c = useStyles();

	return (
		<Stack>
			{logoUrl && (
				<div className={c.logo}>
					<Avatar alt={name + " logo"} src={logoUrl} />
				</div>
			)}
			<Card className={c.root}>
				<CardContent>
					<Stack>
						<div className={c.header}>
							<Typography variant="h5" className={c.heading}>
								{name}
							</Typography>
							{verified && (
								<Tooltip title="Verified" aria-label="Verified">
									<CheckCircleIcon color="primary" />
								</Tooltip>
							)}
						</div>

						<div>
							<Typography variant="body2">{email}</Typography>
							<Typography variant="body2">{phone}</Typography>
							{phone2 && <Typography>{phone2}</Typography>}
						</div>

						<div>
							{address.split(",").map((part, i) => (
								<Typography key={i}>{part}</Typography>
							))}
						</div>
					</Stack>
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
	);
};

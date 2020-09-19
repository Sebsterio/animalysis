import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Tooltip from "@material-ui/core/Tooltip";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { Stack } from "components";

const useStyles = makeStyles((theme) => ({
	header: {
		display: "grid",
		gridTemplateColumns: "1fr auto 1fr",
		alignItems: "center",
		marginBottom: theme.spacing(-1),
	},
	logo: { marginRight: theme.spacing(2) },
	badge: { justifySelf: "end" },
	details: {
		display: "grid",
		gridTemplateColumns: "1fr 1fr",
	},
	detailsColumn: {
		display: "grid",
		justifyContent: "center",
		alignContent: "start",
		gridGap: theme.spacing(0.5),
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
			<Card className={c.root}>
				<CardContent>
					<Stack>
						{/* Header */}
						<div className={c.header}>
							<div>
								{logoUrl && (
									<Avatar
										className={c.logo}
										alt={name + " logo"}
										src={logoUrl}
									/>
								)}
							</div>
							<Typography variant="h5" align="center" className={c.heading}>
								{name}
							</Typography>
							<div className={c.badge}>
								{verified && (
									<Tooltip title="Verified" aria-label="Verified">
										<CheckCircleIcon color="primary" />
									</Tooltip>
								)}
							</div>
						</div>

						<Divider />

						{/* Details */}
						<div className={c.details}>
							<div className={c.detailsColumn}>
								<Typography variant="body2">{email}</Typography>
								<Typography variant="body2">{phone}</Typography>
								{phone2 && <Typography variant="body2">{phone2}</Typography>}
							</div>

							<div className={c.detailsColumn}>
								{address.split(",").map((part, i) => (
									<Typography variant="body2" key={i}>
										{part}
									</Typography>
								))}
							</div>
						</div>
					</Stack>
				</CardContent>
			</Card>

			<Button
				children="Send an email"
				component="a"
				href={"mailto:" + email}
				target="_blank"
				disabled={!email}
				fullWidth
				variant="outlined"
				color="primary"
			/>
			<Button
				children="Call"
				component="a"
				href={"tel:" + phone}
				disabled={!phone}
				fullWidth
				variant="contained"
				color="primary"
			/>
		</Stack>
	);
};

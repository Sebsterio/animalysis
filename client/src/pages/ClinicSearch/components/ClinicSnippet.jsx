import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Tooltip from "@material-ui/core/Tooltip";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => {
	return {
		link: {
			display: "block",
			textAlign: "right",
		},
		container: ({ isCurrent, hasLogo, clickable }) => {
			let styles = { padding: theme.spacing(2) };
			if (hasLogo) {
				styles.display = "grid";
				styles.gridTemplateColumns = "auto 1fr";
				styles.gridGap = theme.spacing(2);
			}
			if (clickable) styles.cursor = "pointer";
			if (isCurrent) styles.background = "rgb(211, 234, 255)";
			return styles;
		},
		logo: {
			alignSelf: "center",
		},
		header: {
			display: "flex",
			justifyContent: "space-between",
			marginBottom: theme.spacing(0.5),
		},
		info: {
			display: "grid",
			gridTemplateColumns: "1fr 1fr",
			gridGap: theme.spacing(2),
			"& p": {
				fontSize: ".9em",
				color: theme.palette.grey[600],
			},
		},
	};
});

export const ClinicSnippet = ({ clinicData, isCurrent, handleClick }) => {
	const { name, address, email, phone, phone2, logo, verified } = clinicData;
	const c = useStyles({ isCurrent, hasLogo: !!logo, clickable: !!handleClick });

	return (
		<Paper
			className={c.container}
			onClick={handleClick ? () => handleClick(clinicData) : null}
		>
			{logo && (
				<div className={c.logo}>
					<Avatar alt={name + " logo"} src={logo} />
				</div>
			)}
			<div>
				<div className={c.header}>
					<Typography>{name}</Typography>
					{verified && (
						<Tooltip title="Verified" aria-label="Verified">
							<CheckCircleIcon color="primary" />
						</Tooltip>
					)}
				</div>
				<div className={c.info}>
					<div>
						<Typography>{email}</Typography>
						<Typography>{phone}</Typography>
						{phone2 && <Typography>{phone2}</Typography>}
					</div>
					<div>
						{address.split(",").map((part, i) => (
							<Typography key={i}>{part}</Typography>
						))}
					</div>
				</div>
			</div>
		</Paper>
	);
};

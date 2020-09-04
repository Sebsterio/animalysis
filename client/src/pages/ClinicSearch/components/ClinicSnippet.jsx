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
		container: ({ isCurrent, hasLogo }) => {
			let styles = {
				padding: theme.spacing(2),
				cursor: "pointer",
			};
			const logoStyles = hasLogo
				? {
						display: "grid",
						gridTemplateColumns: "auto 1fr",
						gridGap: theme.spacing(2),
				  }
				: {};
			const currentStyles = isCurrent
				? { background: "rgb(211, 234, 255)" }
				: {};
			return { ...styles, ...logoStyles, ...currentStyles };
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

export const ClinicSnippet = ({
	id,
	name,
	address,
	email,
	phone,
	logo = "asdf",
	verified,
	isCurrent,
	handleClick,
}) => {
	const c = useStyles({ isCurrent, hasLogo: !!logo });

	return (
		<Paper key={id} className={c.container} onClick={handleClick}>
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
					</div>
					<div>
						{address.split(",").map((part) => (
							<Typography key={part}>{part}</Typography>
						))}
					</div>
				</div>
			</div>
		</Paper>
	);
};

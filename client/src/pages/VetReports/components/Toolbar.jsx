import React from "react";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import MUI_Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import FilterListIcon from "@material-ui/icons/FilterList";

const useStyles = makeStyles((theme) => {
	const root = {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1),
	};
	const highlight = {
		...root,
		color: theme.palette.secondary.main,
		backgroundColor: lighten(theme.palette.secondary.light, 0.85),
	};
	return {
		root: ({ active }) => (active ? highlight : root),
		title: { flex: "1 1 100%" },
	};
});

export const Toolbar = ({ numSelected, markSelectedAsSeen }) => {
	const c = useStyles({ active: numSelected > 0 });

	return (
		<MUI_Toolbar className={c.root}>
			{
				numSelected > 0 ? (
					<Typography
						className={c.title}
						color="inherit"
						variant="subtitle1"
						component="div"
						children={numSelected + " selected"}
					/>
				) : null
				// TODO: Search bar here
			}

			{numSelected > 0 ? (
				<Tooltip title="Mark as received">
					<IconButton onClick={markSelectedAsSeen}>
						<CheckCircleIcon color="primary" />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title="Filter list">
					<IconButton>
						<FilterListIcon />
					</IconButton>
				</Tooltip>
			)}
		</MUI_Toolbar>
	);
};

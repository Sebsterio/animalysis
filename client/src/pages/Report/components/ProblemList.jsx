import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import ArrowRightAltRoundedIcon from "@material-ui/icons/ArrowRightAltRounded";

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
	},
}));

export const ProblemList = ({ data }) => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<List>
				{data.map(({ print, printNote }) => (
					<ListItem key={print || printNote}>
						{printNote && (
							<ListItemIcon>
								<ArrowRightAltRoundedIcon />
							</ListItemIcon>
						)}
						<ListItemText primary={print || printNote} />
					</ListItem>
				))}
			</List>
		</div>
	);
};

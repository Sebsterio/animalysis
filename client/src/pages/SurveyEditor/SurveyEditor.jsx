import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import InfoIcon from "@material-ui/icons/Info";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import Backdrop from "@material-ui/core/Backdrop";

const useStyles = makeStyles((theme) => ({
	page: {
		padding: theme.spacing(2),
		width: "100%",
	},
	accordion: {
		display: "flex",
		alignItems: "center",
		margin: theme.spacing(1, 0),
	},
	popover: {
		padding: theme.spacing(2),
	},
	backdrop: {
		zIndex: theme.zIndex.accordion + 1,
	},
}));

export const SurveyEditor = () => {
	const clx = useStyles();

	const [primerQueue, setPrimerQueue] = useState({
		list: [],
		label: "Primer Queue",
		info:
			"Primer sections are presented only when reporting a problem, not during a routine health check.",
	});
	const [mainQueue, setMainQueue] = useState({
		list: [],
		label: "Main Queue",
		info:
			"Mandatory queue; interrupted only by a red alert. An orange alert allows the user to submit the anylysis resulsts and then continue survey",
	});
	const [optionalQueue, setOptionalQueue] = useState({
		list: [],
		label: "Optional Queue",
		info:
			"User may choose to run this queue after the main queue. Secondary Queue sections that are linked as follow-up sections in Main Queue get removed from Secondary Queue, to avoid duplicate questions.",
	});
	const [sectionsData, setSectionsData] = useState({});

	// const handleClick = () => {};

	// Queue info buttons
	const [anchorEl, setAnchorEl] = useState(null);
	const [infoText, setInfoText] = useState("");
	const handleInfoClick = (e, infoText) => {
		e.stopPropagation();
		setInfoText(infoText);
		setAnchorEl(e.currentTarget);
	};
	const handleInfoClose = (e) => {
		e.stopPropagation();
		setAnchorEl(null);
	};

	return (
		<div className={clx.page}>
			{[primerQueue, mainQueue, optionalQueue].map(
				({ label, list, info }, i) => (
					/* map list into sections */
					/* add section button */
					<Accordion key={label} TransitionProps={{ unmountOnExit: true }}>
						<AccordionSummary
							classes={{ content: clx.accordion }}
							expandIcon={<ExpandMoreIcon />}
						>
							<Typography variant="h6">{label}</Typography>
							<IconButton
								children={<InfoOutlinedIcon />}
								onClick={(e) => handleInfoClick(e, info)}
							/>
						</AccordionSummary>

						<AccordionDetails></AccordionDetails>
					</Accordion>
				)
			)}

			<Backdrop
				className={clx.backdrop}
				open={!!anchorEl}
				onClick={handleInfoClose}
				invisible
			>
				<Popover
					id="info-popover"
					open={!!anchorEl}
					anchorEl={anchorEl}
					onClose={handleInfoClose}
					anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
					transformOrigin={{ vertical: "top", horizontal: "center" }}
					children={<Typography className={clx.popover} children={infoText} />}
				/>
			</Backdrop>
		</div>
	);
};

{
	/* <List
subheader={<ListSubheader children={label} />}
>
<ListItem button>
	<ListItemText primary="Sent mail" />
</ListItem>
<ListItem button>
	<ListItemText primary="Drafts" />
</ListItem>
<ListItem button onClick={handleClick}>
	<ListItemText primary="Inbox" />
	{isOpen ? <ExpandLess /> : <ExpandMore />}
</ListItem>

<Collapse in={isOpen} timeout="auto" unmountOnExit>
	<List component="div" disablePadding>
		<ListItem button className={clx.nested}>
			<ListItemText primary="Starred" />
		</ListItem>
	</List>
</Collapse>
</List> */
}

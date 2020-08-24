import React, { useState } from "react";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";

import { Section } from "./components";

import shortid from "shortid";
import { useStyles } from "./SurveyEditor-styles";
import { defaultQueues, defaultSection } from "./SurveyEditor-defaults";

shortid.characters(
	"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_"
);

// -----------------------------------------------------------------------

export const SurveyEditor = () => {
	const clx = useStyles();

	const [queues, setQueues] = useState(defaultQueues);
	const [sections, setSections] = useState({});

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

	const addSection = (queueName) => {
		const id = "_" + shortid.generate();
		const newSection = { ...defaultSection };
		const newList = [...queues[queueName].list, id];
		setQueues({
			...queues,
			[queueName]: {
				...queues[queueName],
				list: newList,
			},
		});
		setSections({
			...sections,
			[id]: newSection,
		});
	};

	const updateSectionTitle = (id, newTitle) =>
		setSections({
			...sections,
			[id]: {
				...sections[id],
				title: newTitle,
			},
		});

	return (
		<div className={clx.page}>
			{Object.entries(queues).map((entry) => {
				const [queueName, queueContent] = entry;
				const { label, list, info } = queueContent;

				return (
					<Accordion
						key={label}
						className={clx.accordion}
						TransitionProps={{ unmountOnExit: true }}
					>
						<AccordionSummary
							classes={{ content: clx.accordionSummaryContent }}
							expandIcon={<ExpandMoreIcon />}
						>
							<Typography variant="h6">{label}</Typography>
							<IconButton
								children={<InfoOutlinedIcon />}
								onClick={(e) => handleInfoClick(e, info)}
							/>
						</AccordionSummary>

						{/* Sections */}
						{list.map((sectionId) => {
							let sectionData = sections[sectionId];
							if (!sectionData) return "Error";
							return (
								<AccordionDetails key={sectionId}>
									<Section
										{...sectionData}
										id={sectionId}
										updateTitle={updateSectionTitle}
										addQuestion={() => {}}
										deleteSection={() => {}}
									/>
								</AccordionDetails>
							);
						})}

						{/* New Section button */}
						<AccordionDetails>
							<Button
								fullWidth
								variant="outlined"
								children="New Section"
								onClick={() => addSection(queueName)}
							/>
						</AccordionDetails>
					</Accordion>
				);
			})}

			{/* Popover */}
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

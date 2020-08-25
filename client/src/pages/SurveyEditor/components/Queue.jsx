import React from "react";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

import { Section } from "./index";

import { useStyles } from "../SurveyEditor-styles";

// -------------------------------------------------------------------

export const Queue = ({
	name,
	// queueProps
	label,
	list,
	info,
	// Handler/selectors
	getSectionData,
	showPopover,
	addSection,
	// Drilled
	updateSectionTitle,
	deleteSection,
	addQuestion,
}) => {
	const clx = useStyles();

	const handleInfoClick = (e) => showPopover(e, info);

	const handleAddSectionClick = () => addSection(name);

	// ----------------------------- View ------------------------------

	return (
		<Accordion
			key={label}
			className={clx.accordion}
			TransitionProps={{ unmountOnExit: true }}
		>
			{/* ------------------- Head ------------------- */}

			<AccordionSummary
				classes={{ content: clx.accordionSummaryContent }}
				expandIcon={<ExpandMoreIcon />}
			>
				<Typography variant="h6">{label}</Typography>
				<IconButton children={<InfoOutlinedIcon />} onClick={handleInfoClick} />
			</AccordionSummary>

			{/* --------------- Sections list -------------- */}

			<AccordionDetails
				className={clx.accordionDetails}
				children={list.map((sectionId) => {
					const sectionData = getSectionData(sectionId);
					return !!sectionData ? (
						<Section
							key={sectionId}
							id={sectionId}
							{...sectionData}
							updateTitle={updateSectionTitle}
							{...{ addQuestion, deleteSection }}
						/>
					) : (
						"Error: Section data not found; sectionId=" + sectionId
					);
				})}
			/>

			{/* ------------ New Section button ------------ */}

			<AccordionDetails>
				<Button
					fullWidth
					variant="outlined"
					children="New Section"
					onClick={handleAddSectionClick}
				/>
			</AccordionDetails>
		</Accordion>
	);
};

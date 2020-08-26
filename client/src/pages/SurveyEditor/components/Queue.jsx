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
	queueProps: { label, list, info },
	selectors: { getSectionData },
	operations,
	showPopover,
}) => {
	const { addSection, deleteSection, moveSection } = operations;

	const clx = useStyles();

	const handleInfoClick = (e) => showPopover(e, info);

	const handleAddSectionClick = () => addSection(name);

	const curriedOperations = {
		...operations,
		deleteSection: (id) => deleteSection(name, id),
		moveSection: (id, dir) => moveSection(name, id, dir),
	};

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
				<Typography variant="h5">{label}</Typography>
				<IconButton children={<InfoOutlinedIcon />} onClick={handleInfoClick} />
			</AccordionSummary>

			{/* --------------- Sections list -------------- */}

			<AccordionDetails
				className={clx.accordionDetails}
				children={list.map((sectionName, i) => {
					const sectionData = getSectionData(sectionName);
					const isFirst = i === 0;
					const isLast = i === list.length - 1;
					return !!sectionData ? (
						<Section
							key={sectionName}
							{...{ sectionData, sectionName, isFirst, isLast }}
							operations={curriedOperations}
						/>
					) : (
						"Error: Section data not found; sectionName=" + sectionName
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

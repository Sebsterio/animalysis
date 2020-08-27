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
	queueName,
	queueProps: { label, list, info },
	selectors,
	operations,
	helpers,
	showPopover,
}) => {
	const {
		addSectionToQueue,
		addSectionToSections,
		deleteSectionFromQueue,
		deleteSectionFromSections,
		moveSection,
	} = operations;
	const { getSectionData } = selectors;
	const { getNewName } = helpers;

	const c = useStyles();

	// ---------------------------- Handlers -----------------------------

	const handleInfoClick = (e) => showPopover(e, info);

	const handleAdd = () => {
		const sectionName = getNewName();
		addSectionToSections({ sectionName });
		addSectionToQueue({ queueName, sectionName });
	};

	// ----------------- Drilled props modifications ------------------

	const curriedOperations = {
		...operations,
		deleteSection: (data) => {
			deleteSectionFromSections(data);
			deleteSectionFromQueue({ queueName, ...data });
		},
		moveSection: (data) => moveSection({ queueName, ...data }),
	};

	// ----------------------------- View ------------------------------

	return (
		<Accordion
			key={label}
			className={c.accordion}
			TransitionProps={{ unmountOnExit: true }}
		>
			{/* ------------------- Head ------------------- */}

			<AccordionSummary
				classes={{ content: c.accordionSummaryContent }}
				expandIcon={<ExpandMoreIcon />}
			>
				<Typography variant="h5">{label}</Typography>
				<IconButton children={<InfoOutlinedIcon />} onClick={handleInfoClick} />
			</AccordionSummary>

			{/* --------------- Sections list -------------- */}

			<AccordionDetails
				className={c.accordionDetails}
				children={list.map((sectionName, i) => {
					const sectionData = getSectionData(sectionName);
					const isFirst = i === 0;
					const isLast = i === list.length - 1;
					return (
						<Section
							{...{
								key: sectionName,
								sectionName,
								sectionData,
								isFirst,
								isLast,
								selectors,
								helpers,
								operations: curriedOperations,
							}}
						/>
					);
				})}
			/>

			{/* ------------ New Section button ------------ */}

			<AccordionDetails>
				<Button
					fullWidth
					variant="outlined"
					children="New Section"
					onClick={handleAdd}
				/>
			</AccordionDetails>
		</Accordion>
	);
};

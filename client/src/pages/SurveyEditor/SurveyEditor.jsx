import React, { useEffect } from "react";

import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import Backdrop from "@material-ui/core/Backdrop";

import { Queue, Instructions } from "./components";
import { Nav } from "components";

import { useStyles } from "./SurveyEditor-styles";
import { useSurveyState, usePopover } from "./hooks";

/******************************************************************************
 * Module will be used very sparcely; performance is not a priority
 * Experimented with not using Redux or Context. Conclusion: don't do it again
 *
 * Handlers:
 * 	Save    - Replace store with local state
 * 	Publish - Save and POST
 * 	Cancel  - Abandon chages and exit
 ******************************************************************************/

export const SurveyEditor = ({ history, data, updateStore, publish }) => {
	const c = useStyles();

	const [
		{ isOpen, anchorEl, infoText },
		{ showPopover, hidePopover },
	] = usePopover();

	const [selectors, operations] = useSurveyState(data);

	const { getQueues, getSections, getHasChanged, getDatePublished } = selectors;

	const queues = getQueues();
	const sections = getSections();
	const hasChanged = getHasChanged();
	// const initialDatePublished = getDatePublished();

	// const isUpToDate = data.datePublished === initialDatePublished;

	// console.log({ new: data.datePublished, initial: getDatePublished() });

	const { resetHasChanged } = operations;

	console.log({ hasChanged });

	// -------------------------- Handlers -----------------------------

	const handleCancel = () => history.push("/admin");

	const handleSave = () => {
		resetHasChanged();
		updateStore({ queues, sections });
	};

	const handlePublish = () => {
		updateStore({ queues, sections });
		publish();
	};

	// ------------------ Drilled props modifications ------------------

	const modifiedOperations = { ...operations, showPopover };

	// ----------------------------- View ------------------------------

	return (
		<div className={c.page}>
			{/* ------------ Body ------------ */}
			<div>
				{Object.entries(queues).map(([queueName, queueProps]) => (
					<Queue
						key={queueName}
						{...{ queueName, queueProps, selectors }}
						operations={modifiedOperations}
					/>
				))}

				<Instructions />
			</div>

			<div className={c.footer}>
				<Nav
					textLeft="Cancel"
					onClickLeft={handleCancel}
					textRight="Save"
					// textMiddle="Publish"
					// onClickMiddle={handlePublish}
					// disabledMiddle={isUpToDate}
					onClickRight={handleSave}
					disabledRight={!hasChanged}
					noArrows
				/>
			</div>

			{/* ------------ Popover ------------ */}

			<Backdrop
				className={c.backdrop}
				open={isOpen}
				onClick={hidePopover}
				invisible
			>
				<Popover
					id="SurveyEditor__info-popover"
					open={isOpen}
					anchorEl={anchorEl}
					onClose={hidePopover}
					anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
					transformOrigin={{ vertical: "top", horizontal: "center" }}
					children={<Typography className={c.popover} children={infoText} />}
				/>
			</Backdrop>
		</div>
	);
};

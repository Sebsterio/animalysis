import React from "react";

import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import Backdrop from "@material-ui/core/Backdrop";

import { Queue, Instructions } from "./components";
import { Nav } from "components";

import { useStyles } from "./SurveyEditor-styles";
import { useSurveyState, usePopover } from "./hooks";

/******************************************************************************
 * Module will be used very sparcely; performance is not a priority
 * Experimenting with not using Redux or Context. Conclusion: don't do it again
 ******************************************************************************/

export const SurveyEditor = ({ history, data, submit }) => {
	const c = useStyles();

	const [
		{ isOpen, anchorEl, infoText },
		{ showPopover, hidePopover },
	] = usePopover();

	const [selectors, operations, helpers] = useSurveyState(data);

	const { getQueues, getSections } = selectors;
	const sections = getSections();
	const queues = getQueues();

	const goBack = () => history.push("/admin");

	const handleSave = () => {
		submit({ queues, sections });
		// goBack();
	};

	const modifiedOperations = { ...operations, showPopover };

	return (
		<div className={c.page}>
			{/* ------------ Body ------------ */}
			<div>
				{Object.entries(queues).map(([queueName, queueProps]) => (
					<Queue
						key={queueName}
						{...{ queueName, queueProps, selectors, helpers }}
						operations={modifiedOperations}
					/>
				))}

				<Instructions />
			</div>

			<div className={c.footer}>
				<Nav
					textLeft="Cancel"
					onClickLeft={goBack}
					textRight="Save"
					onClickRight={handleSave}
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

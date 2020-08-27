import React from "react";

import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import Backdrop from "@material-ui/core/Backdrop";

import { Queue } from "./components";

import { useStyles } from "./SurveyEditor-styles";
import { useSurveyState, usePopover } from "./hooks";

/******************************************************************
 * Experimenting with not using Redux or Context
 * Module will be used very sparcely; performance is not a priority
 ******************************************************************/

export const SurveyEditor = () => {
	const c = useStyles();

	const [
		{ isOpen, anchorEl, infoText },
		{ hidePopover, showPopover },
	] = usePopover();

	const [selectors, operations, helpers] = useSurveyState();

	const queues = selectors.getQueues();

	return (
		<div className={c.page}>
			{/* ------------ Queues ------------ */}

			{Object.entries(queues).map(([queueName, queueProps]) => (
				<Queue
					key={queueName}
					{...{
						queueName,
						queueProps,
						selectors,
						operations,
						helpers,
						showPopover,
					}}
				/>
			))}

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

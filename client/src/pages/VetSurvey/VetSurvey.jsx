import React from "react";
import { LinkBlock } from "components";
import { Survey } from "pages/Survey";

export const VetSurvey = ({
	history,
	startProblemReport,
	startRoutineCheck,
}) => {
	// input mock pet info (persisted)
	// mock pet problem report button
	// mock pet routine check button
	return (
		<div>
			<LinkBlock to="/survey/edit" text="End preview" />
			<Survey history={history} />
		</div>
	);
};

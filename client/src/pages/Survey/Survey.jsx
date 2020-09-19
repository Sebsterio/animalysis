import React from "react";
import { Page } from "components";
import { Section, Question, Nav, AlertModal } from "./components";

export const Survey = ({ surveyIsLoaded, history }) => {
	if (!surveyIsLoaded) {
		history.goBack();
		return null;
	}

	return (
		<>
			<Page
				header={<Section />}
				main={<Question history={history} />}
				footer={<Nav history={history} />}
			/>
			<AlertModal history={history} />
		</>
	);
};

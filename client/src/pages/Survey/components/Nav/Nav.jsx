import React from "react";
import { Nav as NavComponent } from "components/Nav";

export const Nav = ({
	// parent
	history,
	// state
	currentQuestion,
	questionIsAnswered,
	// dispatch
	handleGoBack,
	handleGoForward,
}) => {
	const { type } = currentQuestion;

	return (
		<NavComponent
			textLeft="Back"
			onClickLeft={() => handleGoBack(history)}
			textRight="Next"
			onClickRight={() => handleGoForward(history)}
			disabledRight={!questionIsAnswered}
			enlargedRight={["text", "select-multiple"].includes(type)}
		/>
	);
};

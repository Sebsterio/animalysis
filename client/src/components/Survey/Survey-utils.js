// Get the route prop of next element in a group (sections | questions)
export const getNextRouteInGroup = (prefix, group, route) => {
	const thisIndex = getRouteIndex(group, route);
	if (thisIndex < group.length - 1) {
		const nextRoute = group[thisIndex + 1].route;
		return prefix ? prefix + nextRoute : nextRoute;
	}
};

export const getRouteIndex = (group, route) =>
	group.findIndex((el) => el.route === route);

export const isQuestionAnswered = (questionData) => {
	questionData.answers.some((answer) => !!answer.selected);
};

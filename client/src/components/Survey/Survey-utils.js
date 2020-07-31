// Get the route prop of next element in a group (sections | questions)
export const getNextRoute = (prefix, group, route) => {
	console.log(group);
	const thisIndex = group.findIndex((el) => el.route === route);
	if (thisIndex < group.length - 1) {
		const nextRoute = group[thisIndex + 1].route;
		return prefix ? prefix + nextRoute : nextRoute;
	}
};

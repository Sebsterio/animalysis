export const makeState = (state, propName, modifier) => ({
	...state,
	[propName]: modifier(state[propName]),
});

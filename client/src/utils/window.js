// Get URL serach params as object
// e.g. "...?p1=true&p2" -> {p1: true, p2: true}
// CAUTION: only alphanumeric characters and "_" allowed in serach params
export const getSearchParams = () =>
	window.location.search
		.replace("?", "")
		.split("&")
		.reduce((obj, param) => {
			param = param.split("=");
			if (param[0]) {
				const value = !param[1]
					? true
					: param[1] === "true"
					? true
					: param[1] === "false"
					? false
					: param[1];
				obj[param[0]] = value;
			}
			return obj;
		}, {});

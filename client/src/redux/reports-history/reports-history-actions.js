export const CLEAR = "reports-history/CLEAR";
export const clear = () => ({
	type: CLEAR,
});

export const SET_ROWS = "reports-history/SET_ROWS";
export const setRows = (data) => ({
	type: SET_ROWS,
	payload: data,
});

export const SET_ORDER = "reports-history/SET_ORDER";
export const setOrder = (data) => ({
	type: SET_ORDER,
	payload: data,
});

export const SET_ORDER_BY = "reports-history/SET_ORDER_BY";
export const setOrderBy = (data) => ({
	type: SET_ORDER_BY,
	payload: data,
});

export const SET_SELECTED = "reports-history/SET_SELECTED";
export const setSelected = (data) => ({
	type: SET_SELECTED,
	payload: data,
});

export const SET_PAGE = "reports-history/SET_PAGE";
export const setPage = (data) => ({
	type: SET_PAGE,
	payload: data,
});

export const SET_ROWS_PER_PAGE = "reports-history/SET_ROWS_PER_PAGE";
export const setRowsPerPage = (data) => ({
	type: SET_ROWS_PER_PAGE,
	payload: data,
});

export const SET_QUERY = "reports-history/SET_QUERY";
export const setQuery = (data) => ({
	type: SET_QUERY,
	payload: data,
});

export const TOGGLE_SEEN_HIDDEN = "reports-history/TOGGLE_SEEN_HIDDEN";
export const toggleSeenHidden = () => ({
	type: TOGGLE_SEEN_HIDDEN,
});

import React from "react";
import { connect } from "react-redux";

import {
	setRowsPerPage,
	setPage,
	setQuery,
	setSelected,
	toggleSeenHidden,
} from "redux/reports-history/reports-history-actions";

import { Footer } from "./Footer";

// --------------------------------------------------------------

const mapStateToProps = ({
	reportsHistory: { rows, selected, page, rowsPerPage, query, seenHidden },
}) => ({
	selected,
	rows,
	rowsPerPage,
	page,
	query,
	seenHidden,
});

const mapDispatchToProps = (dispatch) => ({
	setRowsPerPage: (data) => dispatch(setRowsPerPage(data)),
	setPage: (data) => dispatch(setPage(data)),
	setQuery: (data) => dispatch(setQuery(data)),
	setSelected: (data) => dispatch(setSelected(data)),
	toggleSeenHidden: (data) => dispatch(toggleSeenHidden(data)),
});

const FooterContainer = (props) => <Footer {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(FooterContainer);

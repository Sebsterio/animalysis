import React from "react";
import { connect } from "react-redux";

import { setSelected } from "redux/reports-history/reports-history-actions";

import { Body } from "./Body";

// --------------------------------------------------------------

const mapStateToProps = ({
	reportsHistory: { rows, order, orderBy, selected, page, rowsPerPage },
}) => ({
	page,
	rowsPerPage,
	rows,
	order,
	orderBy,
	selected,
});

const mapDispatchToProps = (dispatch) => ({
	setSelected: (data) => dispatch(setSelected(data)),
});

const BodyContainer = (props) => <Body {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(BodyContainer);

import React from "react";
import { connect } from "react-redux";

import {
	setSelected,
	setOrder,
	setOrderBy,
} from "redux/reports-history/reports-history-actions";

import { Head } from "./Head";

// --------------------------------------------------------------

const mapStateToProps = ({
	reportsHistory: { rows, order, orderBy, selected },
}) => ({
	rows,
	selected,
	order,
	orderBy,
});

const mapDispatchToProps = (dispatch) => ({
	setSelected: (data) => dispatch(setSelected(data)),
	setOrder: (data) => dispatch(setOrder(data)),
	setOrderBy: (data) => dispatch(setOrderBy(data)),
});

const HeadContainer = (props) => <Head {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(HeadContainer);

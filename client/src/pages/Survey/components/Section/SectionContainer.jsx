import React from "react";
import { connect } from "react-redux";

import {
	getCurrentSectionTitle,
	getPackedHistory,
	getPackedHistoryAndQueue,
} from "redux/survey/survey-selectors";
import { getIsVet } from "redux/user/user-selectors";

import { Section } from "./Section";

const mapStateToProps = (state) => ({
	sectionTitle: getCurrentSectionTitle(state),
	historySections: getPackedHistory(state),
	historyAndQueueSections: getPackedHistoryAndQueue(state),
	isVet: getIsVet(state),
});

const mapDispatchToProps = (dispatch) => ({});

const SectionContainer = (props) => <Section {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(SectionContainer);

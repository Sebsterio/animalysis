import React from "react";
import { connect } from "react-redux";

import {
	getCurrentSectionTitle,
	getPackedHistory,
	getPackedHistoryAndQueue,
} from "redux/survey/survey-selectors";

import { Section } from "./Section";

const mapStateToProps = (state) => ({
	sectionTitle: getCurrentSectionTitle(state),
	historySections: getPackedHistory(state),
	historyAndQueueSections: getPackedHistoryAndQueue(state),
});

const mapDispatchToProps = (dispatch) => ({});

const SectionContainer = (props) => <Section {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(SectionContainer);

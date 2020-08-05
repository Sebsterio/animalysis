import React from "react";
import { connect } from "react-redux";

import {
	getCurrentSectionTitle,
	getHistoryLength,
	getQueueLength,
} from "redux/survey/survey-selectors";

import { Section } from "./Section";

const mapStateToProps = (state) => ({
	sectionTitle: getCurrentSectionTitle(state),
	historyLength: getHistoryLength(state),
	queueLength: getQueueLength(state),
});

const mapDispatchToProps = (dispatch) => ({});

const SectionContainer = (props) => <Section {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(SectionContainer);

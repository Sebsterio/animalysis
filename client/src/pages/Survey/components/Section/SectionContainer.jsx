import React from "react";
import { connect } from "react-redux";

import {
	getCurrentSequenceName,
	getCurrentSectionTitle,
	getCurrentSectionIndex,
	getLastSectionIndex,
} from "redux/survey/survey-selectors";

import { Section } from "./Section";

const mapStateToProps = (state) => ({
	sequenceName: getCurrentSequenceName(state),
	sectionTitle: getCurrentSectionTitle(state),
	sectionIndex: getCurrentSectionIndex(state),
	lastSectionIndex: getLastSectionIndex(state),
});

const mapDispatchToProps = (dispatch) => ({});

const SectionContainer = (props) => <Section {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(SectionContainer);

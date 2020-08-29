import React from "react";
import { connect } from "react-redux";

import { getIsClinicSet } from "redux/clinic/clinic-selectors";
import { getHasPhone } from "redux/profile/profile-selectors";

import { Head } from "./Head";

const mapStateToProps = (state) => ({
	clinicIsSet: getIsClinicSet(state),
	userHasPhone: getHasPhone(state),
});

const HeadContainer = (props) => <Head {...props} />;

export default connect(mapStateToProps)(HeadContainer);

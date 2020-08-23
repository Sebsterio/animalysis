import React from "react";
import { connect } from "react-redux";
import { getIsClinicSet, getHasPhone } from "redux/user/user-selectors";

import { Head } from "./Head";

const mapStateToProps = (state) => ({
	clinicIsSet: getIsClinicSet(state),
	userHasPhone: getHasPhone(state),
});

const HeadContainer = (props) => <Head {...props} />;

export default connect(mapStateToProps)(HeadContainer);

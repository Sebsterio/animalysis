import React from "react";
import { connect } from "react-redux";

import { signIn, signOut } from "redux/user/user-operations";

import { Demo } from "./Demo";

const DemoContainer = (props) => <Demo {...props} />;

export default connect(null, (dispatch) => ({
	signIn: (data) => dispatch(signIn(data)),
	signOut: () => dispatch(signOut()),
}))(DemoContainer);

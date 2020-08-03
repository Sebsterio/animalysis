import React from "react";
import { connect } from "react-redux";

import { signIn } from "redux/user/user-actions";

import Auth from "./Auth";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
	signIn: () => dispatch(signIn()),
});

const AuthContainer = (props) => <Auth {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);

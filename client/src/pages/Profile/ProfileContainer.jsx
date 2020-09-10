import React from "react";
import { connect } from "react-redux";

import { fetchUserById } from "redux/user/user-operations";

import { Profile } from "./Profile";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
	fetchClient: (data) => dispatch(fetchUserById(data)),
});

const ProfileContainer = (props) => <Profile {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);

import React from "react";
import { connect } from "react-redux";

import { getPetByName, getPetReports } from "redux/pets/pets-selectors";

import { Profile } from "./Profile";

const mapStateToProps = (state) => ({
	getPetByName: (name) => getPetByName(state, name),
	getReports: (pet) => getPetReports(pet),
});

const ProfileContainer = (props) => <Profile {...props} />;

export default connect(mapStateToProps, null)(ProfileContainer);

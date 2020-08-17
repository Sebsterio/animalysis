import React from "react";
import { connect } from "react-redux";
import { getPetByName } from "redux/pets/pets-selectors";
import { AddOrEditProfile } from "./AddOrEditProfile";

const mapStateToProps = (state) => ({
	getPet: (name) => getPetByName(state, name),
});

const mapDispatchToProps = (dispatch, props) => ({});

const AddOrEditProfileContainer = (props) => <AddOrEditProfile {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddOrEditProfileContainer);

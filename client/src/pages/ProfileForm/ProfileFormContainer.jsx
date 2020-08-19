import React from "react";
import { connect } from "react-redux";
import { getPetByName, isNameUnique } from "redux/pets/pets-selectors";
import { addPet, modifyPet } from "redux/pets/pets-actions";
import { ProfileForm } from "./ProfileForm";

const mapStateToProps = (state) => ({
	getPet: (name) => getPetByName(state, name),
	isNameUnique: (name) => isNameUnique(state, name),
});

const mapDispatchToProps = (dispatch) => ({
	addPet: (data) => dispatch(addPet(data)),
	modifyPet: (id, data) => dispatch(modifyPet(id, data)),
});

const ProfileFormContainer = (props) => <ProfileForm {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProfileFormContainer);

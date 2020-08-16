import React from "react";
import { connect } from "react-redux";
import { getAllPets } from "redux/pets/pets-selectors";

import { Home } from "./Home";

const mapStateToProps = (state) => ({
	pets: getAllPets(state),
});

const mapDispatchToProps = (dispatch) => ({});

const HomeContainer = (props) => <Home {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);

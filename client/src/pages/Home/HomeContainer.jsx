import React from "react";
import { connect } from "react-redux";
import { getAllPets } from "redux/pets/pets-selectors";
import { convertPets } from "redux/pets/pets-utils";

import { Home } from "./Home";

const mapStateToProps = (state) => ({
	pets: convertPets(getAllPets(state)),
});

const mapDispatchToProps = (dispatch) => ({});

const HomeContainer = (props) => <Home {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);

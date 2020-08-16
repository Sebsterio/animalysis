import React from "react";
import { connect } from "react-redux";

import { Home } from "./Home";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

const HomeContainer = (props) => <Home {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);

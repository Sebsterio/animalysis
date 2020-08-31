import React from "react";
import { connect } from "react-redux";
import { clearError } from "redux/error/error-actions";

export const withError = (Component) =>
	connect(
		(state) => ({
			error: state.error,
		}),
		(dispatch) => ({
			clearError: (data) => dispatch(clearError(data)),
		})
	)((props) => <Component {...props} />);

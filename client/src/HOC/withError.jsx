import React from "react";
import { connect } from "react-redux";
import {
	getIsError,
	getIsEmailError,
	getIsNewEmailError,
	getIsPasswordError,
	getIsGenericError,
	getErrorMessage,
} from "redux/error/error-selectors";
import { setError, clearError } from "redux/error/error-actions";

export const withError = (Component) =>
	connect(
		(state) => ({
			emailError: getIsEmailError(state),
			isError: getIsError(state),
			newEmailError: getIsNewEmailError(state),
			passwordError: getIsPasswordError(state),
			errorMessage: getErrorMessage(state),
			isGenericError: getIsGenericError(state),
		}),
		(dispatch) => ({
			setError: (data) => dispatch(setError(data)),
			clearError: (data) => dispatch(clearError(data)),
		})
	)((props) => <Component {...props} />);

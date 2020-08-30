import axios from "axios";
import * as $ from "./user-actions";
import { setError } from "redux/error/error-actions";
import { getConfig /* getTokenConfig */ } from "utils/ajax";

export const signIn = (formData) => (dispatch) => {
	dispatch($.signInStart());
	axios
		.post("/api/auth/sign-in", JSON.stringify(formData), getConfig())
		.then((res) => dispatch($.signInSuccess(res.data)))
		.catch((err) => {
			dispatch($.signInFail(err, err.msg));
			dispatch(setError(err));
		});
};

export const signUp = (formData) => (dispatch) => {
	dispatch($.signUpStart());
	axios
		.post("/api/auth/sign-up", JSON.stringify(formData), getConfig())
		.then((res) => dispatch($.signUpSuccess(res.data)))

		// TODO: add name to profile store

		.catch((err) => {
			dispatch($.signUpFail(err));
			dispatch(setError(err));
		});
};

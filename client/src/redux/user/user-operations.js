import axios from "axios";
import * as $ from "./user-actions";
import { getConfig /* getTokenConfig */ } from "utils/ajax";

export const signIn = (formData) => (dispatch) => {
	dispatch($.authStart());
	axios
		.post("/api/auth/sign-in", JSON.stringify(formData), getConfig())
		.then((res) => dispatch($.authSuccess(res.data)))
		.catch((err) => {
			dispatch($.authFail(err, "LOGIN_FAIL"));
		});
};

export const signUp = (formData) => (dispatch) => {
	dispatch($.authStart());
	axios
		.post("/api/auth/sign-up", JSON.stringify(formData), getConfig())
		.then((res) => dispatch($.authSuccess(res.data)))
		.catch((err) => {
			dispatch($.authFail(err, "REGISTER_FAIL"));
		});
};

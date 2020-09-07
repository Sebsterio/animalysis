import axios from "axios";
import * as $ from "./survey-data-actions";
import {
	getSurveyDataForExport,
	getDatePublished,
} from "./survey-data-selectors";
import { getClinicId } from "redux/clinic/clinic-selectors";
import { error } from "redux/error/error-operations";
import { getTokenConfig } from "utils/ajax";

// ------------------------- publishSurvey -------------------------------

export const publishSurvey = () => (dispatch, getState) => {
	const state = getState();
	const endpoint = "/api/survey/publish";
	const clinicId = getClinicId(state);
	const datePublished = getDatePublished(state);
	const surveyData = getSurveyDataForExport(state); // comes stringified
	const data = JSON.stringify({ surveyData, datePublished, clinicId });
	const config = getTokenConfig(state);
	dispatch($.publishStart());
	axios
		.post(endpoint, data, config)
		.then((res) => dispatch($.publishSuccess(res.data)))
		.catch((err) => {
			dispatch($.publishFail());
			dispatch(error(err));
		});
};

// -------------------------- syncSurvey --------------------------------

export const syncSurvey = () => (dispatch, getState) => {
	const state = getState();
	const endpoint = "/api/survey/";
	const clinicId = getClinicId(state);
	const datePublished = getDatePublished(state);
	const data = JSON.stringify({ datePublished, clinicId });
	const config = getTokenConfig(state);
	dispatch($.fetchStart());
	axios
		.post(endpoint, data, config)
		.then((res) => {
			if (res.status === 201) return dispatch($.upToDate());
			if (res.status === 200) return dispatch($.fetchSuccess(res.data));
		})
		.catch((err) => {
			dispatch($.fetchFail());
			dispatch(error(err));
		});
};

import axios from "axios";
import * as $ from "./survey-data-actions";
import {
	getSurveyDataForExport,
	getDatePublished,
} from "./survey-data-selectors";
import { error } from "redux/error/error-operations";
import { getTokenConfig } from "utils/ajax";

// ------------------------- publishSurvey -------------------------------

export const publishSurvey = () => (dispatch, getState) => {
	const endpoint = "/api/survey/publish";
	const datePublished = getDatePublished(getState());
	const surveyData = getSurveyDataForExport(getState());
	const data = JSON.stringify({ surveyData, datePublished });
	const config = getTokenConfig(getState());
	dispatch($.publishStart());
	axios
		.post(endpoint, data, config)
		.then((res) => dispatch($.publishSuccess(res.data)))
		.catch((err) => {
			dispatch($.publishFail());
			dispatch(error(err));
		});
};

// -------------------------- fetchSurvey --------------------------------

export const fetchSurvey = () => (dispatch, getState) => {
	const endpoint = "/api/survey/";
	const datePublished = getDatePublished(getState());
	const data = JSON.stringify({ datePublished });
	const config = getTokenConfig(getState());
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

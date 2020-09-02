import axios from "axios";
import * as $ from "./survey-data-actions";
import { getSurveyDataForExport } from "./survey-data-selectors";
import { error } from "redux/error/error-operations";
import { getTokenConfig } from "utils/ajax";

export const publishSurvey = () => (dispatch, getState) => {
	const endpoint = "/api/survey";
	const data = JSON.stringify(getSurveyDataForExport(getState()));
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

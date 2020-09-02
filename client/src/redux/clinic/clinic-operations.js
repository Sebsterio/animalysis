import axios from "axios";
import * as $ from "./clinic-actions";
import { updateProfile } from "redux/profile/profile-operations";
import { error } from "redux/error/error-operations";
import { getTokenConfig } from "utils/ajax";

// ============================ Pet owner ===================================

// Update user profile clinic section
export const updateClinic = (formData) => (dispatch, getState) => {
	dispatch($.modifyClinic(formData));
	dispatch(updateProfile({ clinicInfo: formData }));
};

// =============================== Vet ======================================

// ------------------------ createOrganisation ------------------------------

export const createOrganisation = (formData) => (dispatch, getState) => {
	const endpoint = "/api/clinic/create";
	const data = JSON.stringify(formData);
	const config = getTokenConfig(getState());
	dispatch($.modifyClinic(formData));
	dispatch($.createStart());
	axios
		.post(endpoint, data, config)
		.then((res) => {
			dispatch($.createSuccess(res.data));
			dispatch(updateProfile({ clinicId: res.data.id }));
		})
		.catch((err) => {
			dispatch($.createFail());
			dispatch(error(err));
		});
};

// -------------------------- updateOrganisation ------------------------------

export const updateOrganisation = (formData) => (dispatch, getState) => {
	dispatch($.modifyClinic(formData));

	dispatch($.updateStart());
	setTimeout(() => {
		dispatch($.updateSuccess(/* res.data */));
	}, 1000);
};

// // POST profile data to db
// export const updateProfile = (formData) => (dispatch, getState) => {
// 	const endpoint = "/api/profile/update";
// 	const data = JSON.stringify(formData);
// 	const config = getTokenConfig(getState());
// 	dispatch($.modify(formData));
// 	dispatch($.updateStart());
// 	axios
// 		.post(endpoint, data, config)
// 		.then((res) => dispatch($.updateSuccess(res.data)))
// 		.catch((err) => {
// 			dispatch($.updateFail());
// 			dispatch(error(err));
// 		});
// };

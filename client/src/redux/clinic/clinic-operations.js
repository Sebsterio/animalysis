import * as $ from "./clinic-actions";
import { updateProfile } from "redux/profile/profile-operations";

export const updateClinic = (formData) => (dispatch) => {
	dispatch($.modifyClinic(formData));
	dispatch(updateProfile({ clinicInfo: formData }));
};

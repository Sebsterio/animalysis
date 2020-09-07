import * as $ from "./profile-actions";
import { updateUser } from "redux/user/user-operations";

// -------------------------- updateProfile ------------------------------

// Update profile store
// POST profile data to user doc
export const updateProfile = (formData) => (dispatch) => {
	dispatch($.modify(formData));
	const userFormData = { profile: formData };
	dispatch(updateUser(userFormData));
};

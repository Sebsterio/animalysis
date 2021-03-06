import { getEmail, getIsSuperuser } from "redux/user/user-selectors";

export const getClinic = (state) => state.clinic;

export const getIsClinicSet = (state) => !!getClinic(state).name;

export const getClinicReminderIsDismissed = (state) =>
	getClinic(state).reminderDismissed;

export const getShouldShowClinicReminder = (state) =>
	!getIsClinicSet(state) && !getClinicReminderIsDismissed(state);

// For ClinicForm
// prettier-ignore
export const getFormData = (state) => {
	const { name, address, email, phone, phone2, verified, logoUrl } = getClinic(state);
	return { name, address, email, phone, phone2, verified, logoUrl };
};
// For VetClinicForm
// prettier-ignore
export const getVetFormData = (state) => {
	const { name, address, email, phone, phone2, members, verified, logoUrl, emailNotifications } = getClinic(state);
	return { name, address, email, phone, phone2, members, verified, logoUrl, emailNotifications };
};

export const getIsUpdating = (state) => getClinic(state).isUpdating;

export const getDateModified = (state) => getClinic(state).dateModified;

export const getClinicId = (state) => getClinic(state).id;

export const getIsRegistered = (state) => !!getClinicId(state);

export const getClinicPhone = (state) => getClinic(state).phone;

const getMembers = (state) => getClinic(state).members;

// ================== Authorization ===================

export const getUserRole = (state) => {
	if (getIsSuperuser(state)) return "owner";
	const userEmail = getEmail(state);
	const members = getMembers(state);
	if (!members || !members.length) return null;
	const user = members.find((m) => m.email === userEmail);
	return user ? user.role : null;
};

export const getIsMember = (state) => !!getUserRole(state);

export const getIsAdmin = (state) => {
	const role = getUserRole(state);
	return role === "owner" || role === "admin";
};

export const getIsOwner = (state) => getUserRole(state) === "owner";

// Owner can be removed only by themselves
// Admins can be removed by owners
// Assistants can be removed by owners and admins
export const getIsAllowedToDeleteMember = (state, email, role) => {
	const userEmail = getEmail(state);
	const superuser = getIsSuperuser(state);
	const isAdmin = getIsAdmin(state);
	const isOwner = getIsOwner(state);
	if (email === userEmail || superuser) return true;
	if (role === "owner") return false;
	if (!isAdmin) return false;
	if (role === "admin" && !isOwner) return false;
	return true;
};

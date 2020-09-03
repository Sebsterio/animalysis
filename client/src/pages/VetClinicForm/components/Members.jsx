import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Stack } from "components";
import { roleDescriptions } from "../VetClinicForm-constants";
import { makeArrayWithRemovedItems } from "utils/array";

const useStyles = makeStyles((theme) => ({
	form: {
		display: "grid",
		gridTemplateColumns: "auto 1fr",
		alignContent: "center",
		alignItems: "center",
		gridGap: theme.spacing(2),
	},
	member: {
		padding: theme.spacing(2),
		display: "flex",
		flexFlow: "row nowrap",
		justifyContent: "space-between",
		alignItems: "center",
	},
	role: {
		color: theme.palette.grey[500],
		textTransform: "capitalize",
	},
	footer: {
		display: "grid",
		gridAutoFlow: "column",
		gridGap: theme.spacing(2),
	},
}));

export const Members = ({
	clinic,
	setClinic,
	isAdmin,
	isOwner,
	isAllowedToDeleteMember,
}) => {
	const c = useStyles();

	const currentMembers = clinic.members || [];

	const [newMember, setNewMember] = useState(null);

	// ------------------------ Handlers ---------------------------

	const openNewMemberForm = () =>
		setNewMember({ email: "", role: "assistant" });

	const closeNewMemberForm = () => setNewMember(null);

	const editNewMember = (e) => {
		const { name, value } = e.target;
		setNewMember({ ...newMember, [name]: value });
	};

	const addMember = () => {
		setClinic({ ...clinic, members: [...currentMembers, newMember] });
		closeNewMemberForm();
	};

	const handleDeleteClick = (email) => {
		const confirmed = window.confirm("Delete member?");
		if (confirmed) {
			const selector = (member) => member.email === email;
			setClinic({
				...clinic,
				members: makeArrayWithRemovedItems(currentMembers, null, selector),
			});
		}
	};

	// ----------------------- Selectors ---------------------------

	const addingMember = !!newMember;

	const isEmailFormatValid = (email) => !!email.match(/\w+@\w+[.]\w+/);

	const isEmailDuplicate = (email) =>
		currentMembers.some((member) => member.email === email);

	const isEmailInputValid = () => {
		const { email } = newMember;
		if (!email) return false;
		return isEmailFormatValid(email) && !isEmailDuplicate(email);
	};

	// ------------------------- View ------------------------------

	return (
		<Stack>
			{/* Members List */}
			{currentMembers.map(({ email, role }) => (
				<Paper className={c.member} key={email}>
					<Typography className={c.role} children={role} />
					<Typography children={email} />
					<IconButton
						aria-label="Remove user"
						children={<CloseIcon />}
						onClick={() => handleDeleteClick(email)}
						disabled={!isAllowedToDeleteMember(email, role)}
						size="small"
					/>
				</Paper>
			))}

			{/* New Member Form */}
			{addingMember && (
				<div className={c.form}>
					<Typography
						component="label"
						htmlFor="member-email"
						children="Email"
					/>
					<TextField
						autoFocus
						fullWidth
						required
						name="email"
						value={newMember.email}
						inputProps={{ id: "member-email" }}
						onChange={editNewMember}
						error={isEmailDuplicate(newMember.email)}
						helperText={
							isEmailDuplicate(newMember.email)
								? "Member already exists."
								: undefined
						}
					/>

					{/* Type */}
					<Typography component="label" htmlFor="member-role" children="Role" />
					<TextField
						select
						fullWidth
						required
						name="role"
						value={newMember.role}
						inputProps={{ id: "member-role" }}
						onChange={editNewMember}
						helperText={roleDescriptions[newMember.role]}
					>
						{isOwner && <MenuItem value="owner">Owner</MenuItem>}
						<MenuItem value="admin">Admin</MenuItem>
						<MenuItem value="assistant">Assistant</MenuItem>
					</TextField>
				</div>
			)}

			{/* Footer */}
			<div className={c.footer}>
				{addingMember ? (
					<>
						<Button
							children="Cancel"
							onClick={closeNewMemberForm}
							variant="outlined"
							fullWidth
						/>
						<Button
							children={"Add"}
							onClick={addMember}
							disabled={!isEmailInputValid}
							variant="outlined"
							fullWidth
						/>
					</>
				) : (
					<Button
						children="New member"
						onClick={openNewMemberForm}
						disabled={!isAdmin}
						variant="outlined"
						fullWidth
					/>
				)}
			</div>
		</Stack>
	);
};

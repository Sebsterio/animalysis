import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { Stack } from "components";
import { roleDescriptions } from "../VetClinicForm-constants";

const useStyles = makeStyles((theme) => ({
	form: {
		display: "grid",
		gridTemplateColumns: "auto 1fr",
		alignContent: "center",
		alignItems: "center",
		gridGap: theme.spacing(2),
	},
	footer: {
		display: "grid",
		gridAutoFlow: "column",
		gridGap: theme.spacing(2),
	},
}));

export const Members = ({ clinic, setClinic }) => {
	const c = useStyles();

	const currentMembers = clinic.members || [];
	const [members, setMembers] = useState([...currentMembers]);
	const [newMember, setNewMember] = useState(null);

	// ------------------------ Handlers ---------------------------

	const openNewMemberForm = () =>
		setNewMember({
			email: "",
			role: "assistant",
		});

	const closeNewMemberForm = () => setNewMember(null);

	const editNewMember = (e) => {
		const { name, value } = e.target;
		setNewMember({ ...newMember, [name]: value });
	};

	const addMember = () => {
		setMembers([...members, newMember]);
		closeNewMemberForm();
	};

	// ----------------------- Selectors ---------------------------

	const addingMember = !!newMember;

	const emailInputValid =
		addingMember && newMember.email && !!newMember.email.match(/\w+@\w+[.]\w+/);

	// ------------------------- View ------------------------------

	return (
		<Stack>
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
						<MenuItem value="owner">Owner</MenuItem>
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
							disabled={!emailInputValid}
							variant="outlined"
							fullWidth
						/>
					</>
				) : (
					<Button
						children="New member"
						onClick={openNewMemberForm}
						variant="outlined"
						fullWidth
					/>
				)}
			</div>
		</Stack>
	);
};

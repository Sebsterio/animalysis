import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, MenuItem } from "@material-ui/core";
import { capitalize } from "utils/string";

const useStyles = makeStyles((theme) => ({
	stack: {
		display: "grid",
		gridGap: theme.spacing(4),
	},
	input: {
		"& > label": {
			textTransform: "capitalize",
		},
	},
}));

export const Form = ({ fields, state, setState }) => {
	const clx = useStyles();

	const handleChange = (e) =>
		setState({ ...state, [e.target.name]: e.target.value });

	return (
		<div className={clx.stack}>
			{fields.map(([type, name, config]) => {
				const { label, options } = config ? config : {};

				const inputProps = {
					key: name,
					label: label || name,
					name: name,
					value: state[name] || "",
					onChange: handleChange,
					className: clx.input,
					variant: "outlined",
				};

				return (
					// --- TEXT ---
					type === "text" ? (
						<TextField {...inputProps} />
					) : // --- SELECT ---
					type === "select" ? (
						<TextField {...inputProps} select>
							{options.map((option) => {
								const [value, label] = Array.isArray(option)
									? option
									: [option, capitalize(option)];
								return (
									<MenuItem key={value} value={value}>
										{label}
									</MenuItem>
								);
							})}
						</TextField>
					) : null
				);
			})}
		</div>
	);
};

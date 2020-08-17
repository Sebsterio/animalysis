import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, MenuItem } from "@material-ui/core";
import { capitalize } from "utils/string";

/********************************************************
 * @param fields: [
 * 	type (Str, required): 'text' | 'number' | 'select' | 'group'
 * 	name (Str, required): corresponding state prop AND react key
 *  config: ...
 * ]
 ********************************************************/

const useStyles = makeStyles((theme) => ({
	stack: ({ layout, numItems }) => {
		const baseStyles = {
			display: "grid",
			gridGap: theme.spacing(4),
		};
		const rowStyles = {
			...baseStyles,
			gridTemplateColumns: `repeat(${numItems}, 1fr)`,
		};
		return layout === "row" ? rowStyles : baseStyles;
	},
	formControl: {
		"& > label": {
			textTransform: "capitalize",
		},
	},
}));

export const Form = ({ fields, state, setState, layout }) => {
	const clx = useStyles({ layout, numItems: fields.length });

	const handleChange = (e) =>
		setState({ ...state, [e.target.name]: e.target.value });

	return (
		<div className={clx.stack}>
			{fields.map(([type, name, config]) => {
				const { label, options, fields, layout } = config ? config : {};

				const key = name;

				const inputProps = {
					key,
					name,
					label: label || name,
					onChange: handleChange,
					variant: "outlined",
					className: clx.formControl,
				};

				const textInputProps = {
					...inputProps,
					value: state[name] || "",
				};

				const numberInputProps = {
					...inputProps,
					value: state[name] || 0,
					inputProps: { type: "number", min: 0 },
				};

				const id = `input-${type}-${name}`;

				const renderOption = (option) => {
					const [value, label] = Array.isArray(option)
						? option
						: [option, capitalize(option)];
					return (
						<MenuItem key={value} value={value}>
							{label}
						</MenuItem>
					);
				};

				return type === "text" ? (
					<TextField {...textInputProps} />
				) : type === "number" ? (
					<TextField {...numberInputProps} />
				) : type === "select" ? (
					<TextField {...textInputProps} select>
						{options.map(renderOption)}
					</TextField>
				) : type === "group" ? (
					<Form {...{ key, fields, layout, state, setState }} />
				) : null;
			})}
		</div>
	);
};

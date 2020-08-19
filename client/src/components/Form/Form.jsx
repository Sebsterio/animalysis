import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, MenuItem, Button } from "@material-ui/core";
import { capitalize } from "utils/string";
import { FileInput } from "components/FileInput";

/********************************************************
 * @param fields: [
 * 	type (Str, required): 'text' | 'number' | 'select' | 'group'
 * 	name (Str, required): corresponding state prop AND react key
 *  config: ...TO ADD...
 * ]
 ********************************************************/

const useStyles = makeStyles((theme) => ({
	stack: ({ layout, numItems }) => {
		const baseStyles = {
			display: "grid",
			gridGap: theme.spacing(4),
		};
		if (layout === "row") {
			baseStyles.gridTemplateColumns = `repeat(${numItems}, 1fr)`;
		}
		if (layout === "flex-row") {
			baseStyles.gridTemplateColumns = `repeat(${numItems}, auto)`;
		}
		return baseStyles;
	},
	inputContainer: {
		"& > label": {
			textTransform: "capitalize",
		},
		"& .fileUploadButton": {
			padding: theme.spacing(2),
		},
	},
	hidden: { display: "none" },
}));

export const Form = ({ fields, state, setState, layout }) => {
	const clx = useStyles({ layout, numItems: fields.length });

	const handleChange = (e) => {
		let { name, value, type, files } = e.target;
		if (type === "number") value = Number(value);
		if (type === "file") value = files[0];
		setState({ ...state, [name]: value });
	};

	return (
		<div className={clx.stack}>
			{fields.map(([type, name, config]) => {
				if (!config) config = {};

				const { label, options, req, err, fields, layout } = config;
				const { min = 0, max = null, handler } = config;

				const baseProps = {
					key: name,
				};

				const inputProps = {
					...baseProps,
					name,
					label: err || label || name,
					error: !!err,
					required: !!req,
					onChange: handleChange,
					variant: "outlined",
					className: clx.inputContainer,
				};

				const textInputProps = {
					...inputProps,
					value: state[name] || "",
				};

				const numberInputProps = {
					...inputProps,
					value: state[name] || 0,
					inputProps: { type: "number", min, max },
				};

				const buttonInputProps = {
					...baseProps,
					children: label || name,
					onClick: handler,
					variant: "outlined",
				};

				const childFormProps = {
					...baseProps,
					fields,
					layout,
					state,
					setState,
				};

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
				) : type === "button" ? (
					<Button {...buttonInputProps} />
				) : type === "file" ? (
					<FileInput {...inputProps} />
				) : type === "group" ? (
					<Form {...childFormProps} />
				) : null;
			})}
		</div>
	);
};

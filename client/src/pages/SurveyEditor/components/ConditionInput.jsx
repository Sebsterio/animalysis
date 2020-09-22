import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

export const ConditionInput = (props) => (
	<TextField select fullWidth {...props}>
		<MenuItem value="species:canine">Dog</MenuItem>
		<MenuItem value="species:feline">Cat</MenuItem>
		<MenuItem value="sex:male">Male (any)</MenuItem>
		<MenuItem value="sex:male entire">Male entire</MenuItem>
		<MenuItem value="sex:male neutered">Male neutered</MenuItem>
		<MenuItem value="sex:female">Female (any)</MenuItem>
		<MenuItem value="sex:female entire">Female entire</MenuItem>
		<MenuItem value="sex:female neutered">Female neutered</MenuItem>
		<MenuItem value="sex:entire">(any) entire</MenuItem>
		<MenuItem value="sex:neutered">(any) neutered</MenuItem>
	</TextField>
);

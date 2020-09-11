import React from "react";

import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Dictionary } from "components";

export const PetDetails = ({ weight, microchip }) => {
	if (!weight && !microchip) return null;
	return (
		<Card>
			<CardContent>
				<Dictionary>
					{!!weight && (
						<>
							<Typography variant="subtitle2" color="primary">
								Weight:
							</Typography>
							<Typography>{weight} kg</Typography>
						</>
					)}
					{!!microchip && (
						<>
							<Typography variant="subtitle2" color="primary">
								Microchip:
							</Typography>
							<Typography>{microchip}</Typography>
						</>
					)}
				</Dictionary>
			</CardContent>
		</Card>
	);
};

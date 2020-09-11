import React from "react";

import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Dictionary } from "components";

export const PetDetails = ({ weight, microchip, owner }) => {
	const { firstName, surname } = owner;
	const ownerName = firstName + (surname ? ` ${surname}` : "");
	return (
		<Card>
			<CardContent>
				<Dictionary compact>
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
					<Typography variant="subtitle2" color="primary">
						Owner:
					</Typography>
					<Typography>{ownerName}</Typography>
				</Dictionary>
			</CardContent>
		</Card>
	);
};

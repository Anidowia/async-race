import { createAsyncThunk } from "@reduxjs/toolkit";

import { Winner } from "./types";
import { Url } from "../../common/api/api";
import { AppDispatch } from "../hooks/hooks";
import { postRequest, putRequest } from "../../common/api/requests";

const getCarIdByName = (
	cars: Array<{ id: number; name: string }>,
	carName: string
) => {
	const foundCar = cars.find((car) => car.name === carName);
	return foundCar ? foundCar.id : null;
};

export const fetchWinners = createAsyncThunk<Winner[]>(
	"winners/fetchWinners",
	async () => {
		const response = await fetch(`${Url}/winners`);
		if (!response.ok) {
			throw new Error("Failed to fetch winners");
		}
		return response.json();
	}
);

const getCurrentWins = async (carId: number): Promise<number | null> => {
	const url = `${Url}/winners/${carId}`;
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error("Network response was not ok.");
		}
		const result = await response.json();
		return result.wins;
	} catch (error) {
		console.error("Error fetching current wins:", error);
		return null;
	}
};

export const sendWinnerData = async (
	carName: string,
	winnerTime: number,
	cars: Array<{ id: number; name: string }>,
	dispatch: AppDispatch
) => {
	const carId = getCarIdByName(cars, carName);

	if (carId === null) {
		return;
	}

	try {
		const currentWins = await getCurrentWins(carId);
		const wins = currentWins !== null ? currentWins : 0;

		const url = `${Url}/winners`;
		if (wins > 0) {
			await putRequest(`${url}/${carId}`, { wins: wins + 1, time: winnerTime });
		} else {
			await postRequest(url, { id: carId, wins: wins + 1, time: winnerTime });
		}

		dispatch(fetchWinners());
	} catch (error) {
		console.error("Error:", error);
	}
};

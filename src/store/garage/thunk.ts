import { createAsyncThunk } from "@reduxjs/toolkit";

import { Url } from "../../common/api/api";
import {
	deleteRequest,
	fetchRequest,
	postRequest,
	putRequest,
} from "../../common/api/requests";

export const fetchCars = createAsyncThunk("garage/fetchCars", async () => {
	const url = `${Url}/garage`;
	return fetchRequest(url);
});

export const fetchCarNames = createAsyncThunk<string[]>(
	"garage/fetchCarNames",
	async () => {
		const apiUrl =
			"https://databases.one/api/?format=json&select=make&api_key=Your_Database_Api_Key";
		const data = await fetchRequest(apiUrl);
		if (data && Array.isArray(data.result)) {
			return data.result.map((car: { make: string }) => car.make);
		}
		throw new Error("Unexpected response format");
	}
);

export const fetchCarModels = createAsyncThunk<string[]>(
	"garage/fetchCarModels",
	async () => {
		const apiUrl =
			"https://databases.one/api/?format=json&select=model&api_key=Your_Database_Api_Key";
		const data = await fetchRequest(apiUrl);
		if (data && Array.isArray(data.result)) {
			return data.result.map((model: { model: string }) => model.model);
		}
		throw new Error("Unexpected response format for models");
	}
);

export const addCarToGarage = createAsyncThunk(
	"garage/addCarToGarage",
	async (car: { name: string; color: string }) => {
		const url = `${Url}/garage`;
		return postRequest(url, car);
	}
);

export const deleteCar = createAsyncThunk(
	"garage/deleteCar",
	async (carId: number, { dispatch }) => {
		const url = `${Url}/garage/${carId}`;
		await deleteRequest(url);
		dispatch(fetchCars());
		return carId;
	}
);

export const updateCar = createAsyncThunk(
	"garage/updateCar",
	async (car: { id: number; name?: string; color?: string }) => {
		const url = `${Url}/garage/${car.id}`;
		return putRequest(url, car);
	}
);

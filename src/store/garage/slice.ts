import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Car, GarageState } from "./types";
import { fetchCars, addCarToGarage, deleteCar, updateCar } from "./thunk";

const initialState: GarageState = {
	cars: [],
	status: "idle",
	error: null,
	selectedCar: null,
	velocity: null,
	distance: null,
	firstCarFinished: null,
};

const garageSlice = createSlice({
	name: "garage",
	initialState,
	reducers: {
		setSelectedCar: (state, action: PayloadAction<Car>) => ({
			...state,
			selectedCar: action.payload,
		}),
		clearSelectedCar: (state) => ({
			...state,
			selectedCar: null,
		}),
		setFirstCarFinished: (state, action: PayloadAction<string | null>) => ({
			...state,
			firstCarFinished: action.payload,
		}),
		clearFirstCarFinished: (state) => ({
			...state,
			firstCarFinished: null,
		}),
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCars.pending, (state) => ({
				...state,
				status: "loading",
			}))
			.addCase(fetchCars.fulfilled, (state, action: PayloadAction<Car[]>) => ({
				...state,
				status: "succeeded",
				cars: action.payload,
			}))
			.addCase(fetchCars.rejected, (state, action) => ({
				...state,
				status: "failed",
				error: action.error.message || "Failed to fetch cars",
			}))
			.addCase(
				addCarToGarage.fulfilled,
				(state, action: PayloadAction<Car>) => {
					state.cars.push(action.payload);
				}
			)
			.addCase(addCarToGarage.rejected, (state, action) => ({
				...state,
				status: "failed",
				error: action.error.message || "Failed to add cars",
			}))
			.addCase(deleteCar.fulfilled, (state, action: PayloadAction<number>) => {
				state.cars.filter((car) => car.id !== action.payload);
			})
			.addCase(deleteCar.rejected, (state, action) => ({
				...state,
				status: "failed",
				error: action.error.message || "Failed to delete car",
			}))
			.addCase(updateCar.fulfilled, (state, action: PayloadAction<Car>) => ({
				...state,
				cars: state.cars.map((car) =>
					car.id === action.payload.id ? action.payload : car
				),
			}))
			.addCase(updateCar.rejected, (state, action) => ({
				...state,
				status: "failed",
				error: action.error.message || "Failed to update car",
			}));
	},
});

export const {
	setSelectedCar,
	clearSelectedCar,
	setFirstCarFinished,
	clearFirstCarFinished,
} = garageSlice.actions;
export default garageSlice.reducer;

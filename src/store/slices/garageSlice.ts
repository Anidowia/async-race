import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface Car {
	name: string;
	color: string;
	id: number;
}

interface GarageState {
	cars: Car[];
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
}

const initialState: GarageState = {
	cars: [],
	status: "idle",
	error: null,
};

export const fetchCars = createAsyncThunk<Car[]>(
	"garage/fetchCars",
	async () => {
		const response = await fetch("http://localhost:3000/garage");
		if (!response.ok) {
			throw new Error("Failed to fetch cars");
		}
		return response.json();
	}
);

export const addCarToGarage = createAsyncThunk(
	"garage/addCarToGarage",
	async (car: { name: string; color: string }) => {
		const response = await fetch("http://localhost:3000/garage", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(car),
		});
		if (!response.ok) {
			throw new Error("Failed to add car");
		}
		return response.json();
	}
);

export const deleteCar = createAsyncThunk(
	"garage/deleteCar",
	async (carId: number, { dispatch }) => {
		const response = await fetch(`http://localhost:3000/garage/${carId}`, {
			method: "DELETE",
		});
		if (!response.ok) {
			throw new Error("Failed to delete car");
		}
		dispatch(fetchCars());
		return carId;
	}
);

const garageSlice = createSlice({
	name: "garage",
	initialState,
	reducers: {},
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
			}));
	},
});

export default garageSlice.reducer;

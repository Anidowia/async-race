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
	selectedCar: Car | null;
	velocity: number | null;
	distance: number | null;
}

const initialState: GarageState = {
	cars: [],
	status: "idle",
	error: null,
	selectedCar: null,
	velocity: null,
	distance: null,
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

export const fetchCarNames = async () => {
	const apiUrl =
		"https://databases.one/api/?format=json&select=make&api_key=Your_Database_Api_Key";
	const response = await fetch(apiUrl);
	if (!response.ok) {
		throw new Error("Failed to fetch car names");
	}
	const data = await response.json();
	if (data && Array.isArray(data.result)) {
		return data.result.map((car: { make: string }) => car.make);
	}
	throw new Error("Unexpected response format");
};

export const fetchCarModels = async () => {
	const apiUrl =
		"https://databases.one/api/?format=json&select=model&api_key=Your_Database_Api_Key";
	const response = await fetch(apiUrl);
	if (!response.ok) {
		throw new Error("Failed to fetch car models");
	}
	const data = await response.json();

	// Access the result property and map to get the car models
	if (data && Array.isArray(data.result)) {
		return data.result.map((model: { model: string }) => model.model);
	}
	throw new Error("Unexpected response format for models");
};

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

export const updateCar = createAsyncThunk(
	"garage/updateCar",
	async (car: { id: number; name?: string; color?: string }) => {
		const response = await fetch(`http://localhost:3000/garage/${car.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(car),
		});
		if (!response.ok) {
			throw new Error("Failed to update car");
		}
		return response.json();
	}
);

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

export const { setSelectedCar, clearSelectedCar } = garageSlice.actions;
export default garageSlice.reducer;

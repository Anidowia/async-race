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

const garageSlice = createSlice({
	name: "garage",
	initialState,
	reducers: {
		addCar(state, action: PayloadAction<Car>) {
			return {
				...state,
				cars: [...state.cars, action.payload],
			};
		},
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
			}));
	},
});

export const { addCar } = garageSlice.actions;
export default garageSlice.reducer;

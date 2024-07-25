import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CarPosition } from "../../common/interface/interface";

const initialState: CarPosition = {};

const pausedCarSlice = createSlice({
	name: "pausedCar",
	initialState,
	reducers: {
		setPausedCar: (
			state,
			action: PayloadAction<{ carName: string; position: number }>
		) => {
			state[action.payload.carName] = action.payload.position;
		},
		resetPausedCars: () => initialState,
	},
});

export const { setPausedCar, resetPausedCars } = pausedCarSlice.actions;
export default pausedCarSlice.reducer;

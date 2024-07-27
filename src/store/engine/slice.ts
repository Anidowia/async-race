import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { toggleEngine, driveEngine } from "./thunk";

interface EngineState {
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
	velocity: number;
	distance: number;
	winnerName: string | null;
	winnerTime: number | null;
	data: string | null;
}

const initialState: EngineState = {
	status: "idle",
	error: null,
	velocity: 0,
	distance: 0,
	winnerName: null,
	winnerTime: null,
	data: null,
};

const engineSlice = createSlice({
	name: "engine",
	initialState,
	reducers: {
		setWinnerName(state, action: PayloadAction<string>) {
			state.winnerName = action.payload;
		},
		clearWinnerData(state) {
			state.winnerTime = null;
			state.winnerName = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(toggleEngine.pending, (state) => ({
				...state,
				status: "loading",
				error: null,
			}))
			.addCase(toggleEngine.fulfilled, (state, action) => ({
				...state,
				status: "succeeded",
				velocity: action.payload.velocity,
				distance: action.payload.distance,
			}))
			.addCase(toggleEngine.rejected, (state, action) => ({
				...state,
				status: "failed",
				error: action.error.message || "Failed to toggle engine",
			}))
			.addCase(driveEngine.pending, (state) => ({
				...state,
				status: "loading",
				error: null,
			}))
			.addCase(driveEngine.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload.data;
				if (state.winnerTime === null) {
					state.winnerTime = action.payload.duration;
				}
			})
			.addCase(driveEngine.rejected, (state, action) => ({
				...state,
				status: "failed",
				error: action.error.message || "Failed to switch to drive mode",
			}));
	},
});

export const { clearWinnerData, setWinnerName } = engineSlice.actions;

export default engineSlice.reducer;

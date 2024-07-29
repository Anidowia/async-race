import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { toggleEngine, driveEngine } from "./thunk";
import { EngineState } from "./types";

const initialState: EngineState = {
	status: "idle",
	error: null,
	velocity: 0,
	distance: 0,
	winnerName: null,
	winnerTime: null,
	data: null,
	activeCars: 0,
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
		resetActiveCars(state) {
			state.activeCars = 0;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(toggleEngine.pending, (state) => ({
				...state,
				status: "loading",
				error: null,
			}))
			.addCase(toggleEngine.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.velocity = action.payload.velocity;
				state.distance = action.payload.distance;
				state.activeCars += 1;
			})
			.addCase(toggleEngine.rejected, (state, action) => {
				state.status = "failed";
				state.error =
					action.error.message || "Failed to switch to toggle engine";
			})
			.addCase(driveEngine.pending, (state) => {
				state.status = "loading";
				state.error = null;
			})
			.addCase(driveEngine.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload.data;
				if (state.winnerTime === null) {
					state.winnerTime = action.payload.duration;
				}
			})
			.addCase(driveEngine.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message || "Failed to switch to drive mode";
				state.activeCars -= 1;
			});
	},
});

export const { clearWinnerData, setWinnerName, resetActiveCars } =
	engineSlice.actions;

export default engineSlice.reducer;

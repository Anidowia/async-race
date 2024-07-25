import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../hooks/hooks";
import { toggleEngine, driveEngine } from "./thunk";

interface EngineState {
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
	velocity: number;
	distance: number;
	winnerTime: number | null;
	data: any;
}

const initialState: EngineState = {
	status: "idle",
	error: null,
	velocity: 0,
	distance: 0,
	winnerTime: null,
	data: null,
};

const engineSlice = createSlice({
	name: "engine",
	initialState,
	reducers: {
		setWinnerTime(state, action: PayloadAction<number>) {
			state.winnerTime = action.payload;
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
				state.winnerTime = action.payload.duration;
			})
			.addCase(driveEngine.rejected, (state, action) => ({
				...state,
				status: "failed",
				error: action.error.message || "Failed to switch to drive mode",
			}));
	},
});

export const { setWinnerTime } = engineSlice.actions;

export default engineSlice.reducer;

export const selectEngineState = (state: RootState) => state.engine;
export const selectWinnerTime = (state: RootState) => state.engine.winnerTime;

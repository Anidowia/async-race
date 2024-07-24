import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../hooks/hooks";
import { toggleEngine, driveEngine } from "./thunk";

interface EngineState {
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
	velocity: number;
	distance: number;
}

const initialState: EngineState = {
	status: "idle",
	error: null,
	velocity: 0,
	distance: 0,
};

const engineSlice = createSlice({
	name: "engine",
	initialState,
	reducers: {},
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
			.addCase(driveEngine.fulfilled, (state) => ({
				...state,
				status: "succeeded",
			}))
			.addCase(driveEngine.rejected, (state, action) => ({
				...state,
				status: "failed",
				error: action.error.message || "Failed to switch to drive mode",
			}));
	},
});

export default engineSlice.reducer;

export const selectEngineState = (state: RootState) => state.engine;

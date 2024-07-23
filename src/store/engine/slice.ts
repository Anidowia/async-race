import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { EngineStatus, EngineStats } from "./types";
import { RootState } from "../hooks/hooks";

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

export const toggleEngine = createAsyncThunk(
	"engine/toggleEngine",
	async ({ id, status }: { id: number; status: EngineStatus }) => {
		const response = await fetch(
			`http://localhost:3000/engine?id=${id}&status=${status}`,
			{
				method: "PATCH",
			}
		);
		if (!response.ok) {
			const error = await response.json();
			throw new Error(error);
		}
		const data: EngineStats = await response.json();
		return data;
	}
);

export const driveEngine = createAsyncThunk(
	"engine/driveEngine",
	async ({ id }: { id: number }) => {
		const response = await fetch(
			`http://localhost:3000/engine?id=${id}&status=${EngineStatus.DRIVE}`,
			{
				method: "PATCH",
			}
		);
		if (!response.ok) {
			const error = await response.json();
			throw new Error(error);
		}
		const data = await response.json();
		return data;
	}
);

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

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Winner, WinnersState } from "./types";
import { fetchWinners } from "./thunk";

const initialState: WinnersState = {
	winners: [],
	status: "idle",
	error: null,
};

const winnersSlice = createSlice({
	name: "winners",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchWinners.pending, (state) => ({
				...state,
				status: "loading",
			}))
			.addCase(
				fetchWinners.fulfilled,
				(state, action: PayloadAction<Winner[]>) => ({
					...state,
					status: "succeeded",
					winners: action.payload.map((winner) => ({
						...winner,
						time: Math.min(
							winner.time,
							state.winners.find((w) => w.id === winner.id)?.time || Infinity
						),
					})),
				})
			)
			.addCase(fetchWinners.rejected, (state, action) => ({
				...state,
				status: "failed",
				error: action.error.message || "Failed to fetch winners",
			}));
	},
});

export default winnersSlice.reducer;

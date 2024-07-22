import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface Winner {
	id: number;
	wins: number;
	time: number;
}

interface WinnersState {
	winners: Winner[];
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
}

const initialState: WinnersState = {
	winners: [],
	status: "idle",
	error: null,
};

export const fetchWinners = createAsyncThunk<Winner[]>(
	"winners/fetchWinners",
	async () => {
		const response = await fetch("http://localhost:3000/winners");
		if (!response.ok) {
			throw new Error("Failed to fetch winners");
		}
		return response.json();
	}
);

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
					winners: action.payload,
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

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Page {
	currentPage: number;
	carsPerPage: number;
	winnersPerPage: number;
}

const initialState: Page = {
	currentPage: 1,
	carsPerPage: 7,
	winnersPerPage: 7,
};

const pageSlice = createSlice({
	name: "page",
	initialState,
	reducers: {
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload;
		},
		setCarsPerPage(state, action: PayloadAction<number>) {
			state.carsPerPage = action.payload;
		},
		setWinnersPerPage(state, action: PayloadAction<number>) {
			state.winnersPerPage = action.payload;
		},
	},
});

export const { setCurrentPage, setCarsPerPage, setWinnersPerPage } =
	pageSlice.actions;

export default pageSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Page {
	currentPage: number;
	carsPerPage: number;
}

const initialState: Page = {
	currentPage: 1,
	carsPerPage: 7,
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
	},
});

export const { setCurrentPage, setCarsPerPage } = pageSlice.actions;

export default pageSlice.reducer;

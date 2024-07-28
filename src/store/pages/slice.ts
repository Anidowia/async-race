import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Page {
	garageCurrentPage: number;
	winnersCurrentPage: number;
	carsPerPage: number;
	winnersPerPage: number;
}

const initialState: Page = {
	garageCurrentPage: 1,
	winnersCurrentPage: 1,
	carsPerPage: 7,
	winnersPerPage: 7,
};

const loadPageFromLocalStorage = (key: string): number => {
	const storedPage = localStorage.getItem(key);
	return storedPage ? parseInt(storedPage, 10) : 1;
};

const pageSlice = createSlice({
	name: "page",
	initialState: {
		...initialState,
		garageCurrentPage: loadPageFromLocalStorage("garageCurrentPage"),
		winnersCurrentPage: loadPageFromLocalStorage("winnersCurrentPage"),
	},
	reducers: {
		setGarageCurrentPage(state, action: PayloadAction<number>) {
			state.garageCurrentPage = action.payload;
			localStorage.setItem("garageCurrentPage", action.payload.toString());
		},
		setWinnersCurrentPage(state, action: PayloadAction<number>) {
			state.winnersCurrentPage = action.payload;
			localStorage.setItem("winnersCurrentPage", action.payload.toString());
		},
		setCarsPerPage(state, action: PayloadAction<number>) {
			state.carsPerPage = action.payload;
		},
		setWinnersPerPage(state, action: PayloadAction<number>) {
			state.winnersPerPage = action.payload;
		},
	},
});

export const {
	setGarageCurrentPage,
	setWinnersCurrentPage,
	setCarsPerPage,
	setWinnersPerPage,
} = pageSlice.actions;

export default pageSlice.reducer;

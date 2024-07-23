import { configureStore } from "@reduxjs/toolkit";

import garageReducer from "./slices/garageSlice";
import winnersReducer from "./slices/winnersSlice";
import engineSlice from "./engine/slice";

export const store = configureStore({
	reducer: {
		garage: garageReducer,
		winners: winnersReducer,
		engine: engineSlice,
	},
});

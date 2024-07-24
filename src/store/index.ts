import { configureStore } from "@reduxjs/toolkit";

import garageReducer from "./garage/slice";
import winnersReducer from "./winners/slice";
import engineSlice from "./engine/slice";

export const store = configureStore({
	reducer: {
		garage: garageReducer,
		winners: winnersReducer,
		engine: engineSlice,
	},
});

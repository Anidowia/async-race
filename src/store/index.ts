import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import garageReducer from "./garage/slice";
import winnersReducer from "./winners/slice";
import engineReducer from "./engine/slice";
import pausedCarReducer from "./car/slice";
import pageReducer from "./pages/slice";

const rootReducer = combineReducers({
	garage: garageReducer,
	winners: winnersReducer,
	engine: engineReducer,
	pausedCar: pausedCarReducer,
	page: pageReducer,
});

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["pausedCar"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
	devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

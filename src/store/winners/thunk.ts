import { createAsyncThunk } from "@reduxjs/toolkit";
import { Winner } from "./types";

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

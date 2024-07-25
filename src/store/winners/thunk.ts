import { createAsyncThunk } from "@reduxjs/toolkit";

import { Winner } from "./types";
import { Url } from "../../common/api/api";

export const fetchWinners = createAsyncThunk<Winner[]>(
	"winners/fetchWinners",
	async () => {
		const response = await fetch(`${Url}/winners`);
		if (!response.ok) {
			throw new Error("Failed to fetch winners");
		}
		return response.json();
	}
);

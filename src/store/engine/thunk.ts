import { createAsyncThunk } from "@reduxjs/toolkit";

import { EngineStatus, EngineStats } from "./types";
import { Url } from "../../common/api/api";
import { patchRequest } from "../../common/api/requests";

export const toggleEngine = createAsyncThunk(
	"engine/toggleEngine",
	async ({ id, status }: { id: number; status: EngineStatus }) => {
		const url = `${Url}/engine?id=${id}&status=${status}`;
		const data: EngineStats = await patchRequest(url);
		return data;
	}
);

export const driveEngine = createAsyncThunk(
	"engine/driveEngine",
	async ({ id }: { id: number }) => {
		const url = `${Url}/engine?id=${id}&status=${EngineStatus.DRIVE}`;
		const data = await patchRequest(url);
		return data;
	}
);

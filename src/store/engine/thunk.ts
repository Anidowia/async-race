import { createAsyncThunk } from "@reduxjs/toolkit";

import { EngineState, EngineStatus } from "./types";
import { Url } from "../../common/api/api";
import { patchRequest } from "../../common/api/requests";

export const toggleEngine = createAsyncThunk(
	"engine/toggleEngine",
	async ({ id, status }: { id: number; status: EngineStatus }) => {
		const url = `${Url}/engine?id=${id}&status=${status}`;
		const data: EngineState = await patchRequest(url);
		return data;
	}
);

export const driveEngine = createAsyncThunk(
	"engine/driveEngine",
	async ({ id }: { id: number }) => {
		const url = `${Url}/engine?id=${id}&status=${EngineStatus.DRIVE}`;
		const startTime = performance.now();
		const data = await patchRequest(url);
		const endTime = performance.now();
		const duration = endTime - startTime;
		console.log(data, duration, id);
		return { data, duration, id };
	}
);

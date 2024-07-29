export enum EngineStatus {
	START = "started",
	STOP = "stopped",
	DRIVE = "drive",
}
export interface EngineState {
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
	velocity: number;
	distance: number;
	winnerName: string | null;
	winnerTime: number | null;
	data: string | null;
	activeCars: number;
}

export enum EngineStatus {
	START = "started",
	STOP = "stopped",
	DRIVE = "drive",
}

export interface EngineStats {
	velocity: number;
	distance: number;
}

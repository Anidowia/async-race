export interface Winner {
	id: number;
	wins: number;
	time: number;
}

export interface WinnersState {
	winners: Winner[];
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
}

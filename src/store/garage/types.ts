export interface Car {
	name: string;
	color: string;
	id: number;
}

export interface GarageState {
	cars: Car[];
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
	selectedCar: Car | null;
	velocity: number | null;
	distance: number | null;
}

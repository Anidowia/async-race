import { AnimatingCars } from "../common/interface/interface";
import { setPausedCar } from "../store/car/slice";
import { driveEngine, toggleEngine } from "../store/engine/thunk";
import { EngineStatus } from "../store/engine/types";
import { AppDispatch } from "../store/hooks/hooks";

export const startRace =
	(
		dispatch: AppDispatch,
		cars: { id: number; name: string }[],
		setAnimatingCars: React.Dispatch<React.SetStateAction<AnimatingCars>>
	) =>
	(id: number, carName: string) => {
		dispatch(toggleEngine({ id, status: EngineStatus.START }))
			.unwrap()
			.then((data) => {
				const duration = (data.distance / data.velocity / 1000).toFixed(2);
				setAnimatingCars((prev) => ({
					...prev,
					[carName]: true,
				}));

				const carElement = document.getElementById(`${carName}`);
				if (carElement) {
					carElement.style.animationDuration = `${duration}s`;
				}

				dispatch(driveEngine({ id }))
					.unwrap()
					.catch(() => {
						if (carElement) {
							const currentTransform =
								window.getComputedStyle(carElement).transform;
							const matrix = new WebKitCSSMatrix(currentTransform);
							const translateX = (matrix.m41 / window.innerWidth) * 100;

							dispatch(setPausedCar({ carName, position: translateX }));
							setAnimatingCars((prev) => ({
								...prev,
								[carName]: false,
							}));
						}
					});
			});
	};

export const stopRace =
	(
		dispatch: AppDispatch,
		setAnimatingCars: React.Dispatch<React.SetStateAction<AnimatingCars>>
	) =>
	(id: number, carName: string) => {
		dispatch(toggleEngine({ id, status: EngineStatus.STOP }))
			.unwrap()
			.then(() => {
				const carElement = document.getElementById(`${carName}`);
				if (carElement) {
					carElement.style.transform = "translateX(0)";
				}
				dispatch(setPausedCar({ carName, position: 0 }));
				setAnimatingCars((prev) => ({
					...prev,
					[carName]: false,
				}));
			});
	};

export const controlRaceEnd = (
	carName: string,
	updatePausedCar: (position: number) => void,
	setAnimatingCars: React.Dispatch<
		React.SetStateAction<{ [key: string]: boolean }>
	>,
	firstCarFinished: string | null,
	setFirstCarFinished: (carName: string | null) => void
) => {
	updatePausedCar(88);
	setAnimatingCars((prev) => ({
		...prev,
		[carName]: false,
	}));
	if (!firstCarFinished) {
		setFirstCarFinished(carName);
		console.log(`First car to finish: ${carName}`);
	}
};

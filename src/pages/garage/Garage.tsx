import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CarSection from "./components/CarSection";

import { fetchCars } from "../../store/slices/garageSlice";
import { AppDispatch, RootState } from "../../store/hooks/hooks";

import styles from "./Garage.module.scss";
import { EngineStatus } from "../../store/engine/types";
import { driveEngine, toggleEngine } from "../../store/engine/slice";

interface CarPosition {
	[key: string]: number;
}

interface AnimatingCars {
	[key: string]: boolean;
}

interface GarageProps {
	animatingCars: AnimatingCars;
	pausedCars: CarPosition;
	setPausedCars: React.Dispatch<React.SetStateAction<CarPosition>>;
	setAnimatingCars: React.Dispatch<React.SetStateAction<AnimatingCars>>;
}

const Garage: React.FC<GarageProps> = ({
	animatingCars,
	pausedCars,
	setPausedCars,
	setAnimatingCars,
}) => {
	const dispatch: AppDispatch = useDispatch();
	const { cars, status } = useSelector((state: RootState) => state.garage);

	useEffect(() => {
		if (status === "idle") {
			dispatch(fetchCars());
		}
	}, [status, dispatch]);

	const handleAnimationEnd = (carName: string) => {
		setPausedCars((prevPaused) => ({
			...prevPaused,
			[carName]: 88,
		}));
		setAnimatingCars((prev) => ({
			...prev,
			[carName]: false,
		}));
	};

	const handleStartClick = (id: number, carName: string) => {
		dispatch(toggleEngine({ id, status: EngineStatus.START }))
			.unwrap()
			.then((data) => {
				const duration = Math.round(data.distance / data.velocity / 1000);
				setAnimatingCars((prev) => ({
					...prev,
					[carName]: true,
				}));
				setPausedCars((prevPaused) => ({
					...prevPaused,
					[carName]: 0,
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

							setPausedCars((prevPaused) => ({
								...prevPaused,
								[carName]: translateX,
							}));
							setAnimatingCars((prev) => ({
								...prev,
								[carName]: false,
							}));
						}
					});
			});
	};

	const handleStopClick = (id: number, carName: string) => {
		dispatch(toggleEngine({ id, status: EngineStatus.STOP }))
			.unwrap()
			.then(() => {
				const carElement = document.getElementById(`${carName}`);
				if (carElement) {
					carElement.style.transform = "translateX(0)";
				}
				setPausedCars((prevPaused) => ({
					...prevPaused,
					[carName]: 0,
				}));
				setAnimatingCars((prev) => ({
					...prev,
					[carName]: false,
				}));
			});
	};

	return (
		<div className={styles.garage}>
			{cars.map((car) => (
				<CarSection
					key={car.id}
					id={car.id}
					name={car.name}
					color={car.color}
					onStartClick={() => handleStartClick(car.id, car.name)}
					onStopClick={() => handleStopClick(car.id, car.name)}
					animatingCar={animatingCars[car.name] || false}
					pausedPosition={pausedCars[car.name] || 0}
					onAnimationEnd={() => handleAnimationEnd(car.name)}
				/>
			))}
		</div>
	);
};

export default Garage;

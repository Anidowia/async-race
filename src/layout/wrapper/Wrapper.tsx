import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Garage from "../../pages/garage/Garage";
import Header from "../header/Header";

import { AnimatingCars, CarPosition } from "../../common/interface/interface";
import { AppDispatch, RootState } from "../../store/hooks/hooks";
import { addCarToGarage } from "../../store/garage/thunk";
import { generateCar } from "../../helpers/generateCar";
import { EngineStatus } from "../../store/engine/types";
import { driveEngine, toggleEngine } from "../../store/engine/thunk";

import styles from "./Wrapper.module.scss";

const Wrapper: React.FC = () => {
	const dispatch: AppDispatch = useDispatch();
	const cars = useSelector((state: RootState) => state.garage.cars);

	const [animatingCars, setAnimatingCars] = useState<AnimatingCars>({});
	const [pausedCars, setPausedCars] = useState<CarPosition>(
		Object.fromEntries(cars.map((car) => [car.name, 0]))
	);

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

	const stopAllCars = () => {
		setPausedCars(Object.fromEntries(cars.map((car) => [car.name, 0])));
		setAnimatingCars({});
	};

	const handleRaceClick = () => {
		cars.forEach((car) => handleStartClick(car.id, car.name));
	};

	const handleCreateCar = (name: string, color: string) => {
		dispatch(addCarToGarage({ name, color }));
	};

	const handleGenerateCars = () => {
		generateCar(dispatch);
	};

	return (
		<div className={styles.main}>
			<Header
				onRaceClick={handleRaceClick}
				onResetClick={stopAllCars}
				onCreateCar={handleCreateCar}
				onGenerateCars={handleGenerateCars}
			/>
			<main>
				<Garage
					animatingCars={animatingCars}
					pausedCars={pausedCars}
					setPausedCars={setPausedCars}
					setAnimatingCars={setAnimatingCars}
					handleStartClick={handleStartClick}
				/>
			</main>
		</div>
	);
};

export default Wrapper;

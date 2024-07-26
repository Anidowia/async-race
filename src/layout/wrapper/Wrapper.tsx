import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Garage from "../../pages/garage/Garage";
import Header from "../header/Header";

import { AnimatingCars } from "../../common/interface/interface";
import { AppDispatch, RootState } from "../../store/hooks/hooks";
import { addCarToGarage } from "../../store/garage/thunk";
import { generateCar } from "../../helpers/generateCar";
import { startRace, stopRace } from "../../utils/animation";
import { clearFirstCarFinished } from "../../store/garage/slice";

import styles from "./Wrapper.module.scss";

const Wrapper: React.FC = () => {
	const dispatch: AppDispatch = useDispatch();
	const cars = useSelector((state: RootState) => state.garage.cars);
	const firstCarFinished = useSelector(
		(state: RootState) => state.garage.firstCarFinished
	);
	const pausedCars = useSelector((state: RootState) => state.pausedCar);

	const [animatingCars, setAnimatingCars] = useState<AnimatingCars>({});

	const startCar = startRace(dispatch, cars, setAnimatingCars);
	const stopCar = stopRace(dispatch, setAnimatingCars);

	const startRaceWrapper = (id: number, carName: string) =>
		startCar(id, carName);

	const stopRaceWrapper = (id: number, carName: string) => stopCar(id, carName);

	const stopAllCars = () => {
		cars.forEach((car) => stopRaceWrapper(car.id, car.name));
		dispatch(clearFirstCarFinished());
	};

	const handleRaceClick = () => {
		cars.forEach((car) => startRaceWrapper(car.id, car.name));
		dispatch(clearFirstCarFinished());
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
					setAnimatingCars={setAnimatingCars}
					startRace={startRaceWrapper}
					stopRace={stopRaceWrapper}
					firstCarFinished={firstCarFinished}
				/>
			</main>
		</div>
	);
};

export default Wrapper;

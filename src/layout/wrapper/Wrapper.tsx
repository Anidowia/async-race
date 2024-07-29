import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Garage from "../../pages/garage/Garage";
import Header from "../header/Header";
import Page from "../../common/pagination/Page";

import { AnimatingCars } from "../../common/interface/interface";
import { AppDispatch, RootState } from "../../store/hooks/hooks";
import { addCarToGarage } from "../../store/garage/thunk";
import { generateCar } from "../../helpers/generateCar";
import { startRace, stopRace } from "../../utils/animation";
import { clearWinnerData, resetActiveCars } from "../../store/engine/slice";
import { setGarageCurrentPage } from "../../store/pages/slice";
import { getPaginatedCars } from "../../utils/pagination";

import styles from "./Wrapper.module.scss";

const Wrapper: React.FC = () => {
	const dispatch: AppDispatch = useDispatch();
	const cars = useSelector((state: RootState) => state.garage.cars);
	const pausedCars = useSelector((state: RootState) => state.pausedCar);
	const { garageCurrentPage, carsPerPage } = useSelector(
		(state: RootState) => state.page
	);

	const [animatingCars, setAnimatingCars] = useState<AnimatingCars>({});
	const paginatedCars = getPaginatedCars(cars, garageCurrentPage, carsPerPage);

	const startCar = (id: number, carName: string) => {
		if (paginatedCars.some((car) => car.id === id)) {
			startRace(dispatch, paginatedCars, setAnimatingCars)(id, carName);
		}
	};

	const stopCar = (id: number, carName: string) => {
		if (paginatedCars.some((car) => car.id === id)) {
			stopRace(dispatch, setAnimatingCars)(id, carName);
		}
	};

	const startRaceWrapper = (id: number, carName: string) =>
		startCar(id, carName);

	const stopRaceWrapper = (id: number, carName: string) => stopCar(id, carName);

	const stopAllCars = () => {
		paginatedCars.forEach((car) => stopRaceWrapper(car.id, car.name));
		dispatch(clearWinnerData());
		dispatch(resetActiveCars());
	};

	const handleRaceClick = () => {
		paginatedCars.forEach((car) => startRaceWrapper(car.id, car.name));
		dispatch(clearWinnerData());
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
				/>
				<Page
					currentPage={garageCurrentPage}
					totalPages={Math.ceil(cars.length / carsPerPage)}
					onPageChange={(page) => dispatch(setGarageCurrentPage(page))}
				/>
			</main>
		</div>
	);
};

export default Wrapper;

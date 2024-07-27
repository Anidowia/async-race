import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Garage from "../../pages/garage/Garage";
import Header from "../header/Header";
import Page from "../../common/page/Page";

import { AnimatingCars } from "../../common/interface/interface";
import { AppDispatch, RootState } from "../../store/hooks/hooks";
import { addCarToGarage } from "../../store/garage/thunk";
import { generateCar } from "../../helpers/generateCar";
import { startRace, stopRace } from "../../utils/animation";
import { setCurrentPage } from "../../store/pages/slice";
import { clearWinnerData } from "../../store/engine/slice";

import styles from "./Wrapper.module.scss";

const Wrapper: React.FC = () => {
	const dispatch: AppDispatch = useDispatch();
	const cars = useSelector((state: RootState) => state.garage.cars);
	const pausedCars = useSelector((state: RootState) => state.pausedCar);
	const { currentPage, carsPerPage } = useSelector(
		(state: RootState) => state.page
	);

	const [animatingCars, setAnimatingCars] = useState<AnimatingCars>({});

	const startCar = (id: number, carName: string) => {
		const paginatedCars = cars.slice(
			(currentPage - 1) * carsPerPage,
			currentPage * carsPerPage
		);
		if (paginatedCars.some((car) => car.id === id)) {
			startRace(dispatch, paginatedCars, setAnimatingCars)(id, carName);
		}
	};

	const stopCar = (id: number, carName: string) => {
		const paginatedCars = cars.slice(
			(currentPage - 1) * carsPerPage,
			currentPage * carsPerPage
		);
		if (paginatedCars.some((car) => car.id === id)) {
			stopRace(dispatch, setAnimatingCars)(id, carName);
		}
	};

	const startRaceWrapper = (id: number, carName: string) =>
		startCar(id, carName);

	const stopRaceWrapper = (id: number, carName: string) => stopCar(id, carName);

	const stopAllCars = () => {
		const paginatedCars = cars.slice(
			(currentPage - 1) * carsPerPage,
			currentPage * carsPerPage
		);
		paginatedCars.forEach((car) => stopRaceWrapper(car.id, car.name));
		dispatch(clearWinnerData());
	};

	const handleRaceClick = () => {
		const paginatedCars = cars.slice(
			(currentPage - 1) * carsPerPage,
			currentPage * carsPerPage
		);
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
					currentPage={currentPage}
					totalPages={Math.ceil(cars.length / carsPerPage)}
					onPageChange={(page) => dispatch(setCurrentPage(page))}
				/>
			</main>
		</div>
	);
};

export default Wrapper;

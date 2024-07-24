import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RootState, AppDispatch } from "./store/hooks/hooks";

import {
	addCarToGarage,
	fetchCarModels,
	fetchCarNames,
} from "./store/garage/thunk";

import Wrapper from "./layout/wrapper/Wrapper";
import Winners from "./pages/winners/Winners";

interface CarPosition {
	[key: string]: number;
}

interface AnimatingCars {
	[key: string]: boolean;
}

const App: React.FC = () => {
	const dispatch: AppDispatch = useDispatch();

	const cars = useSelector((state: RootState) => state.garage.cars);

	const [animatingCars, setAnimatingCars] = useState<AnimatingCars>({});
	const [pausedCars, setPausedCars] = useState<CarPosition>(
		Object.fromEntries(cars.map((car) => [car.name, 0]))
	);

	const stopAllCars = () => {
		setPausedCars(Object.fromEntries(cars.map((car) => [car.name, 0])));
		setAnimatingCars({});
	};

	const startAllCars = () => {
		setAnimatingCars(Object.fromEntries(cars.map((car) => [car.name, true])));
	};

	const handleRaceClick = () => {
		startAllCars();
	};

	const handleCreateCar = (name: string, color: string) => {
		dispatch(addCarToGarage({ name, color }));
	};

	const getRandomColor = () => {
		const randomColor = Math.floor(Math.random() * 16777215).toString(16);
		return `#${randomColor.padStart(6, "0")}`;
	};

	const getRandomCarNameFromList = (list: string[]) =>
		list[Math.floor(Math.random() * list.length)];

	const handleGenerateCars = async () => {
		const carNamesResponse = await dispatch(fetchCarNames()).unwrap();
		const carModelsResponse = await dispatch(fetchCarModels()).unwrap();

		const newCarName = getRandomCarNameFromList(carNamesResponse);
		const newCarModel = getRandomCarNameFromList(carModelsResponse);
		const newCarColor = getRandomColor();
		const fullCarName = `${newCarName} ${newCarModel}`;

		dispatch(addCarToGarage({ name: fullCarName, color: newCarColor }));
	};

	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						<Wrapper
							animatingCars={animatingCars}
							pausedCars={pausedCars}
							setPausedCars={setPausedCars}
							setAnimatingCars={setAnimatingCars}
							onRaceClick={handleRaceClick}
							onResetClick={stopAllCars}
							onCreateCar={handleCreateCar}
							onGenerateCars={handleGenerateCars}
						/>
					}
				/>
				<Route path="/winners" element={<Winners />} />
			</Routes>
		</Router>
	);
};

export default App;

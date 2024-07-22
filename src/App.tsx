import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

import MainPage from "./pages/MainPage/MainPage";
import Winners from "./pages/winners/Winners";

import { addCarToGarage } from "./store/slices/garageSlice";

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
	const [pausedCars, setPausedCars] = useState<CarPosition>({
		BMW: 0,
		Audi: 0,
		Tesla: 0,
	});

	const stopAllCars = () => {
		setPausedCars({
			BMW: 0,
			Audi: 0,
			Tesla: 0,
		});
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

	const getRandomCarName = () => {
		const carNames = [
			"Toyota",
			"Honda",
			"Ford",
			"Chevrolet",
			"Mercedes",
			"Kia",
			"Hyundai",
		];
		return carNames[Math.floor(Math.random() * carNames.length)];
	};

	const getRandomColor = () => {
		const letters = "0123456789ABCDEF";
		let color = "#";
		// eslint-disable-next-line no-plusplus
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	};

	const handleGenerateCars = () => {
		const newCarName = getRandomCarName();
		const newCarColor = getRandomColor();
		dispatch(addCarToGarage({ name: newCarName, color: newCarColor }));
	};

	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						<MainPage
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

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage/MainPage";
import Winners from "./pages/winners/Winners";
import Header from "./components/header/Header";

interface CarPosition {
	[key: string]: number;
}

interface AnimatingCars {
	[key: string]: boolean;
}

const App: React.FC = () => {
	const [animatingCars, setAnimatingCars] = useState<AnimatingCars>({});
	const [pausedCars, setPausedCars] = useState<CarPosition>({
		BMW: 0,
		Audi: 0,
		Tesla: 0,
	});

	const [carList, setCarList] = useState<{ [key: string]: string }>({
		BMW: "#833ab4",
		Audi: "#0077e5",
		Tesla: "#ff0000",
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
		setAnimatingCars(
			Object.fromEntries(Object.keys(carList).map((car) => [car, true]))
		);
	};

	const handleRaceClick = () => {
		startAllCars();
	};

	const handleCreateCar = (name: string, color: string) => {
		setCarList((prev) => ({
			...prev,
			[name]: color,
		}));
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
		setCarList((prev) => ({
			...prev,
			[newCarName]: newCarColor,
		}));
	};

	return (
		<Router>
			<Header
				onRaceClick={handleRaceClick}
				onResetClick={stopAllCars}
				onCreateCar={handleCreateCar}
				carList={carList}
				onGenerateCars={handleGenerateCars}
			/>
			<Routes>
				<Route
					path="/"
					element={
						<MainPage
							animatingCars={animatingCars}
							pausedCars={pausedCars}
							setPausedCars={setPausedCars}
							setAnimatingCars={setAnimatingCars}
							carList={carList}
						/>
					}
				/>
				<Route path="/winners" element={<Winners />} />
			</Routes>
		</Router>
	);
};

export default App;

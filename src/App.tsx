import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RootState, AppDispatch } from "./store/hooks/hooks";

import { addCarToGarage } from "./store/slices/garageSlice";

import MainPage from "./pages/MainPage/MainPage";
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
	const [pausedCars, setPausedCars] = useState<CarPosition>({
		BMW: 0,
		Audi: 0,
		Tesla: 0,
	});

	const stopAllCars = () => {
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
			"Audi",
			"Chevrolet",
			"Cadillac",
			"BMW",
			"Ford",
			"Buick",
			"INFINITI",
			"GMC",
			"Honda",
			"Hyundai",
			"Jeep",
			"Dodge",
			"Jaguar",
			"Kia",
			"Land Rover",
			"Lexus",
			"Mercedes-Benz",
			"Mitsubishi",
			"Lincoln",
			"MAZDA",
			"Nissan",
			"Porsche",
			"Subaru",
			"Toyota",
			"Volkswagen",
			"Volvo",
			"Alfa Romeo",
			"FIAT",
			"Maserati",
			"Tesla",
			"Aston Martin",
			"Bentley",
			"Ferrari",
			"Lamborghini",
			"McLaren",
			"Rolls-Royce",
			"Suzuki",
			"Fisker",
			"Maybach",
			"Oldsmobile",
			"Daewoo",
		];
		return carNames[Math.floor(Math.random() * carNames.length)];
	};

	const getRandomColor = () => {
		const randomColor = Math.floor(Math.random() * 16777215).toString(16);
		return `#${randomColor.padStart(6, "0")}`;
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

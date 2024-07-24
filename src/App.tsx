import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store/hooks/hooks";
import { addCarToGarage } from "./store/garage/thunk";
import { generateCar } from "./helpers/generateCar";
import { AnimatingCars, CarPosition } from "./common/interface/interface";

import Wrapper from "./layout/wrapper/Wrapper";
import Winners from "./pages/winners/Winners";

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

	const handleGenerateCars = () => {
		generateCar(dispatch);
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

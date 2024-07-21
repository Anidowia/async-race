import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage/MainPage";
import Winners from "./pages/winners/Winners";
import Header from "./components/header/Header";

interface CarPosition {
	[key: string]: number;
}

const App: React.FC = () => {
	const [animatingCar, setAnimatingCar] = useState<string | null>(null);
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
		setAnimatingCar(null);
	};

	const startAllCars = () => {
		setAnimatingCar("ALL");
	};

	const handleRaceClick = () => {
		startAllCars();
	};

	return (
		<Router>
			<Header onRaceClick={handleRaceClick} onResetClick={stopAllCars} />
			<Routes>
				<Route
					path="/"
					element={
						<MainPage
							animatingCar={animatingCar}
							pausedCars={pausedCars}
							setPausedCars={setPausedCars}
							setAnimatingCar={setAnimatingCar}
						/>
					}
				/>
				<Route path="/winners" element={<Winners />} />
			</Routes>
		</Router>
	);
};

export default App;

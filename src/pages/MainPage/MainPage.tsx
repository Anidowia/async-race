import React from "react";

import Garage from "../../components/garage/Garage";
import Header from "../../components/header/Header";

import styles from "./MainPage.module.scss";

interface CarPosition {
	[key: string]: number;
}

interface AnimatingCars {
	[key: string]: boolean;
}

interface MainPageProps {
	animatingCars: AnimatingCars;
	pausedCars: CarPosition;
	setPausedCars: React.Dispatch<React.SetStateAction<CarPosition>>;
	setAnimatingCars: React.Dispatch<React.SetStateAction<AnimatingCars>>;
	onRaceClick: () => void;
	onResetClick: () => void;
	onCreateCar: (name: string, color: string) => void;
	onGenerateCars: () => void;
}

const MainPage: React.FC<MainPageProps> = ({
	animatingCars,
	pausedCars,
	setPausedCars,
	setAnimatingCars,
	onRaceClick,
	onResetClick,
	onCreateCar,
	onGenerateCars,
}) => (
	<div className={styles.main}>
		<Header
			onRaceClick={onRaceClick}
			onResetClick={onResetClick}
			onCreateCar={onCreateCar}
			onGenerateCars={onGenerateCars}
		/>
		<Garage
			animatingCars={animatingCars}
			pausedCars={pausedCars}
			setPausedCars={setPausedCars}
			setAnimatingCars={setAnimatingCars}
		/>
	</div>
);

export default MainPage;

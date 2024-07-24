import React from "react";

import Garage from "../../pages/garage/Garage";
import Header from "../header/Header";

import { AnimatingCars, CarPosition } from "../../common/interface/interface";

import styles from "./Wrapper.module.scss";

interface WrapperProps {
	animatingCars: AnimatingCars;
	pausedCars: CarPosition;
	setPausedCars: React.Dispatch<React.SetStateAction<CarPosition>>;
	setAnimatingCars: React.Dispatch<React.SetStateAction<AnimatingCars>>;
	onRaceClick: () => void;
	onResetClick: () => void;
	onCreateCar: (name: string, color: string) => void;
	onGenerateCars: () => void;
}

const Wrapper: React.FC<WrapperProps> = ({
	animatingCars,
	pausedCars,
	setPausedCars,
	setAnimatingCars,
	onRaceClick,
	onResetClick,
	onCreateCar,
	onGenerateCars,
}) => (
	<main className={styles.main}>
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
	</main>
);

export default Wrapper;
